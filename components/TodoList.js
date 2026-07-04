'use client'

import { CheckIcon, PencilIcon, XIcon } from 'lucide-react'

export default function TodoList({
  todos,
  deleteTodo,
  toggleTodo,
  editTodo,
}) {
  if (todos.length === 0) {
    return (
      <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-8 text-center">
        <p className="text-gray-500 dark:text-gray-400">
          No tasks to display
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {todos.map((todo) => (
        <div
          key={todo.id}
          className="flex items-center justify-between rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-4 py-4"
        >
          {/* Left */}
          <div className="flex items-center gap-3 flex-1">
            <button
              onClick={() => toggleTodo(todo.id)}
              className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                todo.completed
                  ? 'border-green-500 bg-green-500 text-white'
                  : 'border-gray-400'
              }`}
            >
              {todo.completed && <CheckIcon className="h-3 w-3" />}
            </button>

            <span
              className={`text-lg ${
                todo.completed
                  ? 'line-through text-gray-400'
                  : 'text-gray-900 dark:text-white'
              }`}
            >
              {todo.text}
            </span>
          </div>

          {/* Right Buttons */}
          <div className="flex items-center gap-2">

            {/* Edit Button */}
            <button
              onClick={() => editTodo(todo)}
              className="rounded-lg p-2 text-blue-500 hover:bg-blue-100 dark:hover:bg-blue-900/20 transition"
            >
              <PencilIcon className="h-5 w-5" />
            </button>

            {/* Delete Button */}
            <button
              onClick={() => deleteTodo(todo.id)}
              className="rounded-lg p-2 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/20 transition"
            >
              <XIcon className="h-5 w-5" />
            </button>

          </div>
        </div>
      ))}
    </div>
  )
}