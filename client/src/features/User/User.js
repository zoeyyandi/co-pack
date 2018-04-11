import React from 'react';

export const User = ({ user, lastUser }) => (
  <li
    style={{
      display: 'flex',
      flexDirection: 'row',
      marginRight: '5px',
      whiteSpace: 'nowrap'
    }}
  >
    <p style={{ margin: 0, wrap: 'no-wrap' }}>
      {user}
      {lastUser ? '' : ','}
    </p>
  </li>
);
