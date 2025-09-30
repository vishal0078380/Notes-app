import React from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container, Box } from '@mui/material';
import NoteAltIcon from '@mui/icons-material/NoteAlt'; // Logo icon
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import { clearAuth, getUser } from './utils/auth';

function App() {
  const navigate = useNavigate();
  const user = getUser();

  const handleLogout = () => {
    clearAuth();
    navigate('/login');
  };

  return (
    <>
      <AppBar
        position="static"
        elevation={0}
        sx={{
          backdropFilter: 'blur(10px)',
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? 'rgba(255,255,255,0.8)'
              : 'rgba(30,30,30,0.8)',
          borderBottom: 1,
          borderColor: 'divider',
          px: 2,
        }}
      >
        <Toolbar>
          {/*Title  */}
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1, gap: 1 }}>
            <NoteAltIcon color="primary" fontSize="large" />
            <Typography
              variant="h6"
              noWrap
              sx={{
                fontWeight: 'bold',
                letterSpacing: '0.5px',
                color: 'primary.main',
              }}
            >
              Notes App
            </Typography>
          </Box>

          {/* side buttons */}
          {user ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography
                variant="body1"
                sx={{ display: { xs: 'none', sm: 'block' }, fontWeight: 500 }}
              >
                {user.name}
              </Typography>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => navigate('/dashboard')}
              >
                Dashboard
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </Box>
          ) : (
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                variant="outlined"
                color="primary"
                component={Link}
                to="/login"
              >
                Login
              </Button>
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/register"
              >
                Register
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* Main  */}
      <Container sx={{ marginTop: 4 }}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Container>
    </>
  );
}

export default App;
