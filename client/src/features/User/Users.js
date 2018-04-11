import React from 'react';
import { User } from './User';

export const Users = ({ users }) => (
  <div
    style={{
      width: '100%',
      display: 'flex',
      alignItems: 'flex-start',
      marginTop: '30px',
      borderBottom: '1px solid black',
      padding: '0 35px 0 35px',
      fontSize: '1.2em'
    }}
  >
    <p style={{ whiteSpace: 'nowrap', marginTop: '0' }}>Users Online:</p>
    <ul
      style={{
        listStyleType: 'none',
        padding: 0,
        margin: '0 10px 10px 10px',
        display: 'flex',
        flexWrap: 'wrap',
        width: '85%'
      }}
    >
      {users.map((user, index) => (
        <User
          key={user.id}
          user={user.name}
          lastUser={users.length - 1 === index}
        />
      ))}
    </ul>
  </div>
);
