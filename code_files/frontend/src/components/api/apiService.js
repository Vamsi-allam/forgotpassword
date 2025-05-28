import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const apiService = {
  login: async (credentials) => {
    return axios.post(`${API_BASE_URL}/login`, credentials);
  },
  
  register: async (userData) => {
    return axios.post(`${API_BASE_URL}/register`, userData);
  },
  
  requestOtp: async (email) => {
    return axios.post(`${API_BASE_URL}/forgot-password/request-otp`, { email });
  },
  
  verifyOtpAndResetPassword: async (data) => {
    return axios.post(`${API_BASE_URL}/forgot-password/verify-otp`, data);
  }
};

export default apiService;
