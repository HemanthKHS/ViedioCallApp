import React, { useState } from 'react';
import { connect } from 'react-redux';
import logo from '../resources/logo.png';
import UsernameInput from './components/UsernameInput';
import SubmitButton from './components/SubmitButton';
import { useHistory } from 'react-router-dom';
import { setUsername } from '../store/actions/dashboardActions';
import { registerNewUser } from '../utils/wssConnection/wssConnection';
import './LoginPage.css';
import { firebase ,googleAuth,SocialMediaAuth,fbAuth,GithubAuth} from "../Dashboard/components/ChatBox/Firebase/FirebaseConfig";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"
import Button from '@material-ui/core/Button';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';
import { IoLogoGithub } from 'react-icons/io';
import './extra.css'






const LoginPage = ({ saveUsername }) => {
  const [username, setUsername] = useState('');

  const history = useHistory();

  const handleSubmitButtonPressed = () => {
    localStorage.setItem('SigninGuest',true)
    localStorage.setItem('userName',username)
    registerNewUser(username);
    saveUsername(username);
    history.push('/dashboard');
  };

  var firebaseConfig = {
    apiKey: "AIzaSyATXJMhXN_ltYqK-zcsdHEGz4Vddmj2g0U",
    authDomain: "chat-app-ee062.firebaseapp.com",
    // databaseURL: "https://instagram-clone-7cb68-default-rtdb.firebaseio.com",
    projectId: "chat-app-ee062",
    storageBucket: "chat-app-ee062.appspot.com",
    messagingSenderId: "489631514062",
    appId: "1:489631514062:web:bebff9b6e97da441ac7f9f",
    // measurementId: "G-S6Q7D0BGMG"
  };

  // firebase.initializeApp(firebaseConfig);

  var uiConfig = {
    signInFlow: "popup",
    signInSuccessUrl: '/jjjj',
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
      // firebase.auth.GithubAuthProvider.PROVIDER_ID,
      // firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccess: () => false
    }
  }


const HandleLogin = async (provider) =>{
  // const resp = await SocialMediaAuth(provider)
  //   var userName = firebase.auth().currentUser.displayName
  //   registerNewUser(userName);
  //   saveUsername(userName);
  //   history.push('/dashboard');

  firebase.auth().signInWithPopup(provider).then((resp)=>{      
    
      var userName = firebase.auth().currentUser.displayName;
      localStorage.setItem('userName',userName)
      localStorage.setItem('SinginFirebase',true)
    registerNewUser(userName);  
    saveUsername(userName);
    history.push('/dashboard');

        }).catch((err)=>{
    console.log(err)
        })
  
}



  return (
    <div className='login-page_container ' style={{backgroundColor:'#1F2833',display:'grid',gridTemplateColumns:'1.5fr 1fr'}} >
      <div style={{marginLeft:50,marginTop:-200}}>
        <h1 style={{color:'#66FCF1',fontSize:'100px'}}>Connect App</h1>
        <span>This Project is Made as part of Microsoft Engage Program <div class="loader">
  <div class="logo">
    <div class="red"></div>
    <div class="green"></div>
    <div class="blue"></div>
    <div class="yellow"></div>
  </div>
  <p>Microsoft</p>
</div></span>
      </div>

      <div className='login-page_login_box background_secondary_color'>
        <div className='login-page_logo_container'>
          <img className='login-page_logo_image' src={logo} alt='VideoTalker' />
        </div>
        <div className='login-page_title_container'>
          <h2>Get on Board</h2>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr'}}>
        <div>
        <Button variant="contained" style={{backgroundColor:'white',color:'gray',textTransform:'none',marginBottom:10,marginLeft:40,width:200}} onClick={()=>{HandleLogin(googleAuth)}}> <FcGoogle style={{width:22,height:22, marginRight:10,borderRadius:0}}/>Sign In With Google</Button>
        <Button variant="contained" style={{backgroundColor:'white',color:'gray',textTransform:'none',marginBottom:10,marginLeft:40,width:200}} onClick={()=>{HandleLogin(fbAuth)}}> <FaFacebook style={{width:22,height:22,marginLeft:-30, marginRight:10,borderRadius:0,color:'#4267B2'}}/>Sign In With Fb</Button>
        <Button variant="contained" style={{backgroundColor:'white',color:'gray',textTransform:'none',marginBottom:10,marginLeft:40,width:200}} onClick={()=>{HandleLogin(GithubAuth)}}> <IoLogoGithub style={{width:22,height:22, marginRight:10,borderRadius:0,color:'black'}}/>Sign In With GitHub</Button>
        </div>

        <div style={{display:'grid',gridTemplateRows:'1fr 1fr 1fr',transform:'translateY(-50px)',marginLeft:20}}>
    <span style={{marginLeft:30,marginTop:20 }} >Or Login As Guest</span>
        <UsernameInput style={{}} username={username} setUsername={setUsername} />
        <SubmitButton handleSubmitButtonPressed={handleSubmitButtonPressed} />
        </div>
        </div>
        {/* <StyledFirebaseAuth
            uiConfig={uiConfig}
            firebaseAuth={firebase.auth()}
          /> */}

      </div>
    </div>
  );
};

const mapActionsToProps = (dispatch) => {
  return {
    saveUsername: username => dispatch(setUsername(username))
  };
};

export default connect(null, mapActionsToProps)(LoginPage);
