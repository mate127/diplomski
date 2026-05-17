import * as Y from 'yjs'
import { WebsocketProvider } from 'y-websocket'
import { IndexeddbPersistence } from 'y-indexeddb'

// Kreiraj dokument
export const ydoc = new Y.Doc()

// WebSocket konekcija
export const provider = new WebsocketProvider(
  'ws://localhost:1234',
  'crdt-room',
  ydoc
)

// CRDT struktura (lista taskova)
export const yArray = ydoc.getArray<string>('todos')

// Offline persistence (IndexedDB)
export const persistence = new IndexeddbPersistence('crdt-db', ydoc)

persistence.on('synced', () => {
  console.log('📦 Podaci učitani iz IndexedDB')
})

// Debug
provider.on('status', (event: { status: string }) => {
  console.log('WebSocket status:', event.status)
})