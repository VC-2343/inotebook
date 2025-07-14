import React, { useContext, useEffect, useRef, useState } from 'react';
import NoteContext from '../context/notes/NoteContext';
import Noteitem from './Noteitem';
import Addnote from './Addnote';

const Notes = () => {
  const context = useContext(NoteContext);
  const { notes, getnote, addnote,editnote } = context;

  const ref = useRef(null);
const refclose=useRef(null);
  const [note, setnote] = useState({id:" ", etitle: "", edescription: "", etag: "" });

  useEffect(() => {
    getnote();
  }, []);

  const updatenote = (currentnote) => {
    ref.current.click();
    setnote({id:currentnote._id, etitle:currentnote.title,edescription:currentnote.description,etag:currentnote.tag});
  };

  const handleclick = (e) => {
       refclose.current.click();
       editnote(note.id,note.etitle,note.edescription,note.etag); 
    e.preventDefault();
    addnote(note.etitle, note.edescription, note.etag);
    setnote({ etitle: "", edescription: "", etag: "" });
    console.log("Submitted note:", note);
  };

  const onchange = (e) => {
    setnote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Addnote />

      <button type="button" className="btn btn-primary d-none" ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">

            <div className="modal-header">
              <h5 className="modal-etitle" id="exampleModalLabel">Edit note</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <div className="modal-body">
              <div className="my-3">
                <label htmlFor='etitle' className="form-label">etitle</label>
                <input type="text" id='eetitle' name='etitle' className="form-control" value={note.etitle} onChange={onchange} />
              </div>
              <div className="mb-3">
                <label htmlFor='edescription' className="form-label">edescription</label>
                <input type="text" id='eedescription' name='edescription' className="form-control" value={note.edescription} onChange={onchange} />
              </div>
              <div className="mb-3">
                <label htmlFor='etag' className="form-label">etag</label>
                <input type="text" id='eetag' name='etag' className="form-control" value={note.etag} onChange={onchange} />
              </div>
              <button type='submit' className='btn btn-primary' onClick={handleclick}>Add note</button>
            </div>

            <div className="modal-footer">
              <button type="button" ref={refclose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" onClick={handleclick} className="btn btn-primary">Update note</button>
            </div>

          </div>
        </div>
      </div>

      <div className="row my-3">
        <h2>Your Notes</h2>
        {notes.map((note) => (
          <Noteitem key={note._id} updatenote={updatenote} note={note} />
        ))}
      </div>
    </>
  );
};

export default Notes;
 