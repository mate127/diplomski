const WebSocket = require('ws')

const wss = new WebSocket.Server({
  port: 1234
})

wss.on('connection', (ws) => {
  ws.on('message', (message) => {

    wss.clients.forEach(client => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message)
      }
    })

  })
})

console.log('WebSocket server running')