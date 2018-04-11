import React from 'react';
import 'font-awesome/css/font-awesome.min.css';

export const Toast = ({ errorMsg }) => (
  <div
    style={{
      opacity: '0.8',
      backgroundColor: '#FF220C',
      borderRadius: '5px',
      display: 'flex',
      flexDirection: 'row',
      width: '25%',
      margin: '35px',
      justifyContent: 'center',
      height: '20%'
    }}
  >
    <i
      style={{
        color: 'white',
        fontSize: '3.5em',
        display: 'flex',
        position: 'relative',
        zIndex: '500',
        margin: '25px 0 30px 0'
      }}
      className="fa fa-circle"
    >
      <i
        style={{
          fontSize: '0.8em',
          display: 'flex',
          position: 'absolute',
          zIndex: '1000',
          color: 'red',
          alignItems: 'center',
          justifyContent: 'center',
          top: '8px',
          left: '16px'
        }}
        className="fa fa-exclamation"
      />
    </i>
    <p
      style={{
        color: 'white',
        margin: '25px 0 30px 20px',
        lineHeight: '1.5',
        width: '60%'
      }}
    >
      ERROR <br /> {errorMsg} <br />
    </p>
  </div>
);
