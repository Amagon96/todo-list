import PropTypes from 'prop-types'
import EditIcon from '@mui/icons-material/Edit'
import CheckIcon from '@mui/icons-material/Check'
import { IconButton } from '@mui/material'
import { useState } from 'react'

export const TodoTitle = ({ id, title, completed, editTitle }) => {
  const [newTitle, setNewTitle] = useState(title)
  const [editMode, activeEditMode] = useState(false)
  
  const handleEdit = (id, newTitle, event) => {
    event.preventDefault()
    editTitle(id, newTitle)
    activeEditMode(prevState => !prevState)
  }

  if (editMode) {
    return (
      <>
        <form className='edit-form' onSubmit={(event) => handleEdit(id, newTitle, event)}>
          <input
            className='edit-input'
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
        </form>
        <IconButton role='edit-button' onClick={() => activeEditMode(prevState => !prevState)}>
          <CheckIcon className='todo-button' />
        </IconButton>
      </>
    )
  } else {
    return (
      <>
        <label 
          className={`${completed ? 'todo-title-completed' : 'todo-title'}`}
        >
          {title}
        </label>
        <IconButton role='edit-button' onClick={() => activeEditMode(prevState => !prevState)}>
          <EditIcon className='todo-button' />
        </IconButton>
      </>
    )
  }
}

TodoTitle.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  editTitle: PropTypes.func.isRequired,
}
