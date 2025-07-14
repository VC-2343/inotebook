import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const host = 'http://localhost:5000';
  const notesInitial = [];

  const [notes, setnotes] = useState(notesInitial);

  const getnote = async () => {
    const response = await fetch(`${host}/api/notes/fetchnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjg2NjFkMjk3ZDNlMmMwODQ5M2FkZjlkIn0sImlhdCI6MTc1MTYwMjU2OX0.tSgKZim5RsicWHwPkaCj1BLhwnwpOtqEwjC666yCn_Y'
      },
    });
    const json = await response.json();
    console.log(json);
    setnotes(json);
  };

  const addnote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjg2NjFkMjk3ZDNlMmMwODQ5M2FkZjlkIn0sImlhdCI6MTc1MTYwMjU2OX0.tSgKZim5RsicWHwPkaCj1BLhwnwpOtqEwjC666yCn_Y'
      },
      body: JSON.stringify({ title, description, tag })
    });

    const json = await response.json();
    console.log("Note added:", json);
    setnotes([...notes, json]);
  };

  const deletenote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjg2NjFkMjk3ZDNlMmMwODQ5M2FkZjlkIn0sImlhdCI6MTc1MTYwMjU2OX0.tSgKZim5RsicWHwPkaCj1BLhwnwpOtqEwjC666yCn_Y'
      },
    });

    const json = await response.json();
    const newnotes = notes.filter((note) => { return note._id !== id });
    setnotes(newnotes);
  };

  const editnote = async (id, title, description, tag) => {
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjg2NjFkMjk3ZDNlMmMwODQ5M2FkZjlkIn0sImlhdCI6MTc1MTYwMjU2OX0.tSgKZim5RsicWHwPkaCj1BLhwnwpOtqEwjC666yCn_Y'
      },
      body: JSON.stringify({ title, description, tag })
    });

    const json = await response.json();
const newnotes = notes.map((note) =>
  note._id === id ? { ...note, title, description, tag } : note
);
    
    for (let index = 0; index <  newnotes.length; index++) {
      const element =  newnotes[index];
       newnotes[index].title = title;
    newnotes[index].description = description;
    newnotes [index].tag = tag;
     break;
    }
    setnotes(newnotes)
  };

  return (
    <NoteContext.Provider value={{ notes, addnote, deletenote, editnote, getnote }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
 