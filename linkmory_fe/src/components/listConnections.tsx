import { useEffect, useState } from "react";

import config from "../config.json";
import {UserConnection} from "../models/userModel"

import "./listConnections.css"

interface props{
    user_id: string | null;
}

function ListConnections({user_id}: props) {
    const [connectionList, setConnectionList] = useState<UserConnection[]>([]);
    
    useEffect(() => {
        const api = async() => {
            const data = await fetch(config.bUrl + "/user/connection/list/?id=" + user_id, {method: "GET"});
            if(data.status === 404){
                return
            }
            const data_json = await data.json();
            const userConnections: UserConnection[] = data_json;
            setConnectionList(userConnections);
        };
        if (user_id) {
            api();
        }
    }, [user_id]);

    function handleClick(id: string) {
        window.location.href = "/?id=" + id;
        
    }
    if (connectionList.length === 0) {
        return null;
    }

    return (
        <div className="list-connections-main">
            <h2 className="heading">My Connections</h2>
            <div className="connection-list">
                {connectionList.map((connection) => (
                    <div className="item" key={connection.id_other}>
                        <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/670fe62f49123097f1c74007524d0b953da1dd440a037cd4d654646d6e7d3feb?placeholderIfAbsent=true&apiKey=f560b18130354807b388ec0c9e912c6d" alt="" className="list-delimiter-line" />
                        <p>
                            {connection.person_name}
                        </p>
                        <button className="contact-button web-bg " onClick={() => handleClick(connection.id_other)}>
                            Visit profile
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ListConnections;
