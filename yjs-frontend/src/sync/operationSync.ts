import * as Y from 'yjs'
import { ydoc } from '../config/yjs-setup'

// generira update (operaciju)
export const createUpdate = (): Uint8Array => {
  return Y.encodeStateAsUpdate(ydoc)
}

// primjena update-a
export const applyUpdate = (update: Uint8Array) => {
  Y.applyUpdate(ydoc, update)
}