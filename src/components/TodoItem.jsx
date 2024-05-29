import PropTypes from 'prop-types';
import DeleteIcon from '@mui/icons-material/Delete'
import { IconButton } from '@mui/material'
import { TodoTitle } from './TodoTitle'

export const TodoItem = ({ id, title, completed, removeTodo, toggleTodo, editTitle }) => {
  const handleRemoveButton = (id) => {
    removeTodo(id)
  }

  const handleToggle = (id, complete) => {
    toggleTodo(id, complete)
  }

  return (
    <div className="todo-item" data-testid="todo-item">
      <input 
        className="completed-toggle"
        checked={completed}
        type="checkbox"
        onChange={(event) => handleToggle(id, event.target.checked)}
      />
      <TodoTitle 
        id={id} 
        title={title}
        completed={completed}
        editTitle={editTitle}
      />
      <IconButton onClick={() => handleRemoveButton(id)}>
        <DeleteIcon className='todo-button' />
      </IconButton>
    </div>
  )
}


TodoItem.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  removeTodo: PropTypes.func.isRequired,
  toggleTodo: PropTypes.func.isRequired,
  editTitle: PropTypes.func.isRequired,
};