import * as Y from 'yjs'
import { ydoc } from '../config/yjs-setup'

export const measureUpdateSize = () => {
  const update = Y.encodeStateAsUpdate(ydoc)
  console.log('📦 Veličina state-a:', update.length)
}

export const measureOperation = (fn: () => void) => {
  const start = performance.now()
  fn()
  const end = performance.now()

  console.log('⏱ Vrijeme operacije:', end - start)
}