import React, { useEffect, useState } from "react";
import "./Freunde.css";

export default function Freunde() {
    const [frends, setFrends] = useState([{
       /* id: 1,
        vorname: 'Adrian',
        nachname: 'Prinziy',
        geborenam: new Date('2024-05-11'),
        geschlaecht: 'Männlich',
    */
    }]);
    const [hoveredFriendId, setHoveredFriendId] = useState(null); // Speichert die ID der gehowerten Karte

    //usequery von tanstack müsste aber erst noch intalliert werden
    //axios

    useEffect(() => {
        fetch('http://localhost:8080/api/frends')
            .then((response) => response.json())
            .then((data) => setFrends(data))
            .catch((error) => console.error('Error fetching data:', error));
    }, []);


    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div>
            {/* klasse an den Parrent(div) geben und dort dim oder nicht dim mit geben wie in dem div hoverFrendsId */}
            <h1 className="head">Freunde Liste</h1>

            {/* Overlay: Wird sichtbar, wenn eine Karte gehowered ist */}
            <div className={hoveredFriendId ? "overlay active" : "overlay"}></div>
            
            <ul>
                {frends.length > 0 ? (
                    frends.map((friend) => (
                        <li
                            key={friend.id}
                            onMouseEnter={() => setHoveredFriendId(friend.id)} // Setzt die gehowerte Karte
                            onMouseLeave={() => setHoveredFriendId(null)}      // Entfernt das Hover, wenn die Maus weg ist
                            className={hoveredFriendId && hoveredFriendId !== friend.id ? "dimmed" : ""}
                        >
                            <span>{friend.vorname}</span>
                            <span>{friend.nachname}</span>
                            <span>{formatDate(friend.geborenam)}</span>
                            <span>{friend.geschlaecht}</span>
                        </li>
                    ))
                ) : (
                    <li>No friends found</li>
                )}
            </ul>
        </div>
    );
}
