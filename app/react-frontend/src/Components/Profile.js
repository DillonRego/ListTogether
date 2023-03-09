import Userfront from "@userfront/react";
import React, { useState } from 'react';

const Profile = () => {
  const userData = Userfront.user;

  const [link, setLink] = useState(userData.image);

  function updateLink(link)
  {
    userData.update({image: link});
    console.log(link);
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <img
          src={link}
          alt="User profile"
          style={{width: 200, height: 200, margin: 5}}
        />
        <label htmlFor="imglink">Link To Profile Image:</label>
      <input type="text" id="title" value={link} onChange={d => setLink(d.target.value)}/>
        <button onClick={ (a) => {updateLink(link);}}>Submit</button>
        <h2>{userData.name}</h2>
        <p>@{userData.username}</p>
        <p>{userData.email}</p>
        <button onClick={Userfront.logout}>Logout</button>
      </div>
    </div>
  );

}


export default Profile;