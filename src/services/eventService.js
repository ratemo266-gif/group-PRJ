import api from './api';

export const getEvents = async (search = '', category = '', page = 1) => {
  const response = await api.get('/events', {
    params: { search, category, page, per_page: 12 }
  });
  return response.data;
};

export const getEvent = async (id) => {
  const response = await api.get(`/events/${id}`);
  return response.data;
};

export const createEvent = async (eventData) => {
  const response = await api.post('/events', eventData);
  return response.data;
};

export const updateEvent = async (id, eventData) => {
  const response = await api.put(`/events/${id}`, eventData);
  return response.data;
};

export const deleteEvent = async (id) => {
  const response = await api.delete(`/events/${id}`);
  return response.data;
};
