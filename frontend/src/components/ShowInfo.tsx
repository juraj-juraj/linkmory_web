import{useState, useEffect} from "react";

import config from "../config.json";
import {userInfo} from "../models/userModel"
import fb_logo from "../assets/facebook.png";
import insta_logo from "../assets/instagram.png";
import linkedin_logo from "../assets/linkedin.png";
import web_logo from '../assets/fi_link_w.png';
import ListConnections from "./listConnections";
import mailIcon from "../assets/mail_icon.png";
import phoneIcon from "../assets/call_icon.png";
import "./ShowInfo.css"

interface props{
    user_info: userInfo;
    cookie_id: string | null;
    url_id: string | null;
}
enum ActionTypes {
    DISPLAY_CONNECTIONS = "display_connections",
    ADD_CONNECTION = "add_connection",
    SHOW_NOTE = "show_note",
    SHOW_NOTHING = "show_nothing"
}

function ShowInfo({user_info, cookie_id, url_id}: props) {
    const fb_link = user_info.link_fb;
    const[connections_view, setConnectionsView] = useState<ActionTypes>(ActionTypes.SHOW_NOTHING);


    if (cookie_id) {
        cookie_id = String(cookie_id);
    }
    useEffect(() => {
        const api = async() => {
            const data = await fetch(config.bUrl + "/user/connection/person/?id=" + cookie_id + "&id_other=" + url_id, {method: "GET"});
            if(data.status === 200){
                setConnectionsView(ActionTypes.SHOW_NOTE);
            }
            if(data.status === 405){
                setConnectionsView(ActionTypes.ADD_CONNECTION);
            }
        };
        if (cookie_id && url_id !== cookie_id) {
            api();
        }
        else if (cookie_id && url_id === cookie_id) {
            setConnectionsView(ActionTypes.DISPLAY_CONNECTIONS);
        }
    }, [cookie_id, url_id]);

    async function onClick() {
        const request_data = {
            "id_other": url_id,
            "note": ""
        };
        const response = await fetch(config.bUrl + "/user/connection/create?id=" + cookie_id, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(request_data)
        });
        if (response.status === 200) {
            setConnectionsView(ActionTypes.SHOW_NOTE);
        }
    }

    return (
        <div className="show-info-main">
            <h1 className="heading" >{user_info.name}</h1>
            <p className="bio"> {user_info.bio}</p>
            {user_info.link_linkedin ? <a href={user_info.link_linkedin} > <button className="contact-button linkedin-bg"><img src={linkedin_logo}/>Get Contact</button></a> : <></>}
            {user_info.link_insta ? <a href={"https://instagram.com/" + user_info.link_insta}> <button className="contact-button insta-bg"><img src={insta_logo}/>Get Contact</button></a> : <></>}
            {user_info.link_fb ?  <a href={fb_link} > <button className="contact-button facebook-bg"><img src={fb_logo}/>Get Contact</button></a> : <></>}
            {user_info.link_website ? <a href={user_info.link_website} > <button className="contact-button web-bg"><img src={web_logo}/>Visit Website</button></a> : <></>}
            {user_info.tel_number ? <a > <button className="contact-button transparent-bg"><img src={phoneIcon}/>{user_info.tel_number}</button></a>  : <></>}
            {user_info.email_address ? <a > <button className="contact-button transparent-bg"><img src={mailIcon}/>{user_info.email_address}</button></a> : <></>}
            {connections_view === ActionTypes.ADD_CONNECTION ? <button className="contact-button connection-bg" onClick={onClick}>Add Connection</button> : <></>}
            {connections_view === ActionTypes.SHOW_NOTE ? <></> : <></>}
            {connections_view === ActionTypes.DISPLAY_CONNECTIONS ? <ListConnections user_id={cookie_id}/> : <></>}
        </div>
    );
}

export default ShowInfo;
