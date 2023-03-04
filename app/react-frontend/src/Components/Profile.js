import Userfront from "@userfront/react";
import React from 'react'

const Profile = () => {
  const userData = Userfront.user;

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <img
          src={userData.image}
          alt="User profile"
          style={{ maxWidth: '100%', marginBottom: '16px' }}
        />
        <h2>{userData.name}</h2>
        <p>@{userData.username}</p>
        <p>{userData.email}</p>
        <button onClick={Userfront.logout}>Logout</button>
      </div>
    </div>
  );
}

export default Profile;