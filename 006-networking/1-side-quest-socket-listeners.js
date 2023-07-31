// https://stackoverflow.com/questions/20890701/nodejs-sockets-initialized-as-unpaused
var net = require('net')
var server = net.createServer(onConnection)

function onConnection (socket) {
  console.log('onConnection')

  setTimeout(startReading, 1000)

  function startReading () {
    socket.on('data', read)
    socket.on('end', stopReading)
  }

  function stopReading () {
    socket.removeListener('data', read)
    socket.removeListener('end', stopReading)
  }
}

function read (data) {
  console.log('Received: ' + data.toString('utf8'))
}

server.listen(1234, onListening)

function onListening () {
  console.log('onListening')
  net.connect(1234, onConnect)
}

function onConnect () {
  console.log('onConnect')
  this.write('1')
  this.write('2')
  this.write('3')
  this.write('4')
  this.write('5')
  this.write('6')
}
