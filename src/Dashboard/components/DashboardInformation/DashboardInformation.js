import React from 'react';

import './DashboardInformation.css';

const DashboardInformation = ({ username }) => {
  return (
    <div style={{marginRight:20}} className='dashboard_info_text_container'>
      <span className='dashboard_info_text_title' >
        Hello <span style={{color:'#66FCF1',fontSize:50}}>{username}</span> welcome in Connect.
      </span>
      <span className='dashboard_info_text_description'>
        You can start a call calling directy to a person from the list or
        you can create or join group call.
      </span>
    </div>
  );
};

export default DashboardInformation;
