import React from 'react'
import { Route, Navigate, useLocation, BrowserRouter, Routes } from "react-router-dom";
import Userfront from "@userfront/react";
import Header from './NavigationBar/header';
import Library from './Components/Library';
import Profile from "./Components/Profile";
import NewForm from './Components/newForm';

const SignupForm = Userfront.build({
  toolId: "nkdmaal"
});

const LoginForm = Userfront.build({
  toolId: "llbrddr"
});

Userfront.init("vnd78z9b");

function App() {

  return (
    <div className="container">
      <BrowserRouter>
      <Header />
          <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/dashboard" element={<RequireAuth><Library /></RequireAuth>} />
            <Route path="/profile" element={<RequireAuth><Profile /></RequireAuth>} />
            <Route path="/newform" element={<RequireAuth><NewForm /></RequireAuth>} />
          </Routes>
        </BrowserRouter>
      </div>
  );

  function RequireAuth({ children }) {
    let location = useLocation();
    if (!Userfront.tokens.accessToken) {
      // Redirect to the /login page
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
    return children;
  }
}


//ReactDOM.render(<App />, document.getElementById('root'))
export default App;