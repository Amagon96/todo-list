import PropTypes from 'prop-types'
import { useState } from "react"

export const AddTodo = ({ saveTodo }) => {

  const [title, setTitle] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault();
    saveTodo(title)
    setTitle('');
  }
  
  return (
    <div className="create-todo-input">
      <form onSubmit={handleSubmit}>
        <input 
          className="todo-input"
          value={title} 
          onChange={(e) => setTitle(e.target.value)}
          placeholder="New TODO item"
          autoFocus/>
      </form>
    </div>
  )
}

AddTodo.propTypes = {
  saveTodo: PropTypes.func.isRequired
}
