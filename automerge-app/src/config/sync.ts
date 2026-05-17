import * as Automerge from '@automerge/automerge'
import { doc } from './automergeSetup'

const socket = new WebSocket('ws://localhost:1234')

socket.onopen = () => {
  console.log('Connected')
}

export const sendChanges = () => {
  const binary = Automerge.save(doc)

  socket.send(String.fromCharCode(...new Uint8Array(binary)))
}

socket.onmessage = async (event) => {
  const arrayBuffer = await event.data.arrayBuffer()

  const remoteDoc = Automerge.load(arrayBuffer)

  const newDoc = Automerge.merge(doc, remoteDoc)
}