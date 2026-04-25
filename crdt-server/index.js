const http = require('http')
const WebSocket = require('ws')
const setupWSConnection = require('y-websocket/bin/utils').setupWSConnection

const server = http.createServer()
const wss = new WebSocket.Server({ server })

wss.on('connection', (conn, req) => {
  setupWSConnection(conn, req)
})

const PORT = 1234

server.listen(PORT, () => {
  console.log(`✅ WebSocket server running on ws://localhost:${PORT}`)
})