
const socket =io.connect('http://localhost:80');
const input = document.getElementById('input');
const chatbox = document.querySelector('.chatbox');

const send = document.querySelector('.btn');

const append = (data, position = 'left',noti = false,)=>{

    let div = document.createElement('div');
    div.innerText = data;
    

    if (noti){
        div.setAttribute('class','notification');
    }
    else if(position=='left')
    div.setAttribute('class','message');
    else div.setAttribute('class','message right');

    chatbox.appendChild(div);
    chatbox.scrollTop = chatbox.scrollHeight;

}
const  name1 = 'harry';
//  prompt('enter name');
console.log(name1);

socket.emit('new-user-joined',name1);
socket.on('user-joined',name=>{
    append(`${name} joined the chat`,"right",true);
})

socket.on('receive',data=>{
    
    append(`${data.name}: ${data.msg}`)
})
send.addEventListener('click',(e)=>{
    e.preventDefault();
    socket.emit('message',{name:name1,msg:input.value});
    append(`${input.value}`,'right');
    input.value = '';

})
socket.on('left',(name)=>{
    append(`${name} left the chat`, 'center',true);
    document.getElementsByClassName('notification')[0].style.color = '#c81717';
})