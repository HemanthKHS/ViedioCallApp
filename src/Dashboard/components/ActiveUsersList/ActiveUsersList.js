import React,{useState} from 'react';
import ActiveUsersListItem from './ActiveUsersListItem';
import { connect } from 'react-redux';
import { Chat } from "../ChatBox/chat";
import ChatBox from "../ChatBox/Components/ChatBox.js/chatBox";
import { AiOutlineClose } from 'react-icons/ai';


import './ActiveUsersList.css';

const ActiveUsersList = ({ activeUsers, callState }) => {
  const [to, setto] = useState('')
  const [call, setcall] = useState('')
  const [active, setactive] = useState('')

  const username = sessionStorage.getItem('user')
 
  const handleClick = (activeUser ,callState)=>{
    setto(activeUser.username)
    setcall(callState)
  }
 
  return (
    <div className='active_user_list_container' style={{display:'grid' , gridTemplateColumns:'1fr 2fr'}}>
      <div style={{width:'15vw'}}>
        <div style={{height:'10vh',backgroundColor:'red'}}>

        </div>
      {activeUsers.map((activeUser) =>
      <div onClick={()=>{handleClick(activeUser,callState)}}>
        <ActiveUsersListItem 
          key={activeUser.socketId}
          activeUser={activeUser}
          callState={callState}
          
        />
        {/* <button onClick={()=>{handleClick(activeUser,callState)}}>Click</button> */}
        </div>)}
        </div>
        <div style={{backgroundColor:'whitesmoke',height:'100vh'}}> <ChatBox username={username} activeUser={active} callState={call}  to={to}/></div>
    </div>
  );
};

const mapStateToProps = ({ dashboard, call }) => ({
  ...dashboard,
  ...call
});

export default connect(mapStateToProps)(ActiveUsersList);
