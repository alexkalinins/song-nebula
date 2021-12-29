import React, { useState, useEffect } from 'react'
import ClusterButton from '../components/cluster_radio/ClusterButton';
import { v4 as uuid } from 'uuid'
import SongPlayer from '../components/cluster_radio/SongPlayer';
import { COLORS } from '../components/globals';
import NavBar from '@components/navbar/NavBar';
import axios from 'axios';
import Footer from '@components/Footer';

export default function Cluster_radio() {

    const [selectedCluster, setSelectedCluster] = useState(null);
    const [currentSong, setCurrentSong] = useState(null);
    const [doneSong, setDoneSong] = useState(true);

    const [numClusters, setNumClusters] = useState(0);
    const [songs, setSongs] = useState([])
    const [songIndex, setSongIndex] = useState(0);
    const [newCluster, setNewCluster] = useState(false)

    const handleOnClick = (index) => {
        if (selectedCluster !== index) {
            setSelectedCluster(index);
            setNewCluster(true);
            setSongIndex(0);
        }

        setDoneSong(true); // want next song to play
    }

    useEffect(() => {
        axios({
            method: 'get',
            url: '/api/cluster_radio/num_clusters'
        }).then(res => {
            console.log(res.data)
            setNumClusters(res.data.num);
        }).catch(err => {
            console.error(err);
        })
    }, [])

    useEffect(() => {
        if (selectedCluster && numClusters > 0 && (newCluster || songIndex === 5)) {
            console.log('Requesting songs from cluster ' + selectedCluster)
            axios({
                method: 'get',
                url: `/api/cluster_radio/radio/${selectedCluster}`
            }).then(res => {
                setSongs(res.data.songs);
                console.log(res.data.songs.map(song => song.preview_url))
            }).catch(err => {
                console.error(err);
            });

            setSongIndex(0);
            setNewCluster(false);

        }

    }, [numClusters, selectedCluster, songIndex, newCluster])

    useEffect(() => {
        if (songs && doneSong) {
            setDoneSong(false);
            setCurrentSong(songs[songIndex]);
            console.log('Playing song index ' + songIndex)
            setSongIndex(songIndex + 1);

        }
    }, [songs, songIndex, doneSong])


    return (<div>


        <main>
            <NavBar clusterRadio={true} />

            <div className="pageContent">
                <h1>Cluster Radio</h1>

                <div className="clusterRadioContainer">
                    <div className="clusterStack">
                        {[...Array(numClusters).keys()].map((number) => (
                            <ClusterButton index={number} onClick={handleOnClick} key={uuid()} selected={number == selectedCluster} />
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
        <Footer />
    </div>
    )
}
