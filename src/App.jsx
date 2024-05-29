import { useEffect, useState } from 'react';
import './App.css'
import { AddTodo } from './components/AddTodo';
import { TodoList } from './components/TodoList';

function App() {

  const [todos, setTodos] = useState([])

  useEffect(() => {
    const localTodos = localStorage.getItem('__stored__todos__')
    if (localTodos) {
      setTodos(JSON.parse(localTodos))
    }
  }, [])

  const handleAddToDo = (title) => {
    const newTodo = {
      title,
      id: crypto.randomUUID(),
      completed: false
    }

    const newTodos = [...todos, newTodo]
    localStorage.setItem('__stored__todos__', JSON.stringify(newTodos));
    setTodos(newTodos)
  }

  const handleRemove = (id) => {
    const newTodos = todos.filter(todo => todo.id !== id)
    localStorage.setItem('__stored__todos__', JSON.stringify(newTodos));
    setTodos(newTodos)
  }

  const handleToggle = (id, completed) => {
    const newTodos = todos.map(todo => {
      if (todo.id === id) {
        return {
          ...todo,
          completed
        }
      }
      return todo
    })
    localStorage.setItem('__stored__todos__', JSON.stringify(newTodos));
    setTodos(newTodos)
  }

  const handleEdit = (id, newTitle) => {
    const newTodos = todos.map(todo => {
      if (todo.id === id) {
        return {
          ...todo,
          title: newTitle
        }
      }
      return todo
    })
    localStorage.setItem('__stored__todos__', JSON.stringify(newTodos));
    setTodos(newTodos)
  }

  const sortedList = [...todos].sort((a, b) => {
    if (a.completed === b.completed) return 0;
    return a.completed ? 1 : -1;
  });

  return (
    <>
      <header>
        <h1>My ToDo List</h1>
        <AddTodo  saveTodo={handleAddToDo}/>
      </header>
      <main>
        <TodoList todos={sortedList} removeTodo={handleRemove} toggleTodo={handleToggle} editTitle={handleEdit} />
      </main>
    </>
  )
}

export default App
