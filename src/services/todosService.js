export const getSavedTodos = () => {
  const persistedTodos = localStorage.getItem('__stored__todos__')
  if (persistedTodos) {
    return JSON.parse(persistedTodos)
  }
  return []
}

export const saveTodos = (newTodos) => {
  localStorage.setItem('__stored__todos__', JSON.stringify(newTodos))
}