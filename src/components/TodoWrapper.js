import React, { useState, useEffect } from "react";
import { Todo } from "./Todo";
import { TodoForm } from "./TodoForm";
import { EditTodoForm } from "./EditTodoForm";
import * as api from "./API";
import "../Todo.css";


export const TodoWrapper = () => {
  const [todos, setTodos] = useState([]);
  const [todoAdded, setTodoAdded] = useState(false);
  const userId = sessionStorage.getItem("userId")

  useEffect(() => {
    // Fetch all todos on component mount
    fetchTodos();
    setTodoAdded(false);
  }, [todoAdded]);

  const fetchTodos = async () => {
    try {
      const todosData = await api.getAllTodos();
      setTodos(todosData);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const addTodo = async (todo) => {
    try {
      const newTodo = await api.addTodo(todo,userId);
      console.log(newTodo);
      setTodoAdded(true);
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };
  

  const deleteTodo = async (id) => {
    try {
      await api.deleteTodo(id);
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const toggleComplete = async (id) => {
    try {
      await api.toggleTodoCompletion(id);
      setTodos(
        todos.map((todo) =>
          todo._id === id ? { ...todo, completed: !todo.completed } : todo
        )
      );
    } catch (error) {
      console.error("Error toggling todo completion:", error);
    }
  };

  const editTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo._id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  };

  const editTask = async (task, id) => {
    try {
      await api.updateTodo(id, task);
      setTodos(
        todos.map((todo) =>
          todo._id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo
        )
      );
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  return (
    <div className="TodoWrapper">
      <h1 className="todo-h1">Get Things Done !</h1>
      <TodoForm addTodo={addTodo} />
      {/* display todos */}
      {todos.map((todo) =>
        todo.isEditing ? (
          <EditTodoForm editTodo={editTask} task={todo} />
        ) : (
          <Todo
            key={todo.id}
            task={todo}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
            toggleComplete={toggleComplete}
          />
        )
      )}
    </div>
  );
};
