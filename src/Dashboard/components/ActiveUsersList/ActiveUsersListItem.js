import React,{useEffect,useState} from 'react';
import userAvatar from '../../../resources/userAvatar.png';
import { callToOtherUser } from '../../../utils/webRTC/webRTCHandler';
import { callStates } from '../../../store/actions/callActions';
import { FcVideoCall } from 'react-icons/fc';
import { BiMessageRoundedDetail } from 'react-icons/bi';
import { openChat } from "../ChatBox/chat";
import UseFirestore from "../ChatBox/Firebase/UseFirestore";

const ActiveUsersListItem = (props) => {
  const { activeUser, callState } = props;
  const [count, setcount] = useState(0)
  console.log(activeUser.username)
  const handleListItemPressed = () => {
    if (callState === callStates.CALL_AVAILABLE) {
      callToOtherUser(activeUser);
    }
  };
  const username = sessionStorage.getItem('user')
  const { docs  } = UseFirestore(username);
  var newcount = 0

  // updates every time new msgs comes

  useEffect(() => {
    var newcount = 0
    for (var i = 0; i < docs.length; i++) {
      if(docs[i].userName===activeUser.username){
        console.log(docs[i].userName,docs[i].msg)
          newcount++
      }
  }

  if(count < newcount && username !==activeUser.username ){
    // alert('new msg from',activeUser.username,'kkkk')
    // setcount(newcount)
  }
    
  if(count === 0){
    setcount(newcount)
  }
  }, [docs])
  

  return (
    <div style={{width:'100%'}} className='active_user_list_item' >
      <div className='active_user_list_image_container'>
        <img style={{width:40}} className='active_user_list_image' src={userAvatar} />
      </div>
      <span className='active_user_list_text'>{activeUser.username}</span>

      <FcVideoCall id='hover-chat' onClick={handleListItemPressed} style={{height:30,width:30,marginLeft:10}}/>
      {/* <BiMessageRoundedDetail onClick={()=>{openChat(activeUser.username)}} style={{height:30,width:30,marginLeft:10}}/> */}
      {/* <span style={{marginLeft  : 10,backgroundColor:'red',width:20,borderRadius:'40px',display: 'flex',alignItems: 'center'}}>{newcount-count}</span> */}
    </div>
  );
};

export default ActiveUsersListItem;
