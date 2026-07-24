import api from './api';

export const login = async (username, password) => {
  const response = await api.post('/auth/login', { username, password });
  return response.data;
};

export const register = async (userData) => {
  const response = await api.post('/auth/register', userData);
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await api.get('/auth/me');
  return response.data;
};

export const updateProfile = async (data) => {
  const response = await api.put('/users/profile', data);
  return response.data;
};

export const changePassword = async (data) => {
  const response = await api.post('/users/change-password', data);
  return response.data;
};
