import { FormEvent } from "react"

import config from "../config.json";


interface props {
    onSave(): void;
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

function UpdateInfo({onSave} : props) {
    const url_id = new URLSearchParams(window.location.search).get("id");

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
            <input id="name" name="name" defaultValue="Name"/>
            <div>
                About me:
            </div>
            <input id="bio" name="bio" defaultValue="About me..."/>
            <div>
                Facebook link:
            </div>
            <input id="link_fb" name="link_fb" defaultValue="Paste your contact URL"/>
            <div>
                Instagram link:
            </div>
            <input id="link_insta" name="link_insta" defaultValue="Paste your contact URL"/>
            <div>
                LinkedIn link:
            </div>
            <input id="link_linkedin" name="link_linkedin" defaultValue="Paste your contact URL"/>
            <div>
            </div>
            <button type="submit">Share</button>
        </form>
    );
}

export default UpdateInfo;
