import React, { useState } from 'react';
import { connect } from 'react-redux';
import logo from '../resources/logo.png';
import UsernameInput from './components/UsernameInput';
import SubmitButton from './components/SubmitButton';
import { useHistory } from 'react-router-dom';
import { setUsername } from '../store/actions/dashboardActions';
import { registerNewUser } from '../utils/wssConnection/wssConnection';
import './LoginPage.css';
import { firebase ,googleAuth,SocialMediaAuth} from "../Dashboard/components/ChatBox/Firebase/FirebaseConfig";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"

const LoginPage = ({ saveUsername }) => {
  const [username, setUsername] = useState('');

  const history = useHistory();

  const handleSubmitButtonPressed = () => {
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
    registerNewUser(userName);
    saveUsername(userName);
    history.push('/dashboard');

        }).catch((err)=>{
    console.log(err)
        })
  
}



  return (
    <div className='login-page_container background_main_color' >
      <div className='login-page_login_box background_secondary_color'>
        <div className='login-page_logo_container'>
          <img className='login-page_logo_image' src={logo} alt='VideoTalker' />
        </div>
        <div className='login-page_title_container'>
          <h2>Get on Board</h2>
        </div>
        <UsernameInput username={username} setUsername={setUsername} />
        <SubmitButton handleSubmitButtonPressed={handleSubmitButtonPressed} />

        {/* <StyledFirebaseAuth
            uiConfig={uiConfig}
            firebaseAuth={firebase.auth()}
          /> */}

          <button onClick={()=>{HandleLogin(googleAuth)}}>Google</button>
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
