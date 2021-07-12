import React,{useState} from 'react'
import App from "./App";
import './chat.css';


function Chat (props) {

    const [open, setopen] = useState([])

    return(
        <div id="chat-box">
            {/* {
            open && open.map(doc => (
                <div></div>
            ))
} */}
        </div>
    )
}

function openChat (to) {
    document.getElementById('chat-box').appendChild= <App username={'khs'}/>
    //document.getElementById('chat-box').innerHTML+= to ;
}






export { Chat ,openChat}