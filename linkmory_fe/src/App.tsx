import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";

import logo from "./assets/edit.png";
import "./App.css";
import ShowInfo from "./components/ShowInfo";
import  UpdateInfo from "./components/UpdateInfo"

type UserExist = {
  exists: boolean
}

function App() {
  const url_id = new URLSearchParams(window.location.search).get("id");
  const [user_exists, setUserExists] = useState<UserExist[]>([]);
  const [edit_data, setView] = useState(false);
  const changeView = () => {
    setView(view => !view);
  }
  useEffect(() => {
      const api = async() => {
          const data = await fetch("http://127.0.0.1:8000/api/user/exist?id="+url_id, {method: "GET"});
          const jsonData = await data.json();
          setUserExists(jsonData);
          if (jsonData && jsonData.exists !== undefined) {
            setView(jsonData.exists); // Set edit_data based on the fetched data
          }
      };
      api();
  }, [url_id]);
  console.log("user exists: " + user_exists.exists);
  console.log("view: " + edit_data);
  return (
    <>
    <nav className="navbar-lm fixed-top"> 
        <h2>Profile</h2>
        <button type="button" onClick={changeView}><img className="img-navbar" src={logo}/></button>
    </nav>
    {edit_data ? <ShowInfo /> : <UpdateInfo onSave={changeView}/>}
    </>);
}

export default App;
