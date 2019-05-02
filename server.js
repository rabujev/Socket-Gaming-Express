require('dotenv').config();

const express = require('express');
const uuidv4 = require('uuid/v4');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static('build'));

io.on('connection', function(socket){


    // JOINING A ROOM
  socket.on("join_room", paramId => { // paramId is taken from the URL
    console.log("Joining Room: " + paramId);
    io.in(paramId).clients((error, clients) => {  //this was taken from the socket.io doc, lists all sockets in a room
      if (error) throw error;
      console.log(clients);  // shows sockets in the room before attempting to join it
      if (clients.length < 2) {  // max 2 sockets in the room
          socket.join(paramId, function() {
              console.log("socket.id = " + socket.id); //id of the socket
              console.log(socket.rooms); // list of rooms that the socket is in

              // SENDING A MESSAGE, (nested in here to only do if the socket is indeed in the room (data.room is the URL))

              socket.on('send_message', function(data){
                  io.in(data.room).emit('receive_message', data);
           })

    })
      }
      else {
          socket.emit("Room is full");
      }

    });

  });
});


// io.on('connection', function(socket){
//   socket.on('chat message', function(msg){
//     io.emit('chat message', msg);
//   });
// }); // Je ne sais pas à quoi ceci sert, si Simon non plus alors à delete.

http.listen(process.env.PORT || 8080 , function(){
  console.log('listening on * ' + process.env.PORT || 8080);
});
