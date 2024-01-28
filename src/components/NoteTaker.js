// NoteTaker.js

import React, { useState } from "react";
import "../NoteTaker.css"; // Import the CSS file

const NoteTaker = () => {
  const [note, setNote] = useState("");
  const [currentNotes, setCurrentNotes] = useState([]);

  const handleChange = (event) => {
    setNote(event.target.value);
  };

  const handleClick = () => {
    setCurrentNotes([...currentNotes, note]);
    setNote("");
  };

  return (
    <div className="note-taker-container">
      <h1 className="note-taker-heading">Note Taker</h1>
      <p className="note-taker-sub-heading">
        A place to put your epic thoughts.
      </p>
      <div className="note-taker-form-holder">
        <div className="note-taker-form-group">
          <label htmlFor="note" className="note-taker-label">
            Note:
          </label>
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
          <button
            type="button"
            className="note-taker-button"
            onClick={handleClick}
          >
            Submit
          </button>
        </div>
      </div>

      <div className="note-taker-notes-container">
        {currentNotes.length === 0 ? (
          <p className="note-taker-no-notes">No notes to display</p>
        ) : (
          <table className="note-taker-notes-table">
            <thead>
              <tr>
                <th className="note-taker-notes-header">Note</th>
              </tr>
            </thead>
            <tbody>
              {currentNotes.map((n, index) => (
                <tr key={index}>
                  <td className="note-taker-note-cell">{n}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default NoteTaker;
