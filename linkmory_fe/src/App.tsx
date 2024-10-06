import { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";

import logo from "./assets/edit.png";
import "./App.css";
import ShowInfo from "./components/ShowInfo";

function App() {
  return (
    <>
    <nav className="navbar-lm fixed-top"> 
        <h2>Profile</h2>
        <button type="button"><img className="img-navbar" src={logo}/></button>
    </nav>
    <ShowInfo/>
    </>);
}

export default App;
