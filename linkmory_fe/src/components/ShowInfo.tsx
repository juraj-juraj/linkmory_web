import { useState, useEffect } from "react";

import config from "../config.json";
import fb_logo from "../assets/facebook.png";
import insta_logo from "../assets/instagram.png";
import linkedin_logo from "../assets/linkedin.png";

import "./ShowInfo.css"

interface userInfo {
    name: string,
    bio: string,
    link_fb: string,
    link_insta: string,
    link_linkedin: string
}

function ShowInfo() {
    const url_id = new URLSearchParams(window.location.search).get("id");
    const [info, setInfo] = useState<userInfo>({name: "name", bio: "", link_fb: "", link_insta: "", link_linkedin: ""});
    useEffect(() => {
        const api = async() => {
            const data = await fetch(config.bUrl+"/user/info?id="+url_id, {method: "GET"});
            const jsonData = await data.json();
            setInfo(jsonData);
        };
        api();
    }, [url_id]);
    return (
        <div className="show-info-main">
            <h1 className="heading" >{info.name}</h1>
            <p className="bio"> {info.bio}</p>
            <a href={info.link_fb} > <button className="contact-button facebook-bg"><img src={fb_logo}/>Get Contact</button></a>
            <a href={info.link_linkedin} > <button className="contact-button linkedin-bg"><img src={linkedin_logo}/>Get Contact</button></a>
            <a href={info.link_insta}> <button className="contact-button insta-bg"><img src={insta_logo}/>Get Contact</button></a>
        </div>
    );
}

export default ShowInfo;