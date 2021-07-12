import React from 'react'

import './App.css'
import Chatbox from './Components/ChatBox.js/chatBox' ;

function App(props) {
  return (
    <div  className="App">
      <Chatbox username={props.username}/>
    </div>
  );
}

export default App;
