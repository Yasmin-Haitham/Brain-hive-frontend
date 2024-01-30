import React, { useState, useEffect } from "react";
import "../ToDoListFinal.css";
import * as api from "./API.js";

const TodoFinal = ({ tasks, doneTasks }) => {
  // State for user done tasks
  const [userDoneTasks, setUserDoneTasks] = useState(doneTasks);
  console.log("userDoneTasks: "+userDoneTasks)

  // Function to handle PDF download
  const handleDownloadPDF = (index) => {
    try {
      // Open a new tab with the PDF link
      window.open(tasks[index].pdf, "_blank");
      // Window alert
      window.alert(`PDF opened for task ${index}`);
    } catch (error) {
      window.alert("Error opening PDF:", error);
      // Handle the error as needed
    }
  };

  // Function to toggle task completion
const toggleTaskCompletion = async (todoId) => {
  try {
    const res = await api.toggleTodoCompletion(todoId);

    // Assuming the API response contains a property 'todosDone'
    const updatedDoneTasks = res.todosDone || [];

    // Set the state with the updated array of done tasks
    setUserDoneTasks(updatedDoneTasks);
    console.log("Updated Done Tasks:", updatedDoneTasks);
  } catch (err) {
    console.log("Error toggling task completion:", err);
  }
};


  return (
    <div className="todo-container">
      <h2 className="todo-title">Course Tasks</h2>
      {tasks.map((task, index) => (
        <div key={index} className="task">
          <div className="taskname">{task.title}</div>

          <div className="task-buttons">
            <button
              onClick={() => handleDownloadPDF(index)}
              className="btn download-btn"
            >
              pdf
            </button>
            <button
              onClick={() => toggleTaskCompletion(task.id)}
              className={`abtn ${
                userDoneTasks.includes(task.id) ? "complete-btn" : "incomplete-btn"
              }`}
            >
              {userDoneTasks.includes(task.id) ? "✓" : "✕"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TodoFinal;

