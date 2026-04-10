import { useState } from 'react';
import { useNotes } from './hooks/useNotes';
import NoteList from './components/NoteList';
import NoteEditor from './components/NoteEditor';

export default function App() {
  const { notes, loading, error, addNote, updateNote, deleteNote } = useNotes();
  const [activeNote, setActiveNote] = useState(null);
  const [isCreating, setIsCreating] = useState(false);

  const handleSave = async (data) => {
    if (activeNote) await updateNote(activeNote.id, data);
    else await addNote(data);
    closeEditor();
  };

  const closeEditor = () => {
    setActiveNote(null);
    setIsCreating(false);
  };

  if (loading) return <div className="p-10 text-center">Loading your notes...</div>; 
  if (error) return <div className="p-10 text-red-500 text-center">{error}</div>; 

  const showEditor = activeNote || isCreating;

  return (
    <div className={`flex h-screen bg-gray-50 ${showEditor ? 'flex-row' : 'flex-col items-center'}`}>
      <div className={`${showEditor ? 'w-1/3 border-r' : 'w-full max-w-4xl'} h-full flex flex-col`}>
        <div className="p-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Note Editor</h1>
          {!isCreating && (
            <button onClick={() => setIsCreating(true)} className="bg-indigo-600 text-white px-4 py-2 rounded">
              + New Note
            </button>
          )}
        </div>
        <NoteList 
          notes={notes} 
          onEdit={setActiveNote} 
          onDelete={deleteNote} 
          compact={showEditor} 
        />
      </div>

      {showEditor && (
        <div className="flex-grow">
          <NoteEditor 
            activeNote={activeNote} 
            onSave={handleSave} 
            onCancel={closeEditor} 
          />
        </div>
      )}
    </div>
  );
}