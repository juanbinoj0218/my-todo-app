'use client';

import React, { useState, ChangeEvent, useEffect } from 'react';
import { auth, googleProvider, signInWithPopup, signOut } from './firebase'; 
import { User } from 'firebase/auth';

interface TodoItem {
  id: string;
  title: string;
  completed: boolean;
}

export default function Home() {
  const [taskInput, setTaskInput] = useState<string>('');
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [user, setUser] = useState<User | null>(null);

  // Watch for User Login/Logout via Firebase
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async (): Promise<void> => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleLogout = async (): Promise<void> => {
    await signOut(auth);
  };

  // Add task to local browser state
  const handleAddTask = (): void => {
    if (!taskInput || taskInput.trim() === '') return;
    
    const newTodo: TodoItem = {
      id: Date.now().toString(),
      title: taskInput.trim(),
      completed: false
    };

    setTodos((prevTodos) => [...prevTodos, newTodo]);
    setTaskInput('');
  };

  // Toggle checkbox state locally
  const handleToggleTodo = (id: string): void => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setTaskInput(e.target.value);
  };

  return (
    <div style={{ padding: '50px', fontFamily: 'sans-serif', maxWidth: '500px', margin: '0 auto' }}>
      <h1 style={{ color: 'white', marginBottom: '30px' }}>My Intern To-Do App</h1>

      {!user ? (
        <div style={{ marginBottom: '30px' }}>
          <p style={{ color: 'white', fontSize: '16px' }}>Please sign in to view your tasks:</p>
          <button 
            onClick={handleLogin} 
            style={{ padding: '12px 24px', cursor: 'pointer', backgroundColor: '#4285F4', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 'bold', fontSize: '14px' }}
          >
            Sign In with Google
          </button>
        </div>
      ) : (
        <div>
          {/* User Welcome Row */}
          <div style={{ marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#1e1e1e', padding: '15px', borderRadius: '8px' }}>
            <p style={{ color: '#4caf50', margin: 0, fontSize: '16px' }}>
              Welcome, <strong>{user.displayName}</strong>!
            </p>
            <button 
              onClick={handleLogout} 
              style={{ padding: '6px 12px', cursor: 'pointer', backgroundColor: '#f44336', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 'bold' }}
            >
              Logout
            </button>
          </div>

          {/* To-Do input area */}
          <div style={{ marginBottom: '30px', display: 'flex', gap: '10px' }}>
            <input 
              type="text" 
              placeholder="Add a new task..." 
              value={taskInput}
              onChange={handleInputChange}
              style={{ padding: '12px', flexGrow: 1, backgroundColor: 'white', color: 'black', border: '1px solid #ccc', borderRadius: '4px', fontSize: '14px' }} 
            />
            <button 
              onClick={handleAddTask} 
              style={{ padding: '12px 20px', cursor: 'pointer', backgroundColor: '#0070f3', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 'bold', fontSize: '14px' }}
            >
              Add Task
            </button>
          </div>

          {/* Displaying the tasks */}
          <h3 style={{ color: 'white', borderBottom: '1px solid #333', paddingBottom: '10px' }}>My Tasks:</h3>
          {todos.length === 0 ? (
            <p style={{ color: '#888', fontStyle: 'italic' }}>No tasks added yet. Start typing above!</p>
          ) : (
            <ul style={{ color: 'white', paddingLeft: '0', listStyleType: 'none', lineHeight: '1.6' }}>
              {todos.map((todo: TodoItem) => (
                <li 
                  key={todo.id} 
                  style={{ 
                    padding: '10px', 
                    borderBottom: '1px solid #222', 
                    fontSize: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    backgroundColor: '#111',
                    borderRadius: '4px',
                    marginBottom: '5px'
                  }}
                >
                  <input 
                    type="checkbox" 
                    checked={todo.completed} 
                    onChange={() => handleToggleTodo(todo.id)}
                    style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                  />
                  <span style={{ 
                    textDecoration: todo.completed ? 'line-through' : 'none',
                    color: todo.completed ? '#666' : 'white'
                  }}>
                    {todo.title}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}