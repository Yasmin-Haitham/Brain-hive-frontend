// NoteTaker.js

import React, { useState } from "react";
import "../NoteTaker.css";
import { Button } from "react-bootstrap";

const NoteTaker = (props) => {
  const [note, setNote] = useState("");
  const [currentNotes, setCurrentNotes] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  const handleChange = (event) => {
    setNote(event.target.value);
  };

  const handleClick = () => {
    if (editingIndex !== null) {
      // If editing, update the existing note
      const updatedNotes = [...currentNotes];
      updatedNotes[editingIndex] = note;
      setCurrentNotes(updatedNotes);
      setEditingIndex(null);
    } else {
      // If not editing, add a new note
      setCurrentNotes([...currentNotes, note]);
    }
    setNote("");
  };

  const handleEdit = (index) => {
    setNote(currentNotes[index]);
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    const updatedNotes = [...currentNotes];
    updatedNotes.splice(index, 1);
    setCurrentNotes(updatedNotes);
    setEditingIndex(null);
  };

  const insertLineBreaks = (text, wordsPerLine, maxWordLength) => {
    const words = text.split(" ");
    const lines = [];
    for (let i = 0; i < words.length; i += wordsPerLine) {
      const lineWords = words.slice(i, i + wordsPerLine);
      const processedWords = lineWords.map((word) =>
        word.length > maxWordLength
          ? word.replace(
              new RegExp(`.{${maxWordLength}}`, "g"),
              (match) => match + "\n"
            )
          : word
      );
      lines.push(processedWords.join(" "));
    }
    return lines.join("\n");
  };

  return props.trigger ? (
    <div className="note-taker-container">
      <div>
        <Button
          onClick={() => {
            props.setTrigger(false);
            setEditingIndex(null); // Reset editing index on close
          }}
          variant="outline-success"
          className="closebtnnote"
        >
          Close
        </Button>
        {props.children}
      </div>
      <h1 className="note-taker-heading">Note-Taker</h1>
      <p className="note-taker-sub-heading">
        A place to put your epic thoughts.
      </p>
      <div className="note-taker-form-holder">
        <div className="note-taker-form-group">
          <input
            type="text"
            className="note-taker-input"
            id="note"
            name="note"
            placeholder="Enter a note here..."
            onChange={handleChange}
            value={note}
          />
          <br />
          <br />
          <button
            type="button"
            className="note-taker-button"
            onClick={handleClick}
          >
            {editingIndex !== null ? "Update Note" : "Take Notes!"}
          </button>
        </div>
      </div>

      <div className="note-taker-notes-container">
        {currentNotes.length === 0 ? (
          <p className="note-taker-no-notes">No notes to display</p>
        ) : (
          <div className="note-taker-notes-list">
            {currentNotes.map((n, index) => (
              <div key={index} className="note-taker-note">
                <p className="note-taker-note-text">
                  {insertLineBreaks(n, 10, 80)}
                  <hr />
                </p>
                <div className="note-taker-note-actions">
                  <Button
                    onClick={() => handleEdit(index)}
                    variant="outline-success"
                    style={{
                      backgroundColor: "#b17c0d",
                      border: "none",
                      color: "white",
                      marginRight: "50px",
                      position: "absolute",
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDelete(index)}
                    variant="outline-success"
                    style={{
                      backgroundColor: "#b17c0d",
                      border: "none",
                      color: "white",
                      position: "relative",
                      marginLeft: "75px",
                    }}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  ) : (
    ""
  );
};

export default NoteTaker;
