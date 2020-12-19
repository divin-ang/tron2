var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
const { Console } = require('console');
const { Socket } = require('dgram');
const { on } = require('process');




/*
io.sockets.on('connection', (socket) => {
     
  socket.on('join', function (data) {
    if(rooms[rooms.length-1].nombre>1){
      r =new Room()
      rooms.push(r)
      console.log("2")
      socket.in(rooms[rooms.length-1].players[0]).emit('new_msg', {msg: 'HI'});
      socket.in(rooms[rooms.length-1].players[1]).emit('new_msg', {msg: 'HI'});
    }
    rooms[rooms.length-1].nombre= rooms[rooms.length-1].nombre+1
    rooms[rooms.length-1].players.push(data.pseudo+socket.id)
    socket.join(data.pseudo+socket.id); // We are using room of socket io
  });
      
  })
  */
      //Mouvement update

// Functions
//generate id
function generateRandom () {
  return rooms.length
 
}


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });

  io.on('connection', function(socket){
     console.log('a user connected');
     //console.log(socket);
     socket.on('disconnect', function () {
       console.log('socket disconnected');
     });


    socket.send('Hello');

    // or with emit() and custom event names
    socket.emit('greetings', 'Hey!', { 'ms': 'jane' }, Buffer.from([4, 3, 3, 1]));

    // handle the event sent with socket.send()
    socket.on('message', (data) => {
      
    });

    // handle the event sent with socket.emit()
    socket.on('salutations', (elem1, elem2, elem3) => {
      console.log(elem1, elem2, elem3);
    });

/*
    socket.on('player', function(player){
      //console.log(player);
      
      socket.broadcast.emit('opponent', player);
    });
    */
});
class Room{
  constructor(){
    this.socketId=[]
    this.players=[]
    this.nbrejoin =0
    this.name=""
  }
}
var roomno = 1;
let roomPlayer=[]
let rp = new Room()
rp.name=roomno+""
roomPlayer.push(rp)



io.sockets.on('connection', function(socket) {
 
  let lastRoom = roomPlayer[roomPlayer.length-1]
  if (lastRoom.socketId.length>1){
    roomno++;
  }

  if(roomPlayer[roomPlayer.length-1].socketId.length==2){
    socket.to(roomPlayer[roomPlayer.length-1].socketId[0]).emit("jouer")
    socket.to(roomPlayer[roomPlayer.length-1].socketId[1]).emit("jouer")
     rp =new Room();
     roomPlayer.push(rp)
    
   }
   rp.socketId.push(socket.id)
   socket.join(""+roomno);
   
   socket.on("pret",()=>{
    
    roomPlayer[roomPlayer.length-1].nbrejoin++;
    if(roomPlayer[roomPlayer.length-1].nbrejoin <2){
      io.sockets.to(roomPlayer[roomPlayer.length-1]).emit("patienter")
      
    }
   
else{
  io.sockets.to(roomPlayer[roomPlayer.length-1].socketId[1]).emit("lancer")
  io.sockets.to(roomPlayer[roomPlayer.length-1].socketId[0]).emit("lancer")
 
}
})
if (roomPlayer[roomPlayer.length-1].socketId.length===2){
    io.sockets.to(roomPlayer[roomPlayer.length-1].socketId[1]).emit('currentPlayer',{current:1,opponent:0});
    io.sockets.to(roomPlayer[roomPlayer.length-1].socketId[0]).emit('currentPlayer',{current:0,opponent:1});
}
socket.on("playerAndPosition",(data)=>{
     
  roomPlayer[roomPlayer.length-1].players[0]=data.player

  roomPlayer[roomPlayer.length-1].players[1]=data.player


})
socket.on("demarrer",function(){
  
socket.to(roomPlayer[roomPlayer.length-1].socketId[0]).emit("jouer")
socket.to(roomPlayer[roomPlayer.length-1].socketId[1]).emit("jouer")
 
})


socket.on("player",()=>{
   
 io.sockets.to(roomPlayer[roomPlayer.length-1].socketId[0]).emit('opponent',roomPlayer[roomPlayer.length-1].players[1]);
 io.sockets.to(roomPlayer[roomPlayer.length-1].socketId[1]).emit('opponent',roomPlayer[roomPlayer.length-1].players[0]);


})
})

//Now server would listen on port 8080 for new connection

http.listen(8080, function(){
     console.log('listening on *:8080');
});