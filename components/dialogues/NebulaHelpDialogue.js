import React from 'react'
import InfoWindow from './InfoWindow'

export default function NebulaHelpDialogue({onClose}) {
    return (
        <InfoWindow onClose={onClose}>
            <h2>Help</h2>
            <p>1. Use the search bar to search for a song; click on the song you want to see.
            </p>
            <img src="/media/help-search.png" alt=""/>
            <p>2. Select the three features you would like to visualize.
                
            </p>
            <img src="/media/help-select.png" alt=""/>
            <p>3. Orbit using the left mouse button, move around using the right mouse button. Click on a point to get
                info about that song. Double-click on a point to travel to its location.
            </p>
            <p>4. Press on the <b>ClusterRadio</b> Button to explore the sound of each cluster.</p>
        </InfoWindow>
    )
}
