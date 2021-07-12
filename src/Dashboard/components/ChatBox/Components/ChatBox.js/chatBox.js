import React , {useState,useEffect} from "react";
// import './Post.css'
import UseFirestore from "../../Firebase/UseFirestore";
import  {projectStorage , projectFirestore , timestamp}  from '../../Firebase/FirebaseConfig';
import moment from 'moment';
import './style.css'
import { FcVideoCall } from 'react-icons/fc';
import { callToOtherUser } from '../../../../../utils/webRTC/webRTCHandler';
import { callStates } from '../../../../../store/actions/callActions';
import { AiOutlineClose } from 'react-icons/ai';
import { FiSend } from 'react-icons/fi';
import userAvatar from '../../../../../resources/userAvatar.png'
import ScrollableFeed from 'react-scrollable-feed'
import Button from '@material-ui/core/Button';
import {firebase} from '../../Firebase/FirebaseConfig'

function Chatbox( props ){
    // alert(props.username,'5555555')
    // console.log('jjjjjjj',sessionStorage.getItem('user'))
    const { docs  } = UseFirestore(firebase.auth().currentUser.displayName);
    const [msg, setMsg] =  useState('');
    const [username, setUsername] = useState('')
    const [to, setTo] = useState(props.to)
    const { activeUser, callState } = props;

    useEffect(() => {
        var chat =  document.getElementsByClassName('message-box') 
        chat.scrollTop = chat.scrollHeight;
        
    }, [docs])

    let userName = props.username
    let Recciptant = props.to

    function ChnageHandler(e){
       
        let msg_ = msg
        const createdAt = timestamp();
        
        projectFirestore.collection(userName).add({ msg , createdAt ,userName,Recciptant});
        projectFirestore.collection(Recciptant).add({ msg , createdAt ,userName,Recciptant});
        document.getElementById('chat-box-input').value=''
        
    }

    const handleListItemPressed = () => {
        if (callState === callStates.CALL_AVAILABLE) {
          callToOtherUser(activeUser);
        }
      };

    const HandleClose = () =>{
        // alert('hello')
        document.getElementsByClassName("message-box").width = '40px';
        document.getElementsByClassName("message-box").height = '40px';
        document.getElementById('change-width').width='50vw';
    }

    const HnadleOpen = () =>{
        document.getElementsByClassName("message-box").width = '340px';
    }

    
    // console.log(moment().calendar(docs[3].createdAt) , moment(docs[3].createdAt.toDate ( )).fromNow(),docs[3].createdAt.seconds )

    return (
        <div>
        <div className='message-box'>
            <div style={{backgroundColor:'black',height:70,width:'100%' ,alignItems:'center',position:'fixed',zIndex:'100000'}} >
            <div  style={{backgroundColor:'black',display:"flex",alignSelf:'center'}}>
            <div className='active_user_list_image_container'>
        <img style={{width:40 ,marginTop:10,marginLeft:20}} className='active_user_list_image' src={userAvatar} />
      </div>
      <span style={{marginLeft:0,marginTop:10 ,fontSize:25,alignSelf:'flex-start' }} >{props.to}</span>

            </div>
            {/* <div >
            <FcVideoCall onClick={handleListItemPressed} style={{height:30,width:30 }}/>
            </div> */}
            {/* <div >
            <AiOutlineClose onClick={HandleClose} style={{width:25,height:25,marginRight:0}}/>
            </div> */}
            </div>
            <div style={{display:'grid',marginTop:90}}>
            
            {
                docs && docs.map(doc => (
                //     <div>
                //     <span style={{color:'black'}}>{doc.userName}:</span>   
                //    <span style={{color:'black'}}>{doc.msg}</span>
                //     {/* <span style={{color:'gray',fontSize:'10px'}}>{moment(doc.createdAt.toDate ( )).fromNow()}</span> */}
                //    </div>
                <div>
                        {/* <div>{doc.userName}, {doc.Recciptant} </div> */}
                        {
                (doc.userName === props.to || doc.Recciptant === props.to) ?

              <div>
                  {
                  (doc.userName === props.username ) ?
                  <div style={{float:'right',marginRight:10,wordWrap: 'break-word'}}>
                      
                      <div class="box3 sb13 right-msg" ><span><span style={{color:'black' , fontWeight:'bold'}}>{doc.userName} :</span> {doc.msg}</span></div>
                      {/* <span style={{color:'gray',fontSize:'10px'}}>{moment(doc.createdAt.toDate ( )).fromNow()}</span> */}
                  {/* <span style={{color:'black' , fontWeight:'bold'}}>{doc.userName} :</span>   
              <span style={{color:'black'}}>{doc.msg}</span> */}
              </div>
              :

              <div style={{marginLeft:10,wordWrap: 'break-word'}} >
                <div class="box2 sb14 left-msg" ><span style={{display:'flex',width:'auto'}}><span style={{color:'black' , fontWeight:'bold'}}>{doc.userName} :</span> {doc.msg}</span></div>

                   {/* <span style={{color:'black' , fontWeight:'bold'}}>{doc.userName} :</span>   
            
            <span style={{color:'black'}}>{doc.msg}</span> */}
              </div>
                  }
              </div>

              :

              <div></div>
            }
                    
                    {/* <span style={{color:'gray',fontSize:'10px'}}>{moment(doc.createdAt.toDate ( )).fromNow()}</span> */}
                   </div>
                ))
            }
            
            </div>

        </div>
        <div style={{width:'100%',backgroundColor:"#cbced4",height:72,display:"flex",alignItems:"center"}}>
        <input id='chat-box-input' style={{width:'80%',height:45,borderRadius:10}} onChange={ (e)=> {setMsg(e.target.value)}}  type="text"></input>
        
                <button style={{width:50,height:52,borderRadius:10}} onClick={ChnageHandler}><FiSend style={{width:25,height:25,color:'black'}} /></button>
                </div>
                
        </div>
    )
}
export default Chatbox;