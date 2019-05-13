require('dotenv').config();

const express = require('express');
const uuidv4 = require('uuid/v4');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static('build'));
app.use(express.static('public'));
io.on('connection', function(socket){

    // SENDING A MESSAGE
    socket.on('send_message', function(data){
        io.in(data.room).emit('receive_message', data);
 })

    // JOINING A ROOM
  socket.on("join_room", paramId => { // paramId is taken from the URL
    console.log("Joining Room: " + paramId);
    io.in(paramId).clients((error, clients) => {  //this was taken from the doc
      if (error) throw error;
      console.log(clients);  // shows sockets in the room before attempting to join it
      if (clients.length < 2) {  // max 2 sockets in the room
          socket.join(paramId, function() {
              console.log("socket.id = " + socket.id); //id of the socket
              console.log(socket.rooms); // list of rooms that the socket is in
    })
      }

    });

  });
});

http.listen(process.env.PORT || 8080 , function(){
  console.log('listening on * ' + (process.env.PORT || 8080));
});
