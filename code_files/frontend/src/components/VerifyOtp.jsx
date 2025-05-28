import { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import {
  Container, Paper, Typography, TextField, Button, Box, 
  Avatar, Grid, CircularProgress, InputAdornment, IconButton
} from '@mui/material';
import { PasswordOutlined, Visibility, VisibilityOff } from '@mui/icons-material';
import axios from 'axios';

const VerifyOtp = ({ showSnackbar }) => {
  const { email } = useParams();
  const navigate = useNavigate();
  const decodedEmail = decodeURIComponent(email);
  
  const [formData, setFormData] = useState({
    otp: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const [showPassword, setShowPassword] = useState({
    newPassword: false,
    confirmPassword: false
  });
  
  const [isLoading, setIsLoading] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const togglePasswordVisibility = (field) => {
    setShowPassword(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Form validation
    if (!formData.otp || !formData.newPassword || !formData.confirmPassword) {
      showSnackbar('Please fill in all fields', 'error');
      return;
    }
    
    if (formData.newPassword.length < 6) {
      showSnackbar('Password must be at least 6 characters long', 'error');
      return;
    }
    
    if (formData.newPassword !== formData.confirmPassword) {
      showSnackbar('Passwords do not match', 'error');
      return;
    }
    
    setIsLoading(true);
    
    try {
      await axios.post('http://localhost:8080/api/forgot-password/verify-otp', {
        email: decodedEmail,
        otp: formData.otp,
        newPassword: formData.newPassword
      });
      
      showSnackbar('Password reset successful!', 'success');
      navigate('/login');
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400 && error.response.data.message === 'OTP expired') {
          showSnackbar('OTP expired. Please request a new one.', 'error');
        } else if (error.response.status === 400) {
          showSnackbar('Invalid OTP. Please try again.', 'error');
        } else {
          showSnackbar('Failed to reset password. Please try again.', 'error');
        }
      } else {
        showSnackbar('Network error. Please try again.', 'error');
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleResendOtp = async () => {
    setIsLoading(true);
    try {
      await axios.post('http://localhost:8080/api/forgot-password/request-otp', { 
        email: decodedEmail 
      });
      showSnackbar('New OTP sent to your email!', 'success');
    } catch (error) {
      showSnackbar('Failed to resend OTP. Please try again.', 'error');
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
          <PasswordOutlined />
        </Avatar>
        
        <Typography component="h1" variant="h5" sx={{ mb: 1 }}>
          Reset Password
        </Typography>
        
        <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 3 }}>
          Enter the OTP sent to {decodedEmail} and create a new password
        </Typography>
        
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '100%' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="otp"
            label="OTP Code"
            name="otp"
            autoFocus
            value={formData.otp}
            onChange={handleChange}
            placeholder="Enter 6-digit OTP"
          />
          
          <TextField
            margin="normal"
            required
            fullWidth
            name="newPassword"
            label="New Password"
            type={showPassword.newPassword ? 'text' : 'password'}
            id="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => togglePasswordVisibility('newPassword')}
                    edge="end"
                  >
                    {showPassword.newPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type={showPassword.confirmPassword ? 'text' : 'password'}
            id="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => togglePasswordVisibility('confirmPassword')}
                    edge="end"
                  >
                    {showPassword.confirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
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
              'Reset Password'
            )}
          </Button>
          
          <Grid container>
            <Grid item xs>
              <Box 
                component="button" 
                type="button"
                onClick={handleResendOtp}
                disabled={isLoading}
                sx={{
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  textAlign: 'left',
                  cursor: 'pointer',
                  color: 'primary.main',
                  fontSize: '0.875rem',
                  '&:hover': {
                    textDecoration: 'underline'
                  }
                }}
              >
                Resend OTP
              </Box>
            </Grid>
            <Grid item>
              <Link to="/login" style={{ textDecoration: 'none' }}>
                <Typography variant="body2" color="primary">
                  Back to Login
                </Typography>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default VerifyOtp;
