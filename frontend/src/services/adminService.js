import api from './api';

export const getAdminEvents = async () => {
  // const response = await api.get('/admin/events');
  // return response.data;
  try {
    const response = await api.get('/admin/events');
    return response.data;
  } catch (error) {
    console.error('Error fetching admin events:', error.response?.data || error.message);
    throw error; // Re-throw to let the component handle it
  }
};

export const createEvent = async (eventData) => {
  const response = await api.post('/admin/events', eventData, {
    headers: {
      'Content-Type': 'multipart/form-data', 
    },
  });
  return response.data;
};

export const updateEvent = async (id, eventData) => {
  const response = await api.post(`/admin/events/${id}`, eventData, {
    headers: {
      'Content-Type': 'multipart/form-data', 
    },
    params: {
      _method: 'PUT',
    },
  });
  return response.data;
};
export const deleteEvent = async (id) => {
  const response = await api.delete(`/admin/events/${id}`);
  return response.data;
};

export const getEventRegistrations = async (eventId) => {
  const response = await api.get(`/admin/events/${eventId}/registrations`);
  return response.data;
};