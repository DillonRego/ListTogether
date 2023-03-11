import Userfront from "@userfront/react";
import React, { useState } from 'react';
import { Button, Form, Image } from 'react-bootstrap';

const Profile = () => {
  const userData = Userfront.user;

  const [link, setLink] = useState(userData.image);

  function updateLink(link) {
    userData.update({image: link});
    console.log(link);
  }

  return (
    <div className="d-flex justify-content-center">
      <div className="text-center">
        <Image
          src={link}
          alt="User profile"
          style={{width: 200, height: 200, margin: 5}}
          roundedCircle
        />
        <Form.Group controlId="imglink">
          <Form.Label>Link To Profile Image:</Form.Label>
          <Form.Control type="text" value={link} onChange={d => setLink(d.target.value)} />
        </Form.Group>
        <Button variant="primary" onClick={() => updateLink(link)}>Submit</Button>
        <h2>{userData.name}</h2>
        <p>@{userData.username}</p>
        <p>{userData.email}</p>
        <Button variant="danger" onClick={Userfront.logout}>Logout</Button>
      </div>
    </div>
  );
}

export default Profile;
