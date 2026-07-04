'use client'

import { useState, useEffect } from 'react'

export default function TodoForm({
  addTodo,
  updateTodo,
  editingTodo,
  setEditingTodo,
}) {
  const [input, setInput] = useState('')

  useEffect(() => {
    if (editingTodo) {
      setInput(editingTodo.text)
    }
  }, [editingTodo])

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (!input.trim()) return;

  if (editingTodo) {
    await updateTodo(editingTodo.id, input);
  } else {
    await addTodo(input);
  }

  setInput("");
};

  const cancelEdit = () => {
    setEditingTodo(null)
    setInput('')
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add a new task..."
        className="todo-input flex-1"
      />

      <button
        type="submit"
        className="todo-button whitespace-nowrap"
      >
        {editingTodo ? 'Update Task' : 'Add Task'}
      </button>

      {editingTodo && (
        <button
          type="button"
          onClick={cancelEdit}
          className="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600 transition"
        >
          Cancel
        </button>
      )}
    </form>
  )
}