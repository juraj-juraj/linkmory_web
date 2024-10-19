import { FormEvent } from "react"

import config from "../config.json";
import userInfo from "../models/userModel";

interface props {
    onSave(): void;
    url_id: string|null;
    user_info: userInfo
}
interface FormElements extends HTMLFormControlsCollection{
    name: HTMLInputElement
    bio: HTMLInputElement
    link_fb: HTMLInputElement
    link_insta: HTMLInputElement
    link_linkedin: HTMLInputElement
}

interface UserEditFormElement extends HTMLFormElement{
    readonly elements: FormElements;
}

function UpdateInfo({onSave, url_id, user_info} : props) {
    async function handleSubmit(e: FormEvent<UserEditFormElement>){
        e.preventDefault();
        const form = e.currentTarget;
        const formData = {
            "name": form.elements.name.value,
            "bio": form.elements.bio.value,
            "link_fb": form.elements.link_fb.value,
            "link_insta": form.elements.link_insta.value,
            "link_linkedin": form.elements.link_linkedin.value
        };
        try {
            console.log(JSON.stringify(formData));
            const response = await fetch(config.bUrl+"/user/create/?id="+url_id, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            console.log('Success:', result);
            // Optionally, handle success (e.g., show a success message)
        } catch (error) {
            console.error('Error:', error);
            // Optionally, handle error (e.g., show an error message)
        }
        onSave();
    }
    return (
        <form onSubmit={handleSubmit}>
            <div>
                Name:
            </div>
            <input id="name" placeholder="Name" defaultValue={user_info.name}/>
            <div>
                About me:
            </div>
            <input id="bio" placeholder="About me..." defaultValue={user_info.bio}/>
            <div>
                Facebook link:
            </div>
            <input id="link_fb" placeholder="Paste your contact URL" defaultValue={user_info.link_fb}/>
            <div>
                Instagram link:
            </div>
            <input id="link_insta" placeholder="Paste your contact URL" defaultValue={user_info.link_insta}/>
            <div>
                LinkedIn link:
            </div>
            <input id="link_linkedin" placeholder="Paste your contact URL" defaultValue={user_info.link_linkedin}/>
            <div>
            </div>
            <button type="submit">Share</button>
        </form>
    );
}

export default UpdateInfo;
