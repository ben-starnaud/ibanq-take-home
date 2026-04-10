import axios from 'axios';

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/api/v1`,
});

export const noteApi = {
  getNotes: () => api.get('/notes/'),
  createNote: (data) => api.post('/notes/', data),
  updateNote: (id, data) => api.patch(`/notes/${id}`, data),
  deleteNote: (id) => api.delete(`/notes/${id}`),
};