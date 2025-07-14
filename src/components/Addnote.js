import React, { useContext, useState } from 'react';
import NoteContext from '../context/notes/NoteContext';

const Addnote = () => {
  const context = useContext(NoteContext);
  const { addnote } = context;

  const [note, setnote] = useState({ title: "", description: "", tag: "" });

  const handleclick = (e) => {
    e.preventDefault();
    addnote(note.title, note.description, note.tag); 
    setnote({ title: "", description: "", tag: "" });
    console.log("Submitted note:", note);

  };

  const onchange = (e) => {
    setnote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h1>Write your notes here</h1>
      <div className="my-3">
        <label htmlFor='title' className="form-label">Title</label>
        <input type="text" id='title' name='title' className="form-control" value={note.title} onChange={onchange} />
      </div>
      <div className="mb-3">
        <label htmlFor='description' className="form-label">Description</label>
        <input type="text" id='description' name='description' className="form-control" value={note.description} onChange={onchange} />
      </div>
      <div className="mb-3">
        <label htmlFor='tag' className="form-label">Tag</label>
        <input type="text" id='tag' name='tag' className="form-control" value={note.tag} onChange={onchange} />
      </div>
      <button type='submit' className='btn btn-primary' onClick={handleclick}>Add note</button>
    </div>
  );
};

export default Addnote;
