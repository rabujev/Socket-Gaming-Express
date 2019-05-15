require('dotenv').config();

const express = require('express');
const uuidv4 = require('uuid/v4');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static('build'));

io.on('connection', function(socket){

    // SENDING A MESSAGE
    socket.on('send_message', function(data){
        io.in(data.room).emit('receive_message', data);
 })
    players = []
    // JOINING A ROOM
  socket.on("join_room", paramId => { // paramId is taken from the URL
    console.log("Attempting to join Room: " + paramId);
    io.in(paramId).clients((error, clients) => {  //this was taken from the doc
      if (error) throw error;
      console.log(clients);  // shows sockets in the room before attempting to join it
      if (clients.length < 2) {  // max 2 sockets in the room
          socket.join(paramId, function() {
              console.log("Room succesfully joined!"); //id of the socket
              console.log("this socket's id = " + socket.id); //id of the socket
              if (clients.length < 1) {
                  let player = 1;
                  socket.emit('playerOrder', player);
              } else {
                  let player = 2;
                  socket.emit('playerOrder', player);
              };
              console.log('player 1 = ' + players[0]);
              console.log('player 2 = ' + players[1]);
              console.log(socket.rooms); // list of rooms that the socket is in
          })
      } else {
          socket.emit('Room is full');
      }

    });

  });
  socket.on("reload", paramId => {
      io.in(paramId).clients((error, clients) => {  //this was taken from the doc
        if (error) throw error;
        socket.emit('Room is full');
      });
  });


});

http.listen(process.env.PORT || 8080 , function(){
  console.log('listening on * ' + (process.env.PORT || 8080));
});
