require('dotenv').config();

const express = require('express');
const uuidv4 = require('uuid/v4');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static('build'));

// let registeredRooms = ["room1", "room2"];
/////////////////////////
io.on('connection', function(socket){
    socket.on('SEND_MESSAGE', function(data){
     io.emit('RECEIVE_MESSAGE', data);
 })
    // socket.join('room1', function(room) {
    //     console.log("Joining Room...: " + room);
    //
    // });

  socket.on("JOIN_ROOM", room => {
    console.log("Joining Room: " + room);
    socket.join(room, function() {
      console.log(socket.id);
      console.log(socket.rooms);
    })
  });
  //////////////////
  // socket.on("joinRoom", room => {
  //   console.log("Joining Room...: " + room);
  //   if (registeredRooms.includes(room)) {
  //     //Socket has joined the request room
  //     console.log('an user connected to the room :' + room);
  //     return socket.emit("success", "Invalid Room Name: " + room);
  //   } else {
  //    //No room with the specified Name! (or it could be another reason).
  //    return socket.emit("err", "Invalid Room Name: " + room);
  //   }
  // })
  ///////////////////////
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
  });
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

http.listen(process.env.PORT || 8080 , function(){
  console.log('listening on * ' + process.env.PORT || 8080);
});
