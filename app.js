const http = require('http')
const express = require('express');
const app = express();
const port = 8000;

app.set('view engine', 'pug'); // set pug engine
app.set('views', 'views');


// static files
app.use('/static', express.static('static')); 


// Socket events


let s = app.listen(port,()=>console.log(`server started at port ${port}`));


// const io  = require("socket.io")(s);

// For cross site requests
const io  = require("socket.io")(s,{
    cors:{
        pingTimeout:60000,
        // origin:'http://localhost:5500'
    
        origin:'/'
    }
});




let users = {};

io.on('connection',(socket)=>{


    socket.on('new-user-joined',name=>{
        users[socket.id] = name;
        
        socket.broadcast.emit('user-joined',name);
    })
    
    socket.on('message', data=>{
      
        socket.broadcast.emit('receive',data);

    })
    socket.on('disconnect',()=>{
        socket.broadcast.emit('left',users[socket.id]);
        delete users[socket.id];

    })
})


// End Points

app.get('/',(req,res)=>res.render('index.pug'));