import { FormEvent } from "react"


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

    function handleSubmit(e: FormEvent<UserEditFormElement>){
        e.preventDefault();
        const form = e.currentTarget;
        //fetch("http://127.0.0.1:8000/api/user/create?id="+url_id, {method: "POST", body: form.elements})
        //e.currentTarget.elements.bio.value;
    }

    return (
        <form onSubmit={handleSubmit}>
            <input id="name" defaultValue="Name"/>
            <input id="bio" defaultValue="About me..."/>
            <input id="link_fb" defaultValue="Paste your contact URL"/>
            <input id="link_insta" defaultValue="Paste your contact URL"/>
            <input id="link_linkedin" defaultValue="Paste your contact URL"/>
            <button>Send</button>
        </form>
    );
}

export default UpdateInfo;
