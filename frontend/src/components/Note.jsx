import React from "react";
import "../styles/Note.css";

function Note({ note, deleteNote }) {
  const formatDate = new Date(note.created_at).toLocaleDateString("en-US");

  return (
    <div className="NoteContainer">
      <h2 className="NoteTitle">{note.title}</h2>
      <p className="NoteContent">{note.content}</p>
      <p className="NoteDate">{formatDate}</p>
      <button className="deleteButton" onClick={() => deleteNote(note.id)}>
        Delete
      </button>
    </div>
  );
}
export default Note;
