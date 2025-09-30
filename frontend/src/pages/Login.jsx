import React, { useState } from 'react';
import { TextField, Button, Paper, Typography, Box, Container, Fade } from '@mui/material';
import { Login as LoginIcon } from '@mui/icons-material';
import api from '../api';
import { saveAuth } from '../utils/auth';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await api.post('/auth/login', form);
      saveAuth(res.data);
      navigate('/dashboard');
    } catch (err) {
      setError(err?.response?.data?.msg || err?.response?.data?.errors?.[0]?.msg || 'Login failed');
    }
  };

  return (
    <Container 
      component="main" 
      maxWidth="sm"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        py: 4
      }}
    >
      <Fade in={true} timeout={800}>
        <Paper
          elevation={8}
          sx={{
            p: 6,
            borderRadius: 3,
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            width: '100%'
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 1,
              mb: 4
            }}
          >
            <LoginIcon 
              sx={{ 
                fontSize: 48, 
                color: 'primary.main',
                bgcolor: 'primary.light',
                p: 1,
                borderRadius: '50%'
              }} 
            />
            <Typography 
              variant="h4" 
              component="h1" 
              fontWeight="600"
              color="primary.main"
            >
              Welcome Back
            </Typography>
            <Typography 
              variant="body2" 
              color="text.secondary"
              textAlign="center"
            >
              Sign in to your account to continue
            </Typography>
          </Box>

          <Box 
            component="form" 
            onSubmit={onSubmit}
            sx={{ mt: 2 }}
          >
            <TextField 
              label="Email Address" 
              name="email" 
              type="email" 
              value={form.email} 
              onChange={onChange} 
              fullWidth 
              sx={{ 
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  '&:hover fieldset': {
                    borderColor: 'primary.main',
                  },
                }
              }} 
              required 
              autoFocus
            />
            <TextField 
              label="Password" 
              name="password" 
              type="password" 
              value={form.password} 
              onChange={onChange} 
              fullWidth 
              sx={{ 
                mb: 2,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  '&:hover fieldset': {
                    borderColor: 'primary.main',
                  },
                }
              }} 
              required 
            />
            
            {error && (
              <Typography 
                color="error" 
                sx={{ 
                  mb: 2,
                  p: 1.5,
                  bgcolor: 'error.light',
                  borderRadius: 1,
                  fontSize: '0.875rem',
                  textAlign: 'center'
                }}
              >
                {error}
              </Typography>
            )}
            
            <Button 
              type="submit" 
              variant="contained" 
              fullWidth
              size="large"
              sx={{
                mt: 2,
                py: 1.5,
                borderRadius: 2,
                fontSize: '1rem',
                fontWeight: '600',
                textTransform: 'none',
                boxShadow: 2,
                '&:hover': {
                  boxShadow: 4,
                  transform: 'translateY(-1px)',
                  transition: 'all 0.2s ease-in-out'
                }
              }}
            >
              Sign In
            </Button>
          </Box>
        </Paper>
      </Fade>
    </Container>
  );
}