import { useEffect, useState } from "react";

import config from "../config.json";
import {UserConnection} from "../models/userModel"

import "./listConnections.css"

interface props{
    user_id: string;
}

function ListConnections({user_id}: props) {
    const [connectionList, setConnectionList] = useState<UserConnection[]>([]);
    
    useEffect(() => {
        const api = async() => {
            const data = await fetch(config.bUrl + "/user/connection/list/?id=" + user_id, {method: "GET"});
            const data_json = await data.json();
            const userConnections: UserConnection[] = data_json;
            setConnectionList(userConnections);
        };
        api();
    }, [user_id]);

    function handleClick(id: string) {
        window.location.href = "/?id=" + id;
        
    }
    return (
        <div className="list-connections-main">
            <h2>Connections</h2>
            <div className="connection-list">
                {connectionList.map((connection) => (
                    <div>
                    <p key={connection.id_other}>
                        {connection.person_name}
                    </p>
                    <button className="visit-profile-button" key={connection.id_other} onClick={() => handleClick(connection.id_other)}>
                        Visit profile
                    </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ListConnections;
