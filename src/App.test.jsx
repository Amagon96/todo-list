import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';
import userEvent from '@testing-library/user-event';
import { act } from 'react';
import { TodoTitle } from './components/TodoTitle';
import { TodoList } from './components/TodoList';
import { AddTodo } from './components/AddTodo';

describe('App component', () => {
  // Mock localStorage
  const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
  }

  const testData = [
    {
        "title": "Luffy",
        "id": "ff4227a2-6386-4852-80cf-a855614b779d",
        "completed": false
    },
    {
        "title": "Nami",
        "id": "be6b166c-4d5c-4629-995d-363da1229b62",
        "completed": false
    },
    {
        "title": "Chopper",
        "id": "45988de4-d65f-415f-a315-7227542570bd",
        "completed": false
    },
    {
        "title": "Franky",
        "id": "2385e79b-3257-4f8f-bdce-335f4e2d1469",
        "completed": false
    },
    {
        "title": "Brook",
        "id": "7357ce02-9f73-4004-b6a0-2aa5b0231915",
        "completed": false
    },
    {
        "title": "Jimbei",
        "id": "3f3676db-a1e5-420d-b296-e97b9c679bac",
        "completed": false
    },
    {
        "title": "Zoro",
        "id": "496a5c62-c435-4797-8f28-6443cda3b2a8",
        "completed": false
    },
    {
        "title": "Sanji",
        "id": "ff9967e5-22fe-47fc-99b9-25377f418ca6",
        "completed": false
    },
    {
        "title": "Robin",
        "id": "59ed7a82-4a69-4f99-af77-0ffda624f55a",
        "completed": false
    },
    {
        "title": "Usopp",
        "id": "844a499a-e93e-4adc-873c-4338a221485b",
        "completed": false
    }
  ]

  beforeEach(() => {
    jest.clearAllMocks()
    global.localStorage = localStorageMock
  })

  test('renders App component', () => {
    render(<App />)
    const headerElement = screen.getByText(/My ToDo List/i)
    expect(headerElement).toBeInTheDocument()
  });

  test('should render todos in list component', () => {
    const { getAllByTestId } = render(<TodoList todos={testData} removeTodo={jest.fn()} toggleTodo={jest.fn()} editTitle={jest.fn()} />)
    const todoList = getAllByTestId('todo-item')
    expect(todoList.length).toBe(10)
  })

  test('should add new todo', () => {
    const handleAddToDo = jest.fn()

    const { getByPlaceholderText } = render(<AddTodo saveTodo={handleAddToDo} />)
    const inputElement = getByPlaceholderText('New TODO item')

    act(() => {
      userEvent.type(inputElement, 'New Todo{enter}')
    })

    expect(handleAddToDo).toHaveBeenCalledTimes(1);

  })

  test('should edit todo title', () => {
    const editTitle = jest.fn()
    const { getByText, getByRole, getByDisplayValue } = render(<TodoTitle id={testData[0].id} title={testData[0].title} completed={testData[0].completed} editTitle={editTitle} />)
    const todoItem = getByText('Luffy')
    expect(todoItem).toBeInTheDocument()
    
    const button = getByRole('edit-button')

    act(() => {
      fireEvent.click(button)
    })

    const inputElement = getByDisplayValue(testData[0].title)

    act(() => {
      userEvent.type(inputElement, 'Edit Todo{enter}')
    })
    
    expect(editTitle).toHaveBeenCalledTimes(1)
  })
});
