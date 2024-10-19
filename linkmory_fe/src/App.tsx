import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";

import config from "./config.json";
import logo from "./assets/edit.png";
import "./App.css";
import ShowInfo from "./components/ShowInfo";
import  UpdateInfo from "./components/UpdateInfo"

class UserExist {
  exists: boolean = false;
}

function App() {
  const url_id = new URLSearchParams(window.location.search).get("id"); // get id from url
  const [user_exists, setUserExists] = useState<UserExist>(new UserExist()); // define var user_exists
  const [edit_data, setView] = useState(false); // define var editData
  const changeView = () => { // define fun to change editData var
    setView(view => !view);
  }
  useEffect(() => { // inbuild fun to constantnly use when rendering
      const api = async() => { // define assynchronous fun - not waiting for its finish
          const data = await fetch(config.bUrl + "/user/exist?id="+url_id, {method: "GET"}); // GET - ziskaj data z backend URL
          const jsonData = await data.json();
          setUserExists(jsonData); // set the user_exists var
          if (jsonData && jsonData.exists !== undefined) {
            setView(jsonData.exists); // Set edit_data based on the fetched data
          }
      }; // end of lambda fun
      api(); // run the lambda fun
  }, [url_id]); // call useEffect when url_id is changed
  console.log("user exists: " + user_exists.exists);
  console.log("view: " + edit_data);
  return (
    <>
    <nav className="navbar-lm fixed-top"> 
        <h2>Profile</h2>
        <button type="button" onClick={changeView}><img className="img-navbar" src={logo}/></button>
    </nav>
    {/* Based on edit_data - decide which React fun to render (run) - pass the changeView var through onSave fun*/}
    {edit_data ? <ShowInfo /> : <UpdateInfo onSave={changeView} url_id={url_id}/>}
    </>);
}

export default App;
