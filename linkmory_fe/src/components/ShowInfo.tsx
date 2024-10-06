import { useState, useEffect } from "react";

import fb_logo from "../assets/facebook.png";
import insta_logo from "../assets/instagram.png";
import linkedin_logo from "../assets/linkedin.png";

//import getUserData from "../services/userService";

import "./ShowInfo.css"

type userInfo = {
    name: string,
    bio: string,
    link_fb: string,
    link_insta: string,
    link_linkedin: string
}

function ShowInfo() {
    const url_id = new URLSearchParams(window.location.search).get("id");
    const [info, setInfo] = useState<userInfo[]>([]);
    useEffect(() => {
        const api = async() => {
            const data = await fetch("http://127.0.0.1:8000/api/user/info?id="+url_id, {method: "GET"});
            const jsonData = await data.json();
            //console.log(jsonData);
            setInfo(jsonData);
        };
        api();
    }, []);
    console.log(info);
    return (
        <div className="show-info-main">
            <h1 className="heading" >{info.name}</h1>
            <p className="bio"> {info.bio}</p>
            <button className="contact-button facebook-bg"><img src={fb_logo}/>Get Contact</button>
            <button className="contact-button linkedin-bg"><img src={linkedin_logo}/>Get Contact</button>
            <button className="contact-button insta-bg"><img src={insta_logo}/>Get Contact</button>
        </div>
    );
}

export default ShowInfo;