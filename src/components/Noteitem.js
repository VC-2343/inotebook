import React, { useContext } from 'react'
import NoteContext from '../context/notes/NoteContext';

const Noteitem = (props) => {
    const context = useContext(NoteContext);
     const {deletenote}=context;
    const {note,updatenote}=props;
  return (
    <div className='col-md-3'>
      <div className="card">
  <div className="card-body">
    <h5 className="card-title">{note.title}</h5>
    <p className="card-text">{note.description}</p>
    <i className="bi bi-archive-fill" onClick={()=>deletenote(note._id)}></i>
    <i className="bi bi-pencil-square" onClick={()=>updatenote(note)}></i>
   
  </div>
</div>
    </div>
  )
}

export default Noteitem
