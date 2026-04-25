import * as Y from 'yjs'
import { ydoc } from '../config/yjs-setup'

// cijelo stanje dokumenta
export const getFullState = (): Uint8Array => {
  return Y.encodeStateAsUpdate(ydoc)
}

// primjena cijelog stanja
export const applyFullState = (state: Uint8Array) => {
  Y.applyUpdate(ydoc, state)
}