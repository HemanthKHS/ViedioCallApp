import React,{useState} from 'react';
import ActiveUsersListItem from './ActiveUsersListItem';
import { connect } from 'react-redux';
import { Chat } from "../ChatBox/chat";
import ChatBox from "../ChatBox/Components/ChatBox.js/chatBox";
import { AiOutlineClose } from 'react-icons/ai';
import logo from  '../../../resources/logo.svg'
import { IoMdList } from 'react-icons/io';



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
      <div style={{width:'15vw',borderRight:'0.1px solid gray',backgroundColor:'#363E45'}}>
        <div style={{height:'10vh',backgroundColor:'gray' , display:'grid',gridTemplateColumns:'3fr 1fr '}}>
          <div style={{}}>
          <img id='image-chat' style={{marginTop:15,marginLeft:15}} src={logo} width='50px' alt="" />
          <span style={{color:'#66FCF1',fontSize:25,marginLeft:5}}>Connect</span>
          </div>
          <div style={{marginTop:15,marginLeft:0}}>
{/* <IoMdList/>
<AiOutlineClose/> */}
          </div>
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
        <div style={{backgroundColor:'white',height:'100vh'}}> <ChatBox username={username} activeUser={active} callState={call}  to={to}/></div>
    </div>
  );
};

const mapStateToProps = ({ dashboard, call }) => ({
  ...dashboard,
  ...call
});

export default connect(mapStateToProps)(ActiveUsersList);
