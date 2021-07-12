import React from 'react';
import App from "./App";
const ChatBox = (props) => {
    
    const handleChatOpen = () =>{
        document.getElementById('chat-box').style.width="200px";
    }
    const handleChatClose = () =>{
        document.getElementById('chat-box').style.width="20px";
    }
    return(
        <div id="chat-box">
            Chat
            <button onClick={handleChatOpen}>Open</button>
            <button onClick={handleChatClose}>Close</button>
            <App/>
        </div>
    )
}

const ChatBoxOpen = (props) => {

    
}

export default ChatBox
