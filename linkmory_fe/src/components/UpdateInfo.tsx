import { FormEvent } from "react"
import { useCookies } from 'react-cookie';

import config from "../config.json";
import userInfo from "../models/userModel";
import styles from "./UpdateInfo.module.css";
import InputField from './InputField.tsx';

interface props {
    onSave(): void;
    url_id: string | null;
    user_info: userInfo
}
interface FormElements extends HTMLFormControlsCollection {
    name: HTMLInputElement
    bio: HTMLInputElement
    link_fb: HTMLInputElement
    link_insta: HTMLInputElement
    link_linkedin: HTMLInputElement
}

interface UserEditFormElement extends HTMLFormElement {
    readonly elements: FormElements;
}

interface SocialInputData {
    icon: string;
    placeholder: string;
    id: string;
    type: string;
}

const socialInputs: SocialInputData[] = [
    { icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/817a4bb9f1582e38e00c679fa15d20f31845ca6af648255c3b77e09fd8d36174?placeholderIfAbsent=true&apiKey=f560b18130354807b388ec0c9e912c6d', placeholder: 'Your Instagram username', id: "link_insta", type: "text" },
    { icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/c74d3c6cea8a1db389dadde13971b93162450de59728897220ae96fb96aa9997?placeholderIfAbsent=true&apiKey=f560b18130354807b388ec0c9e912c6d', placeholder: 'Paste your Facebook URL' , id: "link_fb", type: "url"},
    { icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/f6a85497c32a9fb142a8f2cf5703efa8d18989782547db7e5c28cc5142a3e343?placeholderIfAbsent=true&apiKey=f560b18130354807b388ec0c9e912c6d', placeholder: 'Paste your LinkedIn URL' , id: "link_linkedin", type: "url"},
];

function UpdateInfo({ onSave, url_id, user_info }: props) {
    const [_, set_id_cookie] = useCookies(["user_id"])
    async function handleSubmit(e: FormEvent<UserEditFormElement>) {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = {
            "name": form.elements.name.value,
            "bio": form.elements.bio.value,
            "link_fb": form.elements.link_fb.value,
            "link_insta": form.elements.link_insta.value,
            "link_linkedin": form.elements.link_linkedin.value,
            "id_fb": ""
        };
        try {
            console.log(JSON.stringify(formData));
            const response = await fetch(config.bUrl + "/user/create/?id=" + url_id, {
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
        if(form.elements.name.value.length === 0){
            return;
        }
        // Handling saving cookie on creating an account
        const expirationDate = new Date();
        expirationDate.setMinutes(expirationDate.getMinutes() + 15);
        set_id_cookie("user_id", url_id, {expires: expirationDate});

        onSave();
    }
    return (
        <form className={styles.formContainer} onSubmit={handleSubmit}>
            <section className={styles.formSection}>
                <div className={styles.inputGroup}>
                    <InputField
                        icon="https://cdn.builder.io/api/v1/image/assets/TEMP/f8a2cf5312baf73a5ea4160c58b16e61f2e1125f17a34dbb90fe617241ec07b2?placeholderIfAbsent=true&apiKey=f560b18130354807b388ec0c9e912c6d"
                        placeholder="Name"
                        type="text"
                        id="name"
                        default_value={user_info.name}
                    />
                    <div className={styles.textareaWrapper}>
                        <label htmlFor="aboutMe" className={styles['visually-hidden']}>About me</label>
                        <textarea
                            id="bio"
                            className={styles.textarea}
                            placeholder="About me..."
                            defaultValue={user_info.bio}
                        ></textarea>
                    </div>
                </div>
                <div className={styles.socialInputs}>
                    {socialInputs.map((input, index) => (
                        <InputField
                            key={index}
                            icon={input.icon}
                            placeholder={input.placeholder}
                            type={input.type}
                            id={input.id}
                            default_value={user_info[input.id as keyof userInfo]}
                        />
                    ))}
                </div>
            </section>
            <button type="submit" className={styles.uploadButton}>
                <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/5851a9470c7e4a22b3958b2c6c5b27c25f65c366bb87cfa1570f91e081b27252?placeholderIfAbsent=true&apiKey=f560b18130354807b388ec0c9e912c6d" alt="" className={styles.uploadIcon} />
                <span>Upload</span>
            </button>
        </form>
    );
}

export default UpdateInfo;
