import './App.css'
import { AddTodo } from './components/AddTodo';
import { TodoList } from './components/TodoList';
import { usePersistedTodos } from './hooks/usePersistedTodos';


function App() {
  const { todos, saveNewTodos, setTodos } = usePersistedTodos()

  const handleAddToDo = (title) => {
    const newTodo = {
      title,
      id: crypto.randomUUID(),
      completed: false
    }
    const newTodos = { ...todos, data: [...(todos.data || []), newTodo] }
    saveNewTodos(newTodos)
    setTodos()
  }

  const handleRemove = (id) => {
    const newTodos = {...todos, data: todos.data.filter(todo => todo.id !== id)}
    saveNewTodos(newTodos)
    setTodos()
  }

  const handleToggle = (id, completed) => {
    const newTodos = {
      ...todos,
      data: todos.data.map(todo => {
        if (todo.id === id) {
          return {
            ...todo,
            completed
          }
        }
        return todo
      })
    }
    saveNewTodos(newTodos)
    setTodos()
  }

  const handleEdit = (id, newTitle) => {
    const newTodos = {
      ...todos,
      data: todos.data.map(todo => {
        if (todo.id === id) {
          return {
            ...todo,
            title: newTitle
          }
        }
        return todo
      })
    }
    saveNewTodos(newTodos)
    setTodos()
  }

  const sortedList = todos.data ? [...todos.data].sort((a, b) => {
    if (a.completed === b.completed) return 0;
    return a.completed ? 1 : -1;
  }) : []

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
