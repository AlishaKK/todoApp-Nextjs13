"use client";

import React, { useEffect, useState } from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState('');
  const [editingId, setEditingId] = useState(null);

  const fetchTodos = async () => {
    const response = await fetch('/api/todo');
    const data = await response.json();
    setTodos(data);
  };

  const addTodo = async (e) => {
    e.preventDefault();
    if (!todo.trim()) return;

    const newTodo = { id: Date.now(), text: todo.trim() };

    await fetch('/api/todo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTodo),
    });

    setTodo('');
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await fetch('/api/todo', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });

    fetchTodos();
  };

  const updateTodo = async (id, text) => {
    await fetch('/api/todo', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, text }),
    });

    setTodo('');
    setEditingId(null);
    fetchTodos();
  };

  const handleEdit = (todo) => {
    setTodo(todo.text);
    setEditingId(todo.id);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-black text-center mb-4">Todo App</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (editingId) {
            updateTodo(editingId, todo);
          } else {
            addTodo(e);
          }
        }}
        className="flex mb-4"
      >
        <input
          type="text"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          placeholder="Add or update a todo"
          className="flex-grow border border-gray-600 rounded-l-md p-2 focus:outline-none focus:ring focus:border-black"
        />
        <button
          type="submit"
          className="bg-black text-white rounded-r-md p-2 hover:bg-gray-800 transition"
        >
          {editingId ? 'Update' : 'Add'}
        </button>
      </form>
      <ul className="list-none">
        {todos.map((item) => (
          <li key={item.id} className="flex justify-between items-center py-2 border-b border-gray-300">
            <span className="text-black">{item.text}</span>
            <div>
              <button
                onClick={() => handleEdit(item)}
                className="text-black bg-slate-200 hover:text-gray-600 mx-1"
              >
                <FaEdit />
              </button>
              <button
                onClick={() => deleteTodo(item.id)}
                className="text-black bg-slate-200  mx-1"
              >
                <FaTrash />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
