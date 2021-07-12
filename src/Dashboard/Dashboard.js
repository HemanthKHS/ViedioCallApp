import React, { useEffect,useState } from 'react';
import logo from '../resources/logo.png';
import ActiveUsersList from './components/ActiveUsersList/ActiveUsersList';
import * as webRTCHandler from '../utils/webRTC/webRTCHandler';
import * as webRTCGroupHandler from '../utils/webRTC/webRTCGroupCallHandler';
import DirectCall from './components/DirectCall/DirectCall';
import { connect } from 'react-redux';
import DashboardInformation from './components/DashboardInformation/DashboardInformation';
import { callStates } from '../store/actions/callActions';
import GroupCallRoomsList from './components/GroupCallRoomsList/GroupCallRoomsList';
import GroupCall from './components/GroupCall/GroupCall';
import {Chat} from "./components/ChatBox/chat";
// import Chat from "./components/ChatBox/Components/ChatBox.js/chatBox";
import Chat2 from "./components/ChatBox/Components/ChatBox.js/chatBox2";
import Chat3 from "./components/ChatBox/Components/ChatBox.js/chatBox3";
import './Dashboard.css';
import { AiOutlineClose } from 'react-icons/ai';
import axios from 'axios';
import { setTurnServers } from '../utils/webRTC/TURN';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
const Dashboard = ({ username, callState }) => {
  useEffect(() => {
    axios.get('https://video-talker-backend.herokuapp.com/api/get-turn-credentials').then(
      responseData => {
        console.log(responseData);
        setTurnServers(responseData.data.token.iceServers);
    webRTCHandler.getLocalStream();
    webRTCGroupHandler.connectWithMyPeer();
      }
    ).catch(err => {
      console.log(err);
    })
  }, []);

  const [width, setwidth] = useState('55vw')
  sessionStorage.setItem('user', username);

  const handleDecrease =() =>{
    setwidth('10vw')
    
  }
  const handleOpen =() =>{
    setwidth('55vw')
    
  }
  
 
  return (
    <div style={{ display:'grid',gridTemplateColumns:'auto auto'}} className='dashboard_container background_main_color'>
      {/* <div className='dashboard_right_section background_secondary_color'>
        <div  className='dashboard_active_users_list'>
          <ActiveUsersList />
        </div>
        <div className='dashboard_logo_container'>
          <img className='dashboard_logo_image' src={logo} />
        </div>
      </div> */}
      <div style={{minWidth:'60vw'}}className='dashboard_left_section'>
        {/* <div></div> */}
      <ExitToAppIcon style={{backgroundColor:'red'}}/>
        <div className='dashboard_content_container'>
        
          <DirectCall style={{backgroundColor:'yellow',marginBottom:200}} />
          <GroupCall />
          {callState !== callStates.CALL_IN_PROGRESS && <DashboardInformation username={username} />}
          
        </div>
        <div className='dashboard_rooms_container background_secondary_color'>
          <GroupCallRoomsList />
          <div style={{marginLeft:'20%', zIndex:1000 , display:'grid' , gridTemplateColumns:'1fr 1fr 1fr'}}>
            {/* <div style={{backgroundColor:'white'}}>
            <Chat style={{backgroundColor:'white'}} username={username} to={'poco'}></Chat>
   </div>
            <div  style={{backgroundColor:'white',marginLeft:'10%'}}>
            <Chat2 style={{background:'white'}}/>
            </div>
            <div  style={{backgroundColor:'white',marginLeft:'10%'}}>
            <Chat3 style={{background:'white'}}/>
            </div> */}
            </div>
        </div>
      </div>
      <div 
      style={{width:'auto' ,overflow:'hidden'}} 
       id='change-width' className='dashboard_right_section background_secondary_color'>
        {/* <div style={{display:'grid' ,gridTemplateColumns:'1.34fr 2.3fr'}}>
          <div style={{backgroundColor:'#282C34'}}></div>
          <div style={{backgroundColor:'black'}}> 
        <button style={{marginLeft:'100px'}} onClick={handleDecrease}>click</button>
        <button onClick={handleOpen}>Open</button>
        <AiOutlineClose style={{width:25,height:25,alignSelf:'center',marginLeft:50}}/>
        </div>
        </div> */}
        <div  className='dashboard_active_users_list'>
          <ActiveUsersList />
        </div>
        {/* <div className='dashboard_logo_container'>
          <img className='dashboard_logo_image' src={logo} />
        </div> */}
      </div>
    </div>
  );
};



const mapStateToProps = ({ call, dashboard }) => ({
  ...call,
  ...dashboard
});

export default connect(mapStateToProps)(Dashboard);
