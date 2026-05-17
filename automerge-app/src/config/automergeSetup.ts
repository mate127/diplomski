import * as Automerge from '@automerge/automerge'
import type { Todo } from '../models/todo'

export type TodoDoc = {
  todos: Todo[]
}

export let doc = Automerge.from<TodoDoc>({
  todos: []
})

export const addTodo = (text: string) => {
  doc = Automerge.change(doc, (d) => {
    d.todos.push({
      id: crypto.randomUUID(),
      text
    })
  })
}

export const removeTodo = (id: string) => {
  doc = Automerge.change(doc, (d) => {
    const index = d.todos.findIndex(t => t.id === id)

    if (index !== -1) {
      d.todos.splice(index, 1)
    }
  })
}