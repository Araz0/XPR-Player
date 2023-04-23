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
let program = undefined

app.get('/', (req, res) => {
  // res.send('<h1>Hello world</h1>')
  res.sendFile(__dirname + '/index.html')
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
    if (program) {
      socket.broadcast.emit('set-program', program)
      socket.emit('set-program', program)
    }
  }
  socket.on('disconnect', () => {
    clients = clients.filter((c) => c !== socket)
    // eslint-disable-next-line no-console
    console.log(`❌ - Client disconnected. Total clients: ${clients.length}`)
  })

  socket.on('set-program', (args) => {
    socket.broadcast.emit('set-program', args)
    socket.emit('set-program', args)
    program = args
    // eslint-disable-next-line no-console
    console.log(`📀 - admin sent program: `, args.title)
  })

  socket.on('start-program', (args) => {
    socket.broadcast.emit('start-program', args)
    socket.emit('start-program', args)
    // eslint-disable-next-line no-console
    console.log(`▶️ - `, args)
  })

  socket.on('stop-program', (args) => {
    socket.broadcast.emit('stop-program', args)
    socket.emit('stop-program', args)
    // eslint-disable-next-line no-console
    console.log(`🛑 - `, args)
  })

  socket.on('pause-program', (args) => {
    socket.broadcast.emit('pause-program', args)
    socket.emit('pause-program', args)
    // eslint-disable-next-line no-console
    console.log(`⏸️ - `, args)
  })

  socket.on('reset-program', (args) => {
    socket.broadcast.emit('reset-program', args)
    socket.emit('reset-program', args)
    // eslint-disable-next-line no-console
    console.log(`🔁 - `, args)
  })

  socket.on('request-fullscreen', (args) => {
    socket.broadcast.emit('request-fullscreen', args)
    socket.emit('request-fullscreen', args)
    // eslint-disable-next-line no-console
    console.log(`📺 - `, args)
  })

  socket.on('show-controls', (args) => {
    socket.broadcast.emit('show-controls', args)
    socket.emit('show-controls', args)
    // eslint-disable-next-line no-console
    console.log(`🎛️ - `, args)
  })

  socket.on('hide-controls', (args) => {
    socket.broadcast.emit('hide-controls', args)
    socket.emit('hide-controls', args)
    // eslint-disable-next-line no-console
    console.log(`🎛️ - `, args)
  })

  socket.on('toggle-show-controls', (args) => {
    socket.broadcast.emit('toggle-show-controls', args)
    socket.emit('toggle-show-controls', args)
    // eslint-disable-next-line no-console
    console.log(`🎛️ - `, args)
  })

  socket.on('user-selected-segment', (args) => {
    socket.broadcast.emit('user-selected-segment', args)
    socket.emit('user-selected-segment', args)
    // eslint-disable-next-line no-console
    console.log(`👍🏽👎🏽 - `, args)
  })

  socket.on('screen-is-ready', (args) => {
    socket.broadcast.emit('screen-is-ready', args)
    socket.emit('screen-is-ready', args)
    // eslint-disable-next-line no-console
    console.log(`👌 - `, args)
  })

  socket.on('identify-screens', (args) => {
    socket.broadcast.emit('identify-screens', args)
    socket.emit('identify-screens', args)
    // eslint-disable-next-line no-console
    console.log(`⁉️ - `, args)
  })
})
