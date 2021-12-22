import React from 'react'
import { SocialIcon } from 'react-social-icons';

export default function ImageButton({src, link}) {
    return (
        <div className="imageButton" onClick={()=>window.open(link, "_blank")}>
            <img src={src} />
        </div>
    )
}
