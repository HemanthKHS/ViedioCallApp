import React from 'react';
import Button from '@material-ui/core/Button';


import './GroupCallButton.css';

const GroupCallButton = ({ onClickHandler, label }) => {
  return (
    <Button variant="contained" onClick={onClickHandler} style={{width:200,backgroundColor:'#45A29E',color:'white',top:'40%',left:'-15%'}}>
      {label}
    </Button>
  );
};

export default GroupCallButton;
