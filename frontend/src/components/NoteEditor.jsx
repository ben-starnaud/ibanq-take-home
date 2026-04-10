import { useState } from 'react';

export default function NoteEditor({ activeNote, onSave, onCancel }) {
  const [title, setTitle] = useState(activeNote?.title || '');
  const [content, setContent] = useState(activeNote?.content || '');
  const [pinned, setPinned] = useState(activeNote?.is_pinned || false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return alert("Title and Content are required"); 
    onSave({ title, content, is_pinned: pinned });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col h-full space-y-4 p-6 bg-white shadow-lg">
      <input 
        className="text-2xl font-bold border-b focus:outline-none" 
        placeholder="Note Title..."
        value={title} onChange={e => setTitle(e.target.value)}
        required 
      />
      <textarea 
        className="flex-grow resize-none focus:outline-none text-gray-700"
        placeholder="Start writing..."
        value={content} onChange={e => setContent(e.target.value)}
        required 
      />
      <div className="flex justify-between items-center border-t pt-4">
        <label className="flex items-center space-x-2 cursor-pointer">
          <input type="checkbox" checked={pinned} onChange={e => setPinned(e.target.checked)} />
          <span>Pin Note</span> 
        </label>
        <div className="space-x-2">
          <button type="button" onClick={onCancel} className="px-4 py-2 text-gray-500">Cancel</button>
          <button type="submit" className="px-6 py-2 bg-indigo-600 text-white rounded">Save</button>
        </div>
      </div>
    </form>
  );
}