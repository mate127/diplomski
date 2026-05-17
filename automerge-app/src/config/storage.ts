import * as Automerge from '@automerge/automerge'
import { openDB } from 'idb'

const DB_NAME = 'automerge-db'
const STORE = 'documents'

export const saveDocument = async (doc: any) => {
  const db = await openDB(DB_NAME, 1, {
    upgrade(db) {
      db.createObjectStore(STORE)
    }
  })

  const binary = Automerge.save(doc)

  await db.put(STORE, binary, 'main-doc')
}

export const loadDocument = async () => {
  const db = await openDB(DB_NAME, 1)

  const binary = await db.get(STORE, 'main-doc')

  if (!binary) return null

  return Automerge.load(binary)
}