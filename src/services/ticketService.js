import api from './api';

export const getUserTickets = async () => {
  const response = await api.get('/tickets');
  return response.data;
};

export const getTicket = async (id) => {
  const response = await api.get(`/tickets/${id}`);
  return response.data;
};

export const purchaseTicket = async (eventId, quantity = 1, seatNumber = null, section = null) => {
  const response = await api.post('/tickets/purchase', {
    event_id: eventId,
    quantity,
    seat_number: seatNumber,
    section
  });
  return response.data;
};

export const cancelTicket = async (id) => {
  const response = await api.delete(`/tickets/${id}`);
  return response.data;
};

export const validateTicket = async (id) => {
  const response = await api.post(`/tickets/${id}/validate`);
  return response.data;
};
