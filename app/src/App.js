import './App.css';
import './index.css'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Userfront from "@userfront/react";

Userfront.init("vnd78z9b");

const SignupForm = Userfront.build({
  toolId: "nkdmaal"
});

const LoginForm = Userfront.build({
  toolId: "llbrddr"
});

class App extends Component {
  render(){
    return (
    <div className = "App">
     <SignupForm/>:
      <LoginForm/>
    </div>
    )
  }
}
ReactDOM.render(<App />, document.getElementById('root'))
export default App;