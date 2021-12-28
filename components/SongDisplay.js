import React, { useEffect, useState } from 'react'
import axios from 'axios'
import SelectionDiv from './SelectionDiv';
import ReactAudioPlayer from 'react-audio-player';
import { KEYS, MODE } from './globals';

export default function SongDisplay({ id }) {

    const [song, setSong] = useState(null)

    useEffect(() => {
        axios({
            method: 'get',
            url: `/api/spotify/${id}`,
        }).then(res => {
            console.log(res.data);
            setSong(res.data)
        }).catch(err => {
            console.error(err)
        })
    }, [id])

    return (
        <div>
            {song && (
                <div className="songDisplay">
                    <h2>{song.title}</h2>
                    <p>by {song.artist_names.toString().replace(',', ', ')}</p>
                    <img src={song.image_url} alt="" />
                    {song.preview_url &&
                        <ReactAudioPlayer src={song.preview_url} controls />
                    }
                    <SelectionDiv feature="acousticness">
                        <h3>Acousticness</h3>
                        <p>{song.acousticness}</p>
                    </SelectionDiv>

                    <SelectionDiv feature="danceability">
                        <h3>Danceability</h3>
                        <p>{song.danceability}</p>
                    </SelectionDiv>

                    <SelectionDiv feature="energy">
                        <h3>Energy</h3>
                        <p>{song.energy}</p>
                    </SelectionDiv>

                    <SelectionDiv feature="liveness">
                        <h3>Liveness</h3>
                        <p>{song.liveness}</p>
                    </SelectionDiv>

                    <SelectionDiv feature="speechiness">
                        <h3>Speechiness</h3>
                        <p>{song.speechiness}</p>
                    </SelectionDiv>

                    <SelectionDiv feature="instrumentalness">
                        <h3>Instrumentalness</h3>
                        <p>{song.instrumentalness}</p>
                    </SelectionDiv>

                    <SelectionDiv feature="valence">
                        <h3>Valence</h3>
                        <p>{song.valence}</p>
                    </SelectionDiv>

                    <SelectionDiv feature="loudness">
                        <h3>Loudness</h3>
                        <p>{song.loudness}</p>
                    </SelectionDiv>

                    <SelectionDiv feature="tempo">
                        <h3>Tempo</h3>
                        <p>{song.tempo}</p>
                    </SelectionDiv>

                    <SelectionDiv feature="popularity">
                        <h3>Popularity</h3>
                        <p>{song.popularity}</p>
                    </SelectionDiv>

                    <h3>Key</h3>
                    <p>{KEYS[song.key]}</p>

                    <h3>Mode</h3>
                    <p>{MODE[song.mode]}</p>
                </div>
            )}

        </div>
    )
}
