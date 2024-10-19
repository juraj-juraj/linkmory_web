import userInfo from "../models/userModel"
import fb_logo from "../assets/facebook.png";
import insta_logo from "../assets/instagram.png";
import linkedin_logo from "../assets/linkedin.png";

import "./ShowInfo.css"

interface props{
    user_info: userInfo;
}

function ShowInfo({user_info}: props) {
    const userAgent = navigator.userAgent.toLowerCase();
    let fb_link = user_info.link_fb;
    if (/iphone|ipad|ipod/.test(userAgent)) {
        console.log('iOS');
        fb_link = "fb://profile/" + user_info.id_fb;
    } else if (/android/.test(userAgent)) {
        console.log('Android');
        fb_link = "intent://profile/" +user_info.id_fb + "#Intent;package=com.facebook.katana;scheme=fb;end";
    }
    return (
        <div className="show-info-main">
            <h1 className="heading" >{user_info.name}</h1>
            <p className="bio"> {user_info.bio}</p>
            {user_info.link_insta ? <a href={"https://instagram.com/" + user_info.link_insta}> <button className="contact-button insta-bg"><img src={insta_logo}/>Get Contact</button></a> : <></>}
            {user_info.link_fb ?  <a href={fb_link} > <button className="contact-button facebook-bg"><img src={fb_logo}/>Get Contact</button></a> : <></>}
            {user_info.link_linkedin ? <a href={user_info.link_linkedin} > <button className="contact-button linkedin-bg"><img src={linkedin_logo}/>Get Contact</button></a> : <></>}
        </div>
    );
}

export default ShowInfo;