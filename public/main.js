const socket = io()

const clientsTotal = document.getElementById('clients-total')


    const messageContainer = document.getElementById('message-container')
    const nameInput = document.getElementById('name-input')
    const messageForm = document.getElementById('message-form')
    const messageInput = document.getElementById('message-input')
    
    messageForm.addEventListener('submit', (e) =>{
        e.preventDefault()
        sendMessage()
    })
    
    
function sendMessage() {
    if(messageInput.value === '')return
    console.log(messageInput.value);

    const data ={
        name: nameInput.value,
        message : messageInput.value,
        dateTime: new Date()
    }

    socket.emit('message',data)
    addMEssage(true,data)
    messageInput.value  = '';
}
socket.on('chat-message',(data) =>{
    // console.log(data);
    addMEssage(false,data)
})

function addMEssage(isOwnMessage,data) {
    clear()

    


    if(isOwnMessage){
        var element =  `
        <li class="message-right">
            <p class="message">
                ${data.message}
            </p>
        </li>`
    }
    else{
        element =  `  
         <li class="message-left">
        <p class="message">
            ${data.message}
            <span>${data.name} 👻</span>
        </p>
    </li>`
    }

    // const element =`
   
    // <li class="${isOwnMessage ? "message-right":"message-left"}">
    //     <p class="message">
    //         ${data.message}
    //         <span>${data.name} 👻</span>
    //     </p>
    // </li>`

messageContainer.innerHTML += element

scrollToBottom()
}

function scrollToBottom() {
    messageContainer.scrollTo(0,messageContainer.scrollHeight)
}

messageInput.addEventListener('focus' ,(e) =>{

    socket.emit('feedback',{
        feedback:`${nameInput.value} is typing here`
    })
})
 
messageInput.addEventListener('keypress' ,(e) =>{
    socket.emit('feedback',{
        feedback:`${nameInput.value} is typing here`
    })
})
messageInput.addEventListener('blur' ,(e) =>{
    socket.emit('feedback',{
        feedback:''
    })
})

// socket.on('feedback',(data) =>{
//     clear()

//     const element = `
//     <li class="message-feedback">
//         <p class="feedback" id="feedback">
//         ${data.feedback} 🤠
//         </p>
//     </li>`

//     messageContainer.innerHTML += element


// })



socket.on('clients-total',(data) =>{
    // console.log(data);

    clientsTotal.innerText = `Online : ${data}👻`

})

function clear() {
    document.querySelectorAll('li.message-feedback').forEach(element =>{
        element.parentNode.removeChild(element)
    })
}