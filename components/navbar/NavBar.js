import React, { useState } from 'react'
import Link from 'next/link';
import Search from './Search';
import AboutDialogue from '../dialogues/AboutDialogue';
import NebulaHelpDialogue from '../dialogues/NebulaHelpDialogue';

export default function NavBar({ clusterRadio }) {

    const [showHelp, setShowHelp] = useState(false);
    const [showAbout, setShowAbout] = useState(false);

    return (
        <div className="navBar">
            <div className="navBarLeftButtons">
                <Link href="/">
                    <h2 className="bigNebulaButton">SongNebula</h2>
                </Link>


                {!clusterRadio &&
                    <Link href="/cluster_radio">
                        <div className="navButton">Cluster Radio</div>
                    </Link>
                }

                
                <div className="navButton" onClick={()=>{
                    if(showAbout) setShowAbout(false);
                    setShowHelp(!showHelp)}}>Help</div>
                

                
                    <div className="navButton" onClick={()=>{if(showHelp) setShowHelp(false);setShowAbout(!showAbout)}}>About</div>
                
            </div>


            {!clusterRadio &&
                <Search />
            }

            {showAbout &&
                <AboutDialogue onClose={_=>setShowAbout(false)} />
            }

            {showHelp &&
                <NebulaHelpDialogue onClose={_=>setShowHelp(false)} />
            }

        </div>
    )
}
