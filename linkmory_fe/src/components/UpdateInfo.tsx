import { FormEvent } from "react"


interface FormElements extends HTMLFormControlsCollection{
    name: HTMLInputElement
    bio: HTMLInputElement
    fb_url: HTMLInputElement
    insta_url: HTMLInputElement
    linkedin_url: HTMLInputElement
}

interface UserEditFormElement extends HTMLFormElement{
    readonly elements: FormElements;
}

function UpdateInfo() {
    function handleSubmit(e: FormEvent<UserEditFormElement>){
        e.preventDefault();
        //e.currentTarget.elements.bio.value;
    }

    return (
        <form onSubmit={handleSubmit}>
            <input id="name" defaultValue="Name"/>
            <input id="bio" defaultValue="About me..."/>
            <input id="fb_url" defaultValue="Paste your contact URL"/>
            <input id="insta_url" defaultValue="Paste your contact URL"/>
            <input id="linkedin_url" defaultValue="Paste your contact URL"/>
        </form>
    );
}

export default UpdateInfo;
