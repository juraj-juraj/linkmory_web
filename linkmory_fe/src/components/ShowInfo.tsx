import userInfo from "../models/userModel"
import fb_logo from "../assets/facebook.png";
import insta_logo from "../assets/instagram.png";
import linkedin_logo from "../assets/linkedin.png";

import "./ShowInfo.css"

interface props{
    user_info: userInfo;
}

function ShowInfo({user_info}: props) {
    return (
        <div className="show-info-main">
            <h1 className="heading" >{user_info.name}</h1>
            <p className="bio"> {user_info.bio}</p>
            <a href={user_info.link_fb} > <button className="contact-button facebook-bg"><img src={fb_logo}/>Get Contact</button></a>
            <a href={user_info.link_linkedin} > <button className="contact-button linkedin-bg"><img src={linkedin_logo}/>Get Contact</button></a>
            <a href={user_info.link_insta}> <button className="contact-button insta-bg"><img src={insta_logo}/>Get Contact</button></a>
        </div>
    );
}

export default ShowInfo;