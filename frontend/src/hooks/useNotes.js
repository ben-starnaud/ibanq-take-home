import { useState, useEffect } from 'react';
import { noteApi } from '../api/noteApi';

export const useNotes = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const res = await noteApi.getNotes();
      setNotes(res.data);
      setError(null);
    } catch (err) {
      setError("Failed to load notes. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchNotes(); }, []);

  const addNote = async (note) => {
    await noteApi.createNote(note);
    await fetchNotes();
  };

  const updateNote = async (id, data) => {
    await noteApi.updateNote(id, data);
    await fetchNotes();
  };

  const deleteNote = async (id) => {
    await noteApi.deleteNote(id);
    setNotes(notes.filter(n => n.id !== id)); 
  };

  return { notes, loading, error, addNote, updateNote, deleteNote };
};