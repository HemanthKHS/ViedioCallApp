import React , {useState} from "react";
// import './Post.css'
import UseFirestore from "../../Firebase/UseFirestore";
import  {projectStorage , projectFirestore , timestamp}  from '../../Firebase/FirebaseConfig';
import moment from 'moment';
import './style.css'

function Chatbox2( {setSelectedimg} ){

    const { docs  } = UseFirestore('Hemanth');
    const [msg, setMsg] =  useState('');
    const [username, setUsername] = useState('')
    const [to, setTo] = useState('')
    let userName = 'Hemanth'

    function ChnageHandler(e){
       
        let msg_ = msg
        const createdAt = timestamp();
        
        let Recciptant = to
        projectFirestore.collection(userName).add({ msg , createdAt ,userName,Recciptant});
        projectFirestore.collection(Recciptant).add({ msg , createdAt ,userName,Recciptant});
        document.getElementById('chat-box-input').value=''
        
    }
    // console.log(moment().calendar(docs[3].createdAt) , moment(docs[3].createdAt.toDate ( )).fromNow(),docs[3].createdAt.seconds )

    return (
        <div>
            
        <div className='message-box'>
            <span style={{color:'black'}}>user : {userName}</span>
            to <input  onChange={ (e)=> {setTo(e.target.value)}} type="text" />
           
            {
                docs && docs.map(doc => (
                    <div>
                   <span style={{color:'black'}}>{doc.userName} :</span>     
                   <span style={{color:'black'}}>{doc.msg}</span>
                    {/* <span style={{color:'gray',fontSize:'10px'}}>{moment(doc.createdAt.toDate ( )).fromNow()}</span> */}
                   </div>
                ))
            }

        </div>
        <input id='chat-box-input' onChange={ (e)=> {setMsg(e.target.value)}}  type="text"></input>
                <button onClick={ChnageHandler}>Send</button>
        </div>
    )
}
export default Chatbox2;