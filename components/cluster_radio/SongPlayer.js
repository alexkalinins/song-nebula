import React from 'react'

/**
 * A music player interface that playes the provided song.
 * @param song the song being played
 * @param onEnded the callback when next song is requested.
 */
export default function SongPlayer({song, onEnded, backgroundColor}) {

    //todo
    return (
        <div className="songPlayer" style={{backgroundColor: backgroundColor}}>
            <h1>{song.title}</h1>
            <h2>{song.artist_names.toString().replace(',', ', ')}</h2>
            <img src={song.image_url} alt=""/>
            <audio src={song.preview_url} controls autoPlay="true" onEnded={onEnded} />
        </div>
    )
}
