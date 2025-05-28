import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Container, Paper, Typography, TextField, Button, Box, 
  Avatar, CircularProgress
} from '@mui/material';
import { LockReset } from '@mui/icons-material';
import axios from 'axios';

const ForgotPassword = ({ showSnackbar }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      showSnackbar('Please enter your email address', 'error');
      return;
    }
    
    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showSnackbar('Please enter a valid email address', 'error');
      return;
    }
    
    setIsLoading(true);
    
    try {
      await axios.post('http://localhost:8080/api/forgot-password/request-otp', { email });
      showSnackbar('OTP sent to your email!', 'success');
      navigate(`/verify-otp/${encodeURIComponent(email)}`);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        showSnackbar('Email not found', 'error');
      } else {
        showSnackbar('Failed to send OTP. Please try again.', 'error');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper 
        elevation={6} 
        sx={{
          marginTop: 8,
          padding: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          borderRadius: 2
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
          <LockReset />
        </Avatar>
        
        <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
          Forgot Password
        </Typography>
        
        <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 3 }}>
          Enter your email address and we'll send you an OTP to reset your password.
        </Typography>
        
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '100%' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, py: 1.5 }}
            disabled={isLoading}
          >
            {isLoading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              'Send OTP'
            )}
          </Button>
          
          <Box textAlign="center" mt={2}>
            <Link to="/login" style={{ textDecoration: 'none' }}>
              <Typography variant="body2" color="primary">
                Back to Login
              </Typography>
            </Link>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default ForgotPassword;
