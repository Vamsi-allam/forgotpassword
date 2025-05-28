import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useState, useCallback } from 'react';

// Components
import Login from './components/Login';
import Register from './components/Register';
import ForgotPassword from './components/ForgotPassword';
import VerifyOtp from './components/VerifyOtp';
import Dashboard from './components/Dashboard';
import SnackbarAlert from './components/SnackbarAlert';

import './App.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#f50057',
    },
  },
});

function App() {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'info'
  });

  const handleCloseSnackbar = useCallback(() => {
    setSnackbar(prev => ({ ...prev, open: false }));
  }, []);

  const showSnackbar = useCallback((message, severity = 'info') => {
    setSnackbar({ open: true, message, severity });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login showSnackbar={showSnackbar} />} />
          <Route path="/register" element={<Register showSnackbar={showSnackbar} />} />
          <Route path="/forgot-password" element={<ForgotPassword showSnackbar={showSnackbar} />} />
          <Route path="/verify-otp/:email" element={<VerifyOtp showSnackbar={showSnackbar} />} />
          <Route path="/dashboard" element={<Dashboard showSnackbar={showSnackbar} />} />
        </Routes>
        <SnackbarAlert 
          open={snackbar.open} 
          message={snackbar.message} 
          severity={snackbar.severity} 
          onClose={handleCloseSnackbar}
        />
      </Router>
    </ThemeProvider>
  );
}

export default App;
