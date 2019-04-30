const express = require('express');
const uuidv4 = require('uuid/v4');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static('build'));

io.on('connection', function(socket){
    socket.on('send_message', function(data){
     io.emit('receive_message', data);
 })


  socket.on("join_room", room => {
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

http.listen(8080, function(){
  console.log('listening on *:8080');
});
