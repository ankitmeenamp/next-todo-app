'use client'

import { useState, useEffect } from 'react'
import { SunIcon, MoonIcon, User, LogOut } from 'lucide-react'
import { useTheme } from '@/components/ThemeProvider'
import TodoForm from '@/components/TodoForm'
import TodoList from '@/components/TodoList'
import { useRouter } from "next/navigation";

interface Todo {
  id: string
  text: string
  completed: boolean
}

export default function Home() {
  const router = useRouter();
  const [showProfile, setShowProfile] = useState(false);

const [user, setUser] = useState({
  name: "",
  email: "",
});
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null)
  const [todos, setTodos] = useState<Todo[]>([])
  const { theme, toggleTheme } = useTheme()
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all')


  useEffect(()=>{
     fetchTodos();
     fetchUser();
  },[])

  const fetchUser = async ()=>{
    const response = await fetch('/api/user')
    const data = await response.json()
    
    if(response.status === 401){
      return router.push("/login");
     }
     if(!data.error){
     setUser(data)
     } 
  }

  const fetchTodos = async ()=>{
    const response = await fetch('/api/todos')
    const data = await response.json()
    
    if(response.status === 401){
      return router.push("/login");
     }
     if(!data.error){
      setTodos(data.reverse());
     } 
  }

  useEffect(() => {
    const savedTodos = localStorage.getItem('todos')
    if (savedTodos) {
      try {
        setTodos(JSON.parse(savedTodos))
      } catch (e) {
        console.error('Failed to parse todos:', e)
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const addTodo = async(text: string) => {
         const response = await fetch("/api/todos",{
          method: "POST",
          body: JSON.stringify({text}),
         });
         const newTodo = await response.json();
         setTodos([newTodo, ...todos]);
        }

  const deleteTodo = async(id: string) => {
   const response= await fetch(`/api/todos/${id}`,{
    method: "DELETE",
   });

   if(response.status ===204){
    fetchTodos()
   }
  }

  const  toggleTodo = async(id: string) => {
    const todo = todos.find((todo)=> todo.id === id);
    const response = await fetch(`/api/todos/${id}`,{
      method: "PUT",
      body: JSON.stringify({ completed: !todo.completed})
    });

    if(response.status === 200){
      fetchTodos();
    }
  }

  const startEdit = (todo: Todo) => {
  setEditingTodo(todo);
};


  const updateTodo  = async (id: string, newText: string) => {
  const response = await fetch(`/api/todos/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text: newText }),
  });

  if (response.ok) {
    fetchTodos();
    setEditingTodo(null);
  }
};

const logout = async () => {
 const response =  await fetch("/api/logout", {
    method: "POST",
  });
  if(response.status === 204){
    return router.push("/login");
  }
};

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed))
  }

  const getFilteredTodos = () => {
    switch (filter) {
      case 'active':
        return todos.filter(todo => !todo.completed)
      case 'completed':
        return todos.filter(todo => todo.completed)
      default:
        return todos
    }
  }
  

  const completedCount = todos.filter(todo => todo.completed).length
  const pendingCount = todos.filter(todo => !todo.completed).length

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <header className="mb-8 flex items-center justify-between">
  <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
    Todo App
  </h1>

  <div className="flex items-center gap-3">
    <button
      onClick={toggleTheme}
      className="rounded-lg p-2 transition-colors hover:bg-gray-200 dark:hover:bg-gray-700"
    >
      {theme === "dark" ? (
        <SunIcon className="h-5 w-5 text-yellow-500" />
      ) : (
        <MoonIcon className="h-5 w-5 text-gray-700" />
      )}
    </button>

    <div className="relative">
      <button
        onClick={() => setShowProfile(!showProfile)}
        className="rounded-full border border-gray-600 p-2 hover:bg-gray-700"
      >
        <User className="h-5 w-5" />
      </button>

      {showProfile && (
        <div className="absolute right-0 mt-2 w-60 rounded-lg border border-gray-700 bg-gray-800 shadow-lg z-50">
          <div className="border-b border-gray-700 p-4">
            <p className="font-semibold text-white">
              {user.name}
            </p>

            <p className="text-sm text-gray-400">
              {user.email}
            </p>
          </div>

          <button
            onClick={logout}
            className="flex w-full items-center gap-2 px-4 py-3 text-red-400 hover:bg-gray-700"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      )}
    </div>
  </div>
</header>

      <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
        {pendingCount} pending, {completedCount} completed
      </div>

      <TodoForm
  addTodo={addTodo}
  updateTodo={updateTodo}
  editingTodo={editingTodo}
  setEditingTodo={setEditingTodo}
/>

<main className="mt-6">
  <TodoList
    todos={getFilteredTodos()}
    deleteTodo={deleteTodo}
    toggleTodo={toggleTodo}
    editTodo={startEdit}
  />
</main>

      {todos.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`rounded-lg px-4 py-2 text-sm transition-colors ${
              filter === 'all'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('active')}
            className={`rounded-lg px-4 py-2 text-sm transition-colors ${
              filter === 'active'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            Active
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`rounded-lg px-4 py-2 text-sm transition-colors ${
              filter === 'completed'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            Completed
          </button>
          {completedCount > 0 && (
            <button
              onClick={clearCompleted}
              className="rounded-lg px-4 py-2 text-sm text-red-600 transition-colors hover:bg-red-100 dark:text-red-400 dark:hover:bg-red-900/20"
            >
              Clear completed
            </button>
          )}
        </div>
      )}
    </div>
  )
}