import './App.css';
import './index.css'
import React from 'react'
import Userfront from "@userfront/react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

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
          </ul>
        </nav>
        <Routes>
          <Route path="/login" element={<LoginForm/>}/>
          <Route path="/signup" element={<SignupForm/>}/>
          <Route path="/dashboard" element={"Nothing here"}/>
          <Route path="/logout" element={"Nothing here"}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
//ReactDOM.render(<App />, document.getElementById('root'))
export default App;