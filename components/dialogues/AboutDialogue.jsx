import React from 'react'
import InfoWindow from './InfoWindow';

export default function AboutDialogue({ onClose }) {
    return (
        <InfoWindow onClose={onClose}>
            <h2>About</h2>
            <p>
                SongNebula is a tool that allows the exploration of songs based on audio features. You can select three different features to explore
                and the songs will placed in the &lsquo;Nebula&lsquo; based on their features; essentially a 3D scatterplot. A Gaussian Mixture Model
                has been fitted on all of the songs, placing each song in a particular &lsquo;Cluster&lsquo; based on the features of the song. The
                songs in each cluster can be from very different genres but still share some pattern of features. The color of each song&lsquo;s point in
                the nebula is determined by its cluster.
            </p>
            <p>
                You can explore the sound of each cluster using the &lsquo;Cluster Radio&lsquo;. Spotify playlists based on each cluster are comming soon :)
            </p>
            <p>This project was created by <a href="https://alexkalinins.com">Alex Kalinins</a> with some help from <a href="https://parssak.com">Parssa Kyanzadeh</a>. Thanks for checking it out!
                <br /><br />
                <br />
            </p>
            <h3>Boring stuff</h3>
            <p>
                Data used to make SongNebula comes from the Spotify Web API. When a song is looked up, its audio features are saved to the database and its
                cluster is predicted using the Gaussian Mixture Model (GMM). The GMM was trained in Python using SciKit-Learn. The model parameters were saved
                and used in the express.js backend to predict the cluster when a new song is added.
            </p>
            <p>
                The <a href="https://github.com/alexkalinins/song-nebula">front-end</a> was implemented in Next.js and Three.js. All points in the SongNebula graph use the InstanceMesh, greatly improving the performance
                of the webapp. The <a href="https://github.com/alexkalinins/song-nebula-backend">back-end</a> was implemented in TypeScript using express.
            </p>
        </InfoWindow>
    )
}
