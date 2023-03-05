import './App.css';
import './index.css'
import React from 'react'
import Userfront from "@userfront/react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import NewForm from './newForm';
import ImageUpload from './Components/imageUpload';
import ImageDisplay from './Components/imageDisplay';

function App() {

const SignupForm = Userfront.build({
  toolId: "nkdmaal"
});

const LoginForm = Userfront.build({
  toolId: "llbrddr"
});

Userfront.init("vnd78z9b");

    return (
      
    <div className="container">
      <h1>Choose your path!</h1>
      <BrowserRouter basename="/">
        <nav>
          <ul>
            <li>
              <Link to="/login">login</Link>
            </li>
            <li>
              <Link to="/signup">signup</Link>
            </li>
            <li>
              <Link to="/dashboard">dashboard</Link>
            </li>
            <li>
              <Link to="/logout">logout</Link>
            </li>
            <li>
              <Link to="/newform">newform</Link>
            </li>
            <li>
              <Link to="/imageupload">imageupload</Link>
            </li>
            <li>
              <Link to="/imagedisplay">imagedisplay</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/login" element={<LoginForm/>}/>
          <Route path="/signup" element={<SignupForm/>}/>
          <Route path="/dashboard" element={"Nothing here"}/>
          <Route path="/logout" element={"Nothing here"}/>
          <Route path="/newform" element={<NewForm/>}/>
          <Route path="/imageupload" element={<ImageUpload/>}/>
          <Route path="/imagedisplay" element={<ImageDisplay/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
//ReactDOM.render(<App />, document.getElementById('root'))
export default App;