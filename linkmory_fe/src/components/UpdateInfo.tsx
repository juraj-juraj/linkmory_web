import { FormEvent } from "react"
import axios from "axios";


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

function UpdateInfo() {
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
            const response = await fetch("http://127.0.0.1:8000/api/user/create/?id="+url_id, {
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
    }

    return (
        <form onSubmit={handleSubmit}>
            <input id="name" name="name" defaultValue="Name"/>
            <input id="bio" name="bio" defaultValue="About me..."/>
            <input id="link_fb" name="link_fb" defaultValue="Paste your contact URL"/>
            <input id="link_insta" name="link_insta" defaultValue="Paste your contact URL"/>
            <input id="link_linkedin" name="link_linkedin" defaultValue="Paste your contact URL"/>
            <button type="submit">Send</button>
        </form>
    );
}

export default UpdateInfo;
