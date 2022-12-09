const http = require('http')
const server = http.createServer()
let s = server.listen(80)
const io  = require("socket.io")(s,{
    pingTimeout:60000,
    cors:{
        origin:'http://localhost:5500'
    }
});




let users = {};

io.on('connection',(socket)=>{
    console.log("yo")
    // console.log(socket)

    socket.on('new-user-joined',name=>{
        users[socket.id] = name;
        console.log(name);
        socket.broadcast.emit('user-joined',name);
    })
    
    socket.on('message', data=>{
        console.log(data);
        socket.broadcast.emit('receive',data);

    })
    socket.on('disconnect',()=>{
        socket.broadcast.emit('left',users[socket.id]);
        delete users[socket.id];

    })
})
// io.listen(80);