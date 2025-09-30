import React, { useEffect, useState } from 'react';
import { Typography, Grid, Paper, TextField, Button, Box, Container, Fade, Chip, Stack } from '@mui/material';
import { Search, Add, Cancel, Logout, Person } from '@mui/icons-material';
import api from '../api';
import NoteCard from '../components/NoteCard';
import { getUser, clearAuth } from '../utils/auth';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [notes, setNotes] = useState([]);
  const [q, setQ] = useState('');
  const [form, setForm] = useState({ title: '', content: '', tags: '' });
  const [editing, setEditing] = useState(null);
  const navigate = useNavigate();
  const user = getUser();

  const fetchNotes = async (query) => {
    try {
      const res = await api.get('/notes', { params: query ? { q: query } : {} });
      setNotes(res.data);
    } catch (err) {
      if (err?.response?.status === 401) { clearAuth(); navigate('/login'); }
      console.error(err);
    }
  };

  useEffect(() => { fetchNotes(); }, []);

  const onSave = async () => {
    try {
      const payload = { title: form.title, content: form.content, tags: form.tags ? form.tags.split(',').map(t => t.trim()) : [] };
      if (editing) {
        const res = await api.put(`/notes/${editing._id}`, payload);
        setNotes(n => n.map(nu => nu._id === res.data._id ? res.data : nu));
        setEditing(null);
      } else {
        const res = await api.post('/notes', payload);
        setNotes(n => [res.data, ...n]);
      }
      setForm({ title: '', content: '', tags: '' });
    } catch (err) { console.error(err); }
  };

  const onEdit = (note) => {
    setEditing(note);
    setForm({ title: note.title, content: note.content, tags: (note.tags || []).join(',') });
  };

  const onDelete = async (id) => {
    if (!confirm('Delete note?')) return;
    await api.delete(`/notes/${id}`);
    setNotes(n => n.filter(x => x._id !== id));
  };

  const onSearch = (e) => {
    e.preventDefault();
    fetchNotes(q);
  };

  const handleLogout = () => {
    clearAuth();
    navigate('/login');
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Fade in={true} timeout={800}>
        <Box>
          {/* Header  */}
          <Paper 
            elevation={2}
            sx={{ 
              p: 4, 
              mb: 4,
              borderRadius: 3,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white'
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
              <Box>
                <Typography variant="h4" fontWeight="700" gutterBottom>
                  Welcome back, {user?.name}!
                </Typography>
                <Typography variant="h6" sx={{ opacity: 0.9 }}>
                  Manage your personal notes
                </Typography>
              </Box>
              <Chip 
                icon={<Person />}
                label={user?.email}
                variant="outlined"
                sx={{ 
                  color: 'white', 
                  borderColor: 'rgba(255,255,255,0.3)',
                  bgcolor: 'rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(10px)'
                }}
              />
            </Box>

            <Box component="form" onSubmit={onSearch} sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <TextField 
                placeholder="Search notes by title or content..."
                value={q}
                onChange={e => setQ(e.target.value)}
                fullWidth
                sx={{
                  bgcolor: 'rgba(255,255,255,0.9)',
                  borderRadius: 2,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  }
                }}
                InputProps={{
                  startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />
                }}
              />
              <Button 
                variant="contained" 
                type="submit"
                sx={{
                  px: 4,
                  py: 1.5,
                  borderRadius: 2,
                  bgcolor: 'rgba(255,255,255,0.2)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.3)',
                  '&:hover': {
                    bgcolor: 'rgba(255,255,255,0.3)',
                  }
                }}
              >
                Search
              </Button>
            </Box>
          </Paper>

          <Grid container spacing={4}>
            {/*  Notes & Form */}
            <Grid item xs={12} lg={8}>
              {/* Add/Edit Note Form */}
              <Paper 
                elevation={1}
                sx={{ 
                  p: 4, 
                  mb: 4,
                  borderRadius: 3,
                  border: '1px solid',
                  borderColor: 'divider'
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Typography variant="h5" fontWeight="600">
                    {editing ? 'Edit Note' : 'Create New Note'}
                  </Typography>
                  {editing && (
                    <Chip 
                      label="Editing"
                      color="primary"
                      size="small"
                      sx={{ ml: 2 }}
                    />
                  )}
                </Box>

                <Stack spacing={3}>
                  <TextField 
                    label="Title"
                    value={form.title}
                    onChange={e => setForm({ ...form, title: e.target.value })}
                    fullWidth
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                      }
                    }}
                  />
                  <TextField 
                    label="Content"
                    value={form.content}
                    onChange={e => setForm({ ...form, content: e.target.value })}
                    fullWidth
                    multiline
                    rows={4}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                      }
                    }}
                  />
                  <TextField 
                    label="Tags (comma separated)"
                    value={form.tags}
                    onChange={e => setForm({ ...form, tags: e.target.value })}
                    fullWidth
                    helperText="Separate multiple tags with commas"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                      }
                    }}
                  />
                  
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button 
                      variant="contained" 
                      onClick={onSave}
                      startIcon={editing ? null : <Add />}
                      sx={{
                        px: 4,
                        py: 1.5,
                        borderRadius: 2,
                        fontWeight: '600',
                        textTransform: 'none'
                      }}
                    >
                      {editing ? 'Update Note' : 'Create Note'}
                    </Button>
                    {editing && (
                      <Button 
                        onClick={() => { setEditing(null); setForm({ title: '', content: '', tags: '' }) }}
                        startIcon={<Cancel />}
                        sx={{
                          px: 4,
                          py: 1.5,
                          borderRadius: 2,
                          textTransform: 'none'
                        }}
                      >
                        Cancel
                      </Button>
                    )}
                  </Box>
                </Stack>
              </Paper>

              {/* LIST NOTES */}
              <Box>
                <Typography variant="h6" fontWeight="600" mb={3}>
                  Your Notes ({notes.length})
                </Typography>
                
                {notes.length === 0 ? (
                  <Paper 
                    sx={{ 
                      p: 8, 
                      textAlign: 'center',
                      borderRadius: 3,
                      bgcolor: 'grey.50'
                    }}
                  >
                    <Typography variant="h6" color="text.secondary" gutterBottom>
                      No notes yet
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Create your first note to get started
                    </Typography>
                  </Paper>
                ) : (
                  <Grid container spacing={3}>
                    {notes.map(note => (
                      <Grid item xs={12} key={note._id}>
                        <NoteCard note={note} onEdit={onEdit} onDelete={onDelete} />
                      </Grid>
                    ))}
                  </Grid>
                )}
              </Box>
            </Grid>

            {/* Profile */}
            <Grid item xs={12} lg={4}>
              <Paper 
                elevation={1}
                sx={{ 
                  p: 4,
                  borderRadius: 3,
                  border: '1px solid',
                  borderColor: 'divider',
                  position: 'sticky',
                  top: 24
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Person sx={{ mr: 2, color: 'primary.main' }} />
                  <Typography variant="h6" fontWeight="600">
                    Profile
                  </Typography>
                </Box>

                <Stack spacing={2} sx={{ mb: 4 }}>
                  <Box>
                    <Typography variant="caption" color="text.secondary" fontWeight="600">
                      NAME
                    </Typography>
                    <Typography variant="body1">{user?.name}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption" color="text.secondary" fontWeight="600">
                      EMAIL
                    </Typography>
                    <Typography variant="body1">{user?.email}</Typography>
                  </Box>
                </Stack>

                <Button 
                  variant="outlined" 
                  onClick={handleLogout}
                  startIcon={<Logout />}
                  fullWidth
                  sx={{
                    py: 1.5,
                    borderRadius: 2,
                    textTransform: 'none',
                    fontWeight: '600'
                  }}
                >
                  Sign Out
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Fade>
    </Container>
  );
}