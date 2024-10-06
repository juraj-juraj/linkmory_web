import "bootstrap/dist/css/bootstrap.css";
import "./LinkList.css";

import ContactItem from "./ContactItem";

function ListLinks(){
    const contactItems = ["Facebook", "Instagram", "LinkedIn"];
    
    return (
    <ul className="link-list">
        {contactItems.map((item) => (
            <li key={item} className="list-item">
                <ContactItem name={item} link={item}/>
            </li>
        ))}
    </ul>);
}

export default ListLinks;