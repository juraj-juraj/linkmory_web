import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";

import config from "./config.json";
import logo from "./assets/edit.png";
import styles from "./App.module.css";
import ShowInfo from "./components/ShowInfo";
import  UpdateInfo from "./components/UpdateInfo"
import userInfo from "./models/userModel";


function App() {
  const url_id = new URLSearchParams(window.location.search).get("id"); // get id from url
  const [user_info, setInfo] = useState<userInfo>({name: "", bio: "", link_fb: "", link_insta: "", link_linkedin: ""}); // define var user_exists
  const [edit_data, setView] = useState(false); // define var editData
  const changeView = () => { // define fun to change editData var
    setView(view => !view);
  }
  useEffect(() => { // inbuild fun to constantnly use when rendering
      const api = async() => { // define assynchronous fun - not waiting for its finish
          const data = await fetch(config.bUrl + "/user/info/?id="+url_id, {method: "GET"}); // GET - ziskaj data z backend URL
          if(data.status === 404){
            setView(false);
            return
          }
          if (data.status === 200 && user_info.name.length === 0 ){
            setView(true);
          }
          setInfo(await data.json()); // set the user_exists var
      }; // end of lambda fun
      api(); // run the lambda fun
  }, [url_id, edit_data, user_info.name]); // call useEffect when url_id is changed
  return (
    <main className={styles.profileCreationContainer}>
        <header className={styles.headerSection}>
          <div className={styles.navbarTop}>
            {!edit_data ? <></> : <div className={styles.imgNavbar}></div>}
            <h1 className={styles.headerTitle}>{edit_data ? "Profile": "Make a profile"}</h1>
            {!edit_data ? <></> : <button type="button" className={styles.navbarButton} onClick={changeView}><img className={styles.imgNavbar} src="https://cdn.builder.io/api/v1/image/assets/TEMP/20e0294d36f526a71109d9b41380f86cbdbb69c17c521935c0da8b902c749413?placeholderIfAbsent=true&apiKey=f560b18130354807b388ec0c9e912c6d"/></button>}
          </div>
          <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/670fe62f49123097f1c74007524d0b953da1dd440a037cd4d654646d6e7d3feb?placeholderIfAbsent=true&apiKey=f560b18130354807b388ec0c9e912c6d" alt="" className={styles.headerImage} />
        </header>
    {/* Based on edit_data - decide which React fun to render (run) - pass the changeView var through onSave fun*/}
    {edit_data ? <ShowInfo user_info={user_info} /> : <UpdateInfo onSave={changeView} url_id={url_id} user_info={user_info}/>}
    </main>);
}

export default App;
