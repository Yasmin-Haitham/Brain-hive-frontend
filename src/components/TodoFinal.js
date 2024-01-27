import React, { useState } from "react";
import "../ToDoListFinal.css";

const TodoFinal = () => {
  // Initial state with an array of tasks
  const [tasks, setTasks] = useState([
    { id: 1, name: "task 1", isCompleted: false },
    { id: 2, name: "task 2", isCompleted: false },
    // ...more tasks
  ]);

  // Function to handle PDF download
  const handleDownloadPDF = (taskId) => {
    // Logic to download PDF
    console.log(`PDF Downloaded for task ${taskId}`);
  };

  // Function to toggle task completion
  const toggleTaskCompletion = (taskId) => {
    // Update the isCompleted property for the clicked task
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, isCompleted: !task.isCompleted };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  return (
    <div className='todo-container'>
      <h2 className='todo-title'>Course Tasks</h2>
      {tasks.map((task) => (
        <div key={task.id} className='task'>
          <div className='taskname'>{task.name}</div>

          <div className='task-buttons'>
            <button
              onClick={() => handleDownloadPDF(task.id)}
              className='btn download-btn'>
              pdf
            </button>
            <button
              onClick={() => toggleTaskCompletion(task.id)}
              className={`btn ${
                task.isCompleted ? "complete-btn" : "incomplete-btn"
              }`}>
              {task.isCompleted ? "✓" : "✕"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TodoFinal;
