require('dotenv').config();

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
});


io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

http.listen(process.env.PORT || 8080 , function(){
  console.log('listening on * ' + process.env.PORT || 8080);
});
