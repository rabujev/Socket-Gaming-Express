const express = require('express');
const uuidv4 = require('uuid/v4');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static('build'));

let registeredRooms = ["room1", "room2"];
/////////////////////////
io.on('connection', function(socket){
    socket.join('room1', function(room) {
        console.log("Joining Room...: " + room);

    });
  console.log('an user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  //////////////////
  socket.on("joinRoom", room => {
    console.log("Joining Room...: " + room);
    if (registeredRooms.includes(room)) {
      //Socket has joined the request room
      console.log('an user connected to the room :' + room);
      return socket.emit("success", "Invalid Room Name: " + room);
    } else {
     //No room with the specified Name! (or it could be another reason).
     return socket.emit("err", "Invalid Room Name: " + room);
    }
  })
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

http.listen(3001, function(){
  console.log('listening on *:3001');
});
