export default function NoteCard({ note, onEdit, onDelete, compact }) {
  return (
    <div 
      className={`group relative p-4 bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer ${
        note.is_pinned ? 'border-indigo-300 bg-indigo-50/30' : 'border-gray-200'
      }`}
      onClick={() => onEdit(note)}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-bold text-gray-900 truncate pr-6">
          {note.is_pinned && <span className="mr-2 text-indigo-600">📌</span>} 
          {note.title}
        </h3>
      
        <button 
          onClick={(e) => {
            e.stopPropagation(); 
            onDelete(note.id);
          }}
          className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-opacity"
          title="Delete Note"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      {!compact && (
        <p className="text-gray-600 text-sm line-clamp-3 mb-4">
          {note.content}
        </p>
      )}

      <div className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">
        {new Date(note.created_at).toLocaleDateString()} 
      </div>
    </div>
  );
}