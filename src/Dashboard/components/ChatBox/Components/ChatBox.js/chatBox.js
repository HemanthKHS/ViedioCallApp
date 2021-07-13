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
import { Redirect } from "react-router-dom";

function Chatbox( props ){
   
    var { docs  } = UseFirestore(localStorage.getItem('userName'));

    const [msg, setMsg] =  useState('');
    const [username, setUsername] = useState('')
    const [to, setTo] = useState(props.to)
    const { activeUser, callState } = props;

    useEffect(() => {
        var chat =  document.getElementsByClassName('message-box') 
        chat.scrollTop = chat.scrollHeight;
        
    }, [docs])

    if(props.username === ''){
        return (
            <Redirect to='/'/>
        )
    }
    // if(localStorage.getItem('SinginFirebase')===true){
    //     var { docs  } = UseFirestore(firebase.auth().currentUser.displayName);
    // }
    // if(localStorage.getItem('SigninGuest')===true){
    //     var { docs  } = UseFirestore(localStorage.getItem('userName'));
    // }
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
        {
            (props.to) ? 
        <div>
        <div className='message-box'>
            <div style={{backgroundColor:'#0B0C10',height:70,width:'60%' ,alignItems:'center',position:'fixed',zIndex:'100000'}} >
            <div  style={{backgroundColor:'#0B0C10',display:"grid",gridTemplateColumns:'auto 45px',alignSelf:'center'}}>
                <div style={{display:'grid',gridTemplateColumns:'100px auto'}}>
            <div className='active_user_list_image_container' style={{}}>
        <img style={{width:40 ,marginTop:10,marginLeft:20,border:'1px solid white'}} className='active_user_list_image' src={userAvatar} />
      </div>

      <span style={{marginLeft:-17,marginTop:10 ,fontSize:25,alignSelf:'flex-start' }} >{props.to}</span>
      </div>
      <div >
      <AiOutlineClose onClick={HandleClose} style={{width:35,height:35,marginTop:10}}/>
      </div>
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
                      
                      <div class="box3 sb13 right-msg" ><span> {doc.msg}</span></div>
                      
                      {
                  (doc.createdAt) ? 
                  
                      <span style={{color:'gray',fontSize:'10px'}}>{ moment(doc.createdAt.toDate ( )).fromNow() }</span>
                  
                  :
                  <div></div>
                      }
                      
                      {/* <span style={{color:'gray',fontSize:'10px'}}>{()=>{
                          if( doc.createdAt){
                              return(
                          moment(doc.createdAt.toDate ( )).fromNow()
                              )}
                              else{
                                  return 'hello'
                              }
                        }}</span> */}
                  {/* <span style={{color:'black' , fontWeight:'bold'}}>{doc.userName} :</span>   
              <span style={{color:'black'}}>{doc.msg}</span> */}
              </div>
              :

              <div style={{marginLeft:10,wordWrap:'break-word'}} >
                <div class="box2 sb14 left-msg" ><span style={{display:'flex',width:'auto',color:'black'}}> {doc.msg}</span></div>

{
                  (doc.createdAt) ? 
                  
                      <span style={{color:'gray',fontSize:'10px'}}>{ moment(doc.createdAt.toDate ( )).fromNow() }</span>
                  
                  :
                  <div></div>
                      }

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
            {/* cbced4 */}
            </div>

        </div>
        <div style={{width:'100%',backgroundColor:"whitesmoke",height:72,display:"flex",alignItems:"center",borderTop:'1px solid #e0dcdc'}}>
        <input id='chat-box-input' style={{width:'75%',height:45,borderRadius:10,border:'solid 1px #c7c5c5',marginLeft:15}} onChange={ (e)=> {setMsg(e.target.value)}} type="text"></input>
        
                <button id='chat-box-input-button'style={{width:50,height:52,borderRadius:10,border:'solid 1px #c7c5c5'}} onClick={ChnageHandler}><FiSend id='chat-box-input-button-icon' style={{width:25,height:25,transform:'translateY(3px)'}} /></button>
                </div>
                
        </div>
        :
        <div style={{color:'gray',marginTop:50,marginLeft:30}}>Please Select a chat to send messages</div>
        }
        </div>
    )
}
export default Chatbox;