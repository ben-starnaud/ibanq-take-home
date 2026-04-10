import { useState } from 'react';
import NoteCard from './NoteCard';

export default function NoteList({ notes, onEdit, onDelete, compact }) {
  const [search, setSearch] = useState("");

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex-grow overflow-y-auto px-6 pb-6">
      <div className="mb-6 sticky top-0 bg-gray-50 py-2">
        <input
          type="text"
          placeholder="Search by title..."
          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {filteredNotes.length === 0 ? (
        <div className="text-center text-gray-500 mt-10">
          {search ? "No notes match your search." : "No notes yet. Create one!"} 
        </div>
      ) : (
        <div className={compact ? "flex flex-col space-y-3" : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"}>
          {filteredNotes.map(note => (
            <NoteCard 
              key={note.id} 
              note={note} 
              onEdit={onEdit} 
              onDelete={onDelete} 
              compact={compact}
            />
          ))}
        </div>
      )}
    </div>
  );
}