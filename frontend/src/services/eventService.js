import api from './api';

export const getEvents = async (filters = {}) => {
  const response = await api.get('/events', { params: filters });
  return response.data;
};

export const getEvent = async (id) => {
  const response = await api.get(`/events/${id}`);
  return response.data;
};

export const registerForEvent = async (eventId) => {
  const response = await api.post('/events/register', { event_id: eventId });
  return response.data;
};

export const cancelRegistration = async (eventId) => {
  const response = await api.delete('/events/register', { 
    data: { event_id: eventId } 
  });
  return response.data;
};

export const getUserEvents = async () => {
  const response = await api.get('/user/events');
  return response.data;
};