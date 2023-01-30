// import express from 'express'

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
  console.log('listening on *:' + port)
})

io.on('connection', (socket) => {
  if (!clients.find((c) => c.id === socket.id)) {
    clients.push(socket)
    console.log('Client connected.', `Total clients: ${clients.length}`)
    socket.emit('hello', 'new client connected')
  }
  socket.on('disconnect', () => {
    clients = clients.filter((c) => c !== socket)
    console.log(`Client disconnected. Total clients: ${clients.length}`)
  })
  socket.on('howdy', (args) => {
    console.log(args)
  })

  socket.on('command', (args) => {
    console.log(args)
    socket.broadcast.emit('clientCommand', args)
  })
})
