import { useState, useRef } from "react";
import "./App.css";

let nextId = 1;

export default function App() {
  const [notes, setNotes] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const formRef = useRef(null);

  function createNote(event) {
    event.preventDefault();

    const newNote = {
      id: nextId++,
      name,
      description,
      image: imageFile ? URL.createObjectURL(imageFile) : null,
    };

    setNotes((prev) => [...prev, newNote]);
    setName("");
    setDescription("");
    setImageFile(null);
    formRef.current.reset();
  }

  function deleteNote(id) {
    setNotes((prev) => prev.filter((note) => note.id !== id));
  }

  return (
    <div className="app-wrapper">
      <h1 className="app-title">My Notes App</h1>

      <form className="note-form" onSubmit={createNote} ref={formRef}>
        <input
          className="input"
          type="text"
          placeholder="Note Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          className="input"
          type="text"
          placeholder="Note Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          className="file-input"
          type="file"
          accept="image/png, image/jpeg"
          onChange={(e) => setImageFile(e.target.files[0] || null)}
        />
        <button className="btn btn-primary" type="submit">
          Create Note
        </button>
      </form>

      <hr className="divider" />

      <h2 className="section-title">Current Notes</h2>

      {notes.length === 0 && (
        <p className="empty-state">No notes yet. Create one above!</p>
      )}

      <div className="notes-grid">
        {notes.map((note) => (
          <div key={note.id} className="note-card">
            <h3 className="note-name">{note.name}</h3>
            <p className="note-description">{note.description}</p>
            {note.image && (
              <img
                src={note.image}
                alt={`visual aid for ${note.name}`}
                className="note-image"
              />
            )}
            <button
              className="btn btn-danger"
              onClick={() => deleteNote(note.id)}
            >
              Delete Note
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}