import React from 'react'
import ReactAudioPlayer from 'react-audio-player';
import { SocialIcon } from 'react-social-icons';
import ImageButton from './ImageButton';


export default function PointWindow({ song, backgroundColor }) {

    return (
        <div className="pointWindow">
            <ImageButton src={song.image_url} link={song.song_url} />
            <h2>{song.title}</h2>
            <p>by {song.artist_names.toString().replace(',', ', ')}</p>
            {song.preview_url &&
                <ReactAudioPlayer src={song.preview_url} controls />
            }

            {/* <SocialIcon network={'spotify'} onClick={() => window.open(song.song_url, "_blank")} /> */}


        </div>
    )
}
