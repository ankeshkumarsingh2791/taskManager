import React, { useState } from 'react';
import DropDown from '../ui/DropDown';

const NoteForm = ({ onSubmit }) => {
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (content.trim() === '') return;
    onSubmit(content);
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 shadow-md rounded">
      <h2 className="text-lg font-semibold mb-2">Add Project Note</h2>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your note..."
        className="w-full border p-2 rounded"
        rows={4}
      />
      <div>
        <DropDown title={"Project"} />
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mt-2">
        Add Note
      </button>
    </form>
  );
};

export default NoteForm;
