import { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";

import logo from "./assets/edit.png";
import "./App.css";
import ShowInfo from "./components/ShowInfo";
import  UpdateInfo from "./components/UpdateInfo"

function App() {
  const [edit_data, setView] = useState(false);

  const changeView = () => {
    setView(view => !view);
  }
  console.log("view: " + edit_data);
  return (
    <>
    <nav className="navbar-lm fixed-top"> 
        <h2>Profile</h2>
        <button type="button" onClick={changeView}><img className="img-navbar" src={logo}/></button>
    </nav>
    {edit_data ? <UpdateInfo onSave={changeView}/> : <ShowInfo />}
    </>);
}

export default App;
