import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Container, Paper, Typography, Button, Box, AppBar, 
  Toolbar, IconButton 
} from '@mui/material';
import { ExitToApp } from '@mui/icons-material';

const Dashboard = ({ showSnackbar }) => {
  const navigate = useNavigate();
  const [role, setRole] = useState('');
  
  // Fix the infinite loop by adding an auth check flag
  useEffect(() => {
    // Use a local variable to track if we've shown the message
    let isAuthenticated = false;
    
    const userRole = localStorage.getItem('userRole');
    if (!userRole) {
      if (!isAuthenticated) {
        showSnackbar('Please login to continue', 'error');
        navigate('/login');
      }
      return;
    }
    
    isAuthenticated = true;
    setRole(userRole);
    
    // Empty dependency array - only runs once on mount
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    showSnackbar('Logged out successfully', 'success');
    navigate('/login');
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Dashboard
          </Typography>
          <IconButton color="inherit" onClick={handleLogout}>
            <ExitToApp />
          </IconButton>
        </Toolbar>
      </AppBar>
      
      <Container component="main" maxWidth="md" sx={{ mt: 5 }}>
        <Paper 
          elevation={3} 
          sx={{
            padding: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            borderRadius: 2
          }}
        >
          <Typography variant="h4" gutterBottom>
            Welcome to your Dashboard
          </Typography>
          
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            You are logged in as: <strong>{role}</strong>
          </Typography>
          
          <Box sx={{ mt: 3 }}>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={handleLogout}
              startIcon={<ExitToApp />}
            >
              Logout
            </Button>
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default Dashboard;
