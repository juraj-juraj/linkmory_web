import "bootstrap/dist/css/bootstrap.css";

interface Props{
    name: String;
    link: string;
}

function ContactItem({name, link}: Props){
    return (
        <div>{name}</div>
    );
}

export default ContactItem;