import { useState, useEffect } from "react";
import api from "../api";
import Note from "../components/Note";
import "../styles/Home.css";


function Home() {
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = () => {
    api
      .get("/api/notes/")
      .then((res) => res.data)
      .then((data) => {
        setNotes(data);
        console.log(data);
      })
      .catch((error) => alert(error));
  };
  const deleteNote = (id) => {
    api
      .delete(`/api/notes/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) {
          alert("Note deleted");
        } else {
          alert("Failed to delete note");
        }
        getNotes();
      })
      .catch((error) => alert(error));
  };

  const addNote = (e) => {
    e.preventDefault();
    api
      .post("/api/notes/create/", { title, content })
      .then((res) => {
        if (res.status === 201) {
          alert("Note added");
        } else {
          alert("Failed to add note");
        }
        getNotes();
      })
      .catch((error) => alert(error));
  };

  return (
    <div>
      <div>
        {notes.map((note) => (
          <Note note={note} deleteNote={deleteNote} key={note.id} />
        ))}
      </div>
      <form onSubmit={addNote}>
        <label htmlFor="title">Title:</label>
        <br />
        <input
          type="text"
          id="title"
          name="title"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="content">Content:</label>
        <br />
        <textarea
          id="content"
          name="content"
          required
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <br />
        <input type="submit" value="Add Note" />
      </form>
    </div>
  );
}

export default Home;
