import React from 'react'

export default function InfoWindow({children, onClose}) {
    return (
        <div className="infoWindow">
            <button className="closeButton" onClick={onClose}>x</button>
            {children}
        </div>
    )
}
