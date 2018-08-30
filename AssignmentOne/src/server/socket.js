module.exports = function(app, io) {
  console.log("server socket initiated");

  io.on('connection', (socket) => {
    console.log('user connection');

    socket.on('disconnection', function() {
      console.log('user disconnection');
    });

    //Function needs to be specified as add-message to send
    socket.on('add-message', (message) => {
      //Broadcast the message to all other users subscribed to this socket
      io.emit('message', {type:'new-message', text: message});
    });
  });
};
