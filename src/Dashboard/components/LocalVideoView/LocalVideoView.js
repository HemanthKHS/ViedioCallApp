import React, { useRef, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';


const styles = {
  videoContainer: {
    // width: '150px',
    // height: '150px',
    // borderRadius: '8px',
    // position: 'absolute',
    // padding:'5px'
    
    // top: '5%',
    // right: '23%'
  },
  videoElement: {
    // width: '100%',
    // height: '100%',
    width: '148px',
    height: '115px',
    // border:'1px solid black',
    alignItems:'center',
    marginBottom:0,
    display:'fill'
  }
};

const LocalVideoView = props => {
  const { localStream } = props;
  const localVideoRef = useRef();

  useEffect(() => {
    if (localStream) {
      const localVideo = localVideoRef.current;
      localVideo.srcObject = localStream;

      localVideo.onloadedmetadata = () => {
        localVideo.play();
      };
    }
  }, [localStream]);

  return (
    <Paper style={{width:150,height:130,padding:5,marginLeft:30,alignItems:"center",marginBottom:'40%'}} elevation={3} >
    <div  className='' style={styles.videoContainer}>
      <video style={styles.videoElement} ref={localVideoRef} autoPlay muted />
    </div> 
    </Paper>
  );
};

export default LocalVideoView;
