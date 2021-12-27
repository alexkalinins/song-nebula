import React, { useState, useEffect } from 'react'
import useClusters from '../hooks/useClusters';
import ClusterButton from '../components/cluster_radio/ClusterButton';
import { v4 as uuid } from 'uuid'
import SongPlayer from '../components/cluster_radio/SongPlayer';
import { COLORS } from '../components/globals';

export default function Cluster_radio() {
    const { getClusters } = useClusters();

    const [selectedCluster, setSelectedCluster] = useState(0);
    const [currentSong, setCurrentSong] = useState(null);
    const [doneSong, setDoneSong] = useState(true);

    const handleOnClick = (index) => {
        setSelectedCluster(index);
        setDoneSong(true); // want next song to play
    }

    useEffect(() => {
        if (doneSong) {
            const cluster = getClusters()[selectedCluster];
            const newSong = null;

            do {

                newSong = cluster[Math.floor(Math.random() * cluster.length)];
            } while (!newSong.preview_url)

            setCurrentSong(newSong);
            setDoneSong(false)

        }
    }, [selectedCluster, getClusters, doneSong])

    return (
        <main>
            <div className="pageContent">
                <h1>Cluster Radio</h1>

                <div className="clusterRadioContainer">
                    <div className="clusterStack">
                        {getClusters().map((cluster, index) => (
                            <ClusterButton index={index} onClick={handleOnClick} key={uuid()} selected={index == selectedCluster} />
                        ))}
                    </div>
                    <div>
                        <h2>Now Playing: Cluster #{selectedCluster}</h2>
                        {currentSong &&
                            <SongPlayer song={currentSong} backgroundColor={COLORS[selectedCluster]} onEnded={() => { setDoneSong(true) }} />
                        }
                    </div>
                </div>
            </div>
        </main>
    )
}
