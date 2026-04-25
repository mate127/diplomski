import { useEffect, useState } from 'react'
import { yArray } from '../config/yjs-setup'
import * as Y from 'yjs'
import { getFullState } from '../sync/stateSync'

export const TodoList = () => {
  const [todos, setTodos] = useState<string[]>([])
  const [input, setInput] = useState('')

  useEffect(() => {
    // inicijalno stanje
    setTodos(yArray.toArray())

    // promjene iz CRDT-a
    const observer = () => {
      setTodos(yArray.toArray())
    }

    yArray.observe(observer)

    return () => {
      yArray.unobserve(observer)
    }
  }, [])

  const addTodo = () => {
    if (!input.trim()) return
    yArray.push([input])
    setInput('')
  }

  const deleteTodo = (index: number) => {
    yArray.delete(index, 1)
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>CRDT Todo List</h2>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Dodaj zadatak"
      />
      <button onClick={addTodo}>Dodaj</button>

      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            {todo}
            <button onClick={() => deleteTodo(index)}>❌</button>
          </li>
        ))}
      </ul>
      <button onClick={() => {
        const state = getFullState()
        console.log('STATE SIZE:', state.length)
      }}>
        Test State Sync
      </button>
    </div>
  )
}