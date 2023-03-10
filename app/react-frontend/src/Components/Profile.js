import Userfront from "@userfront/react";
import React, {useState } from 'react';

const Profile = () => {
  const userData = Userfront.user;
  const [link, setLink] = useState(userData.image);
  const [bState, setButton] = useState(false);  
  const [bText, setBText] = useState("Edit");


  function updateLink(link)
  {
    userData.update({image: link});
    console.log(link);
  }

  function toggleShowImageData()
  {
    setButton(!bState);
    if(bText === "Edit")
      setBText("Close");
    else
      setBText("Edit");
  }

  function SelectiveRender()
  {
      if(bState === true)
      {
        return(
        <h2>
        <label htmlFor="imglink">Link To Profile Image:</label>
        <input type="text" id="title" value={link} onChange={d => setLink(d.target.value)}/>
        <button onClick={ (a) => {updateLink(link);}}>Submit</button>
        </h2>
      )}
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <img
          src={link}
          alt="User profile"
          style={{width: 200, height: 200, margin: 5}}
        />
        <h2>
        <button onClick={ (a) => {toggleShowImageData();}}>{bText}</button>
        <SelectiveRender></SelectiveRender>
        </h2>
        <h3>{userData.name}</h3>
        <p>@{userData.username}</p>
        <p>{userData.email}</p>
        <button onClick={Userfront.logout}>Logout</button>
      </div>
    </div>
  );

}


export default Profile;