import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Container, Paper, Typography, TextField, Button, Box, Avatar, 
  Grid, InputAdornment, IconButton
} from '@mui/material';
import { Visibility, VisibilityOff, LockOutlined } from '@mui/icons-material';
import axios from 'axios';

const Login = ({ showSnackbar }) => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    emailOrPhone: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!credentials.emailOrPhone || !credentials.password) {
      showSnackbar('Please fill in all fields', 'error');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const response = await axios.post('http://localhost:8080/api/login', credentials);
      
      // Handle successful login
      showSnackbar('Login successful!', 'success');
      localStorage.setItem('userRole', response.data.role);
      navigate('/dashboard');
      
    } catch (error) {
      // Handle error response
      if (error.response) {
        if (error.response.status === 404) {
          showSnackbar('User not found', 'error');
        } else if (error.response.status === 401) {
          showSnackbar('Invalid password', 'error');
        } else {
          showSnackbar('Login failed', 'error');
        }
      } else {
        showSnackbar('Network error. Please try again', 'error');
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
          <LockOutlined />
        </Avatar>
        
        <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
          Sign In
        </Typography>
        
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '100%' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="emailOrPhone"
            label="Email Address or Phone Number"
            name="emailOrPhone"
            autoComplete="email"
            autoFocus
            value={credentials.emailOrPhone}
            onChange={handleChange}
            variant="outlined"
          />
          
          {/* Forgot Password Link above password field */}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1, mb: -1 }}>
            <Link to="/forgot-password" style={{ textDecoration: 'none' }}>
              <Typography variant="body2" color="primary">
                Forgot password?
              </Typography>
            </Link>
          </Box>
          
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            id="password"
            autoComplete="current-password"
            value={credentials.password}
            onChange={handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
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
            {isLoading ? 'Signing in...' : 'Sign In'}
          </Button>
          
          <Grid container justifyContent="center">
            <Grid item>
              <Link to="/register" style={{ textDecoration: 'none' }}>
                <Typography variant="body2" color="primary">
                  Don't have an account? Register
                </Typography>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
