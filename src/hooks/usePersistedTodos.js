import { useEffect, useState } from 'react';
import { saveTodos, getSavedTodos } from '../services/todosService';


export const usePersistedTodos = () => {
  const [todos, setTodos] = useState({ id: '', data: [] })

  const saveNewTodos = (newTodos) => {
    saveTodos(newTodos)
  }

  const refreshTodos = () => {
    const actualTodos = getSavedTodos()
    setTodos(actualTodos)
  }

  useEffect(refreshTodos, [])

  return { todos, saveNewTodos, setTodos: refreshTodos }
}