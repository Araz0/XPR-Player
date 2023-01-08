// eslint-disable-next-line @typescript-eslint/no-var-requires
const express = require('express')
const app = express()
const port = 8000

app.get('/', (req, res) => {
  console.log('Client connected')

  res.setHeader('Content-Type', 'text/event-stream')
  res.setHeader('Access-Control-Allow-Origin', '*')

  const intervalId = setInterval(() => {
    // const date = Date().toLocaleString()
    const currentDate = new Date()
    const data = {
      time: currentDate.getTime(),
      day: currentDate.getDate(),
      month: currentDate.getMonth() + 1,
      year: currentDate.getFullYear(),
    }

    console.log('sending: ', data)

    res.write(`data: ${JSON.stringify(data)}\n\n`)
    // res.write(JSON.stringify(data))
  }, 1000)

  res.on('close', () => {
    console.log('Client closed connection')

    clearInterval(intervalId)
    res.end()
  })
})
//listener
app.post('/api', function (req, res) {
  var body = ''
  req.on('data', function (data) {
    body += data
  })
  req.on('end', function () {
    console.log('/api')
    console.log(JSON.parse(body))
  })

  res.writeHead(200)
  res.end()
})
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})

//curl --header "Content-Type: application/json" --request POST --data '{"username":"xyz","password":"xyz"}' http://localhost:8000/api
