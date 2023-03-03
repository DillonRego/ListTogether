import './App.css';
import './index.css'
import React from 'react'
import Userfront from "@userfront/react";
import { BrowserRouter, Link, Route, Routes, Navigate, useLocation } from "react-router-dom";
import NewForm from './newForm';

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
              <Link to="/profile">profile</Link>
            </li>
            <li>
              <Link to="/newform">newform</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/login" element={<LoginForm/>}/>
          <Route path="/signup" element={<SignupForm/>}/>
          <Route path="/dashboard" element={
              <RequireAuth>
                <h1>Dashboard</h1>
              </RequireAuth>
            }/>
            <Route path="/profile" element={
              <RequireAuth>
                <Profile />
              </RequireAuth>
            }/>
          <Route path="/newform" element={
              <RequireAuth>
                <NewForm />
              </RequireAuth>
            }/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

function Profile() {
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

function RequireAuth({ children }) {
  let location = useLocation();
  if (!Userfront.tokens.accessToken) {
    // Redirect to the /login page
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}
//ReactDOM.render(<App />, document.getElementById('root'))
export default App;