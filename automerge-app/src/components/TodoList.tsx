import { useState } from 'react'
import { doc, addTodo, removeTodo } from '../config/automergeSetup'

export const TodoList = () => {
  const [input, setInput] = useState('')
  const [todos, setTodos] = useState(doc.todos)

  const handleAdd = () => {
    addTodo(input)
    setTodos([...doc.todos])
    setInput('')
  }

  return (
    <div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button onClick={handleAdd}>
        Add
      </button>

      {todos.map(todo => (
        <div key={todo.id}>
          {todo.text}

          <button onClick={() => {
            removeTodo(todo.id)
            setTodos([...doc.todos])
          }}>
            Delete
          </button>
        </div>
      ))}
    </div>
  )
}