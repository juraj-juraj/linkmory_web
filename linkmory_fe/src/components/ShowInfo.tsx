import userInfo from "../models/userModel"
import fb_logo from "../assets/facebook.png";
import insta_logo from "../assets/instagram.png";
import linkedin_logo from "../assets/linkedin.png";

import "./ShowInfo.css"

interface props{
    user_info: userInfo;
}

function getLinkedInId(url: string) {
    // Create a new URL object
    const urlObj = new URL(url);
    
    // Get the pathname from the URL
    const path = urlObj.pathname; // This will give you "/in/juraj-novosad-094765263/"
    
    // Split the path by '/' and get the last part
    const parts = path.split('/');
    const id = parts[parts.length - 2]; // The ID is the second last part
    
    return id; // Return the extracted ID
}

function ShowInfo({user_info}: props) {
    // const userAgent = navigator.userAgent.toLowerCase();
    // let device = "Desktop"
    // if (/iphone|ipad|ipod/.test(userAgent)) {
    //     console.log('iOS');
    //     device = "Ios";
    // } else if (/android/.test(userAgent)) {
    //     console.log('Android');
    //     device = "Android";
    // }

    return (
        <div className="show-info-main">
            <h1 className="heading" >{user_info.name}</h1>
            <p className="bio"> {user_info.bio}</p>
            <a href={"fb://profile/" + user_info.id_fb} > <button className="contact-button facebook-bg"><img src={fb_logo}/>Get Contact</button></a>
            <a href={"linkedin://in/" + getLinkedInId(user_info.link_linkedin)} > <button className="contact-button linkedin-bg"><img src={linkedin_logo}/>Get Contact</button></a>
            <a href={"https://instagram.com/" + user_info.link_insta}> <button className="contact-button insta-bg"><img src={insta_logo}/>Get Contact</button></a>
        </div>
    );
}

export default ShowInfo;