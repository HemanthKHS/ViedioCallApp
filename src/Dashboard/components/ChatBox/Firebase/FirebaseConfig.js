import  firebase from 'firebase/app';
import 'firebase/auth'; 
import 'firebase/storage'
import 'firebase/firestore'




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
  // Initialize Firebase
  
  // firebase.initializeApp(firebaseConfig);

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
 }else {
    firebase.app(); // if already initialized, use that one
 }

  const projectStorage   = firebase.storage();
  const projectFirestore = firebase.firestore();
  const timestamp = firebase.firestore.FieldValue.serverTimestamp;
  // var uiConfig = {
  //   signInFlow: "popup",
  //   signInOptions: [
  //     firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  //     firebase.auth.FacebookAuthProvider.PROVIDER_ID,
  //     firebase.auth.TwitterAuthProvider.PROVIDER_ID,
  //     firebase.auth.GithubAuthProvider.PROVIDER_ID,
  //     firebase.auth.EmailAuthProvider.PROVIDER_ID
  //   ],
  //   callbacks: {
  //     signInSuccess: () => false
  //   }
  // }

  const googleAuth = new firebase.auth.GoogleAuthProvider() 
  const fbAuth = new firebase.auth.FacebookAuthProvider() 
  const GithubAuth = new firebase.auth.GithubAuthProvider() 


  const SocialMediaAuth = (provider) =>{
    firebase.auth().signInWithPopup(provider).then((resp)=>{      
return resp.user;
    }).catch((err)=>{
console.log(err)
    })
  }


   export  { projectFirestore , projectStorage , timestamp, firebase ,googleAuth ,SocialMediaAuth,fbAuth,GithubAuth} 