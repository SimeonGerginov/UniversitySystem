const configSocket = (app, port) => {
  const server = require('http').createServer(app);
  const io = require('socket.io')(server);

  server.listen(port);

  io.on('connection', function(socket) {
    console.log('User connected.');

    socket.on('disconnect', function() {
      console.log('User disconnected.');
    });

    socket.on('save-message', function(data) {
      console.log(data);
      io.emit('new-message', { message: data });
    });
  });
}

module.exports = configSocket;
