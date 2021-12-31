import React, { useEffect, useState } from 'react'
import axios from 'axios'
import SelectionDiv from './SelectionDiv';
import ReactAudioPlayer from 'react-audio-player';
import { KEYS, MODE } from '@components/globals';
import useDisplaySong from '@hooks/useDisplaySong';


export default function SongDisplay({ id }) {
    const { displaySong, setDisplaySong } = useDisplaySong();

    useEffect(() => {
        if (!displaySong || displaySong.spotify_id !== id) {
            axios({
                method: 'get',
                url: `/api/spotify/${id}`,
            }).then(res => {
                console.log(res.data);
                setDisplaySong(res.data)
            }).catch(err => {
                console.error(err)
            })
        }
    }, [id])

    return (
        <div>
            {displaySong && (
                <div className="songDisplay">
                    <h1>{displaySong.title}</h1>
                    <p>by {displaySong.artist_names.toString().replace(',', ', ')}</p>
                    <img src={displaySong.image_url} alt="" />
                    {displaySong.preview_url &&
                        <ReactAudioPlayer src={displaySong.preview_url} controls />
                    }
                    <SelectionDiv feature="acousticness">
                        <h3>Acousticness</h3>
                        <p>{displaySong.acousticness}</p>
                    </SelectionDiv>

                    <SelectionDiv feature="danceability">
                        <h3>Danceability</h3>
                        <p>{displaySong.danceability}</p>
                    </SelectionDiv>

                    <SelectionDiv feature="energy">
                        <h3>Energy</h3>
                        <p>{displaySong.energy}</p>
                    </SelectionDiv>

                    <SelectionDiv feature="liveness">
                        <h3>Liveness</h3>
                        <p>{displaySong.liveness}</p>
                    </SelectionDiv>

                    <SelectionDiv feature="speechiness">
                        <h3>Speechiness</h3>
                        <p>{displaySong.speechiness}</p>
                    </SelectionDiv>

                    <SelectionDiv feature="instrumentalness">
                        <h3>Instrumentalness</h3>
                        <p>{displaySong.instrumentalness}</p>
                    </SelectionDiv>

                    <SelectionDiv feature="valence">
                        <h3>Valence</h3>
                        <p>{displaySong.valence}</p>
                    </SelectionDiv>

                    <SelectionDiv feature="loudness">
                        <h3>Loudness</h3>
                        <p>{displaySong.loudness}</p>
                    </SelectionDiv>

                    <SelectionDiv feature="tempo">
                        <h3>Tempo</h3>
                        <p>{displaySong.tempo}</p>
                    </SelectionDiv>

                    <SelectionDiv feature="popularity">
                        <h3>Popularity</h3>
                        <p>{displaySong.popularity}</p>
                    </SelectionDiv>

                    <div className="featureDiv">
                        <h3>Key</h3>
                        <p>{KEYS[displaySong.key]}</p>
                    </div>

                    <div className="featureDiv">
                        <h3>Mode</h3>
                        <p>{MODE[displaySong.mode]}</p>
                    </div>
                </div>
            )}

        </div>
    )
}
