// eslint-disable-next-line @typescript-eslint/no-var-requires
const http = require('http')

// eslint-disable-next-line @typescript-eslint/no-var-requires
const express = require('express')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { Server } = require('socket.io')

const app = express()
const port = 8000
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
  },
})
//todo: add type safty
let clients = []

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>')
})

server.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log('listening on *:' + port)
})

io.on('connection', (socket) => {
  if (!clients.find((c) => c.id === socket.id)) {
    clients.push(socket)
    // eslint-disable-next-line no-console
    console.log(`✅ - Client connected. Total clients: ${clients.length}`)
  }
  socket.on('disconnect', () => {
    clients = clients.filter((c) => c !== socket)
    // eslint-disable-next-line no-console
    console.log(`❌ - Client disconnected. Total clients: ${clients.length}`)
  })
  socket.on('admin-Brodcast-start', (args) => {
    socket.broadcast.emit('start-program', args)
    // eslint-disable-next-line no-console
    console.log(`▶️ - `, args)
  })

  socket.on('admin-Brodcast-stop', (args) => {
    socket.broadcast.emit('stop-program', args)
    // eslint-disable-next-line no-console
    console.log(`🛑 - `, args)
  })

  socket.on('admin-Brodcast-fullscreen', (args) => {
    socket.broadcast.emit('request-fullscreen', args)
    // eslint-disable-next-line no-console
    console.log(`📺 - `, args)
  })

  socket.on('admin-Brodcast-program', (args) => {
    socket.broadcast.emit('set-program', args)
    // eslint-disable-next-line no-console
    console.log(`📀 - admin sent program`, args)
  })

  socket.on('admin-Brodcast-show-controls', (args) => {
    socket.broadcast.emit('show-controls', args)
    // eslint-disable-next-line no-console
    console.log(`🎛️ - `, args)
  })

  socket.on('admin-Brodcast-hide-controls', (args) => {
    socket.broadcast.emit('hide-controls', args)
    // eslint-disable-next-line no-console
    console.log(`🎛️ - `, args)
  })

  socket.on('admin-Brodcast-toggle-show-controls', (args) => {
    socket.broadcast.emit('toggle-show-controls', args)
    // eslint-disable-next-line no-console
    console.log(`🎛️ - `, args)
  })

  socket.on('user-sent-selected-segment', (args) => {
    socket.broadcast.emit('user-selected-segment', args)
    // eslint-disable-next-line no-console
    console.log(`👍🏽👎🏽 - `, args)
  })
})
