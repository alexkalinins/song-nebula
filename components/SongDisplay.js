import React, { useEffect, useState } from 'react'
import axios from 'axios'
import SelectionDiv from './SelectionDiv';

export default function SongDisplay({ id }) {

    const [song, setSong] = useState(null)
    const [selected, setSelected] = useState([])

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

    const selectCallback = (elem) => {
        setSelected([...selected, elem]);
    }

    const unselectCallback = (elem) => {
        setSelected(selected.filter(e => e != elem));
    }

    return (
        <div>
            {song && (
                <div className="songDisplay">
                    <h2>{song.title}</h2>
                    <p>by {song.artists}</p>
                    <img src={song.image_url} alt="" />

                    <SelectionDiv canSelect={selected.length < 3} selectCallback={() => selectCallback('acousticness')} unselectCallback={() => unselectCallback('acousticness')}>
                        <h3>Acousticness</h3>
                        <p>{song.acousticness}</p>
                    </SelectionDiv>

                    <SelectionDiv canSelect={selected.length < 3} selectCallback={() => selectCallback('danceability')} unselectCallback={() => unselectCallback('danceability')}>
                        <h3>Danceability</h3>
                        <p>{song.danceability}</p>
                    </SelectionDiv>

                    <SelectionDiv canSelect={selected.length < 3} selectCallback={() => selectCallback('energy')} unselectCallback={() => unselectCallback('energy')}>
                        <h3>Energy</h3>
                        <p>{song.energy}</p>
                    </SelectionDiv>

                    <SelectionDiv canSelect={selected.length < 3} selectCallback={() => selectCallback('liveness')} unselectCallback={() => unselectCallback('liveness')}>
                        <h3>Liveness</h3>
                        <p>{song.liveness}</p>
                    </SelectionDiv>

                    <SelectionDiv canSelect={selected.length < 3} selectCallback={() => selectCallback('speechiness')} unselectCallback={() => unselectCallback('speechiness')}>
                        <h3>Speechiness</h3>
                        <p>{song.speechiness}</p>
                    </SelectionDiv>

                    <SelectionDiv canSelect={selected.length < 3} selectCallback={() => selectCallback('instrumentalness')} unselectCallback={() => unselectCallback('instrumentalness')}>                <h3>Instrumentalness</h3>
                        <p>{song.instrumentalness}</p>
                    </SelectionDiv>

                    <SelectionDiv canSelect={selected.length < 3} selectCallback={() => selectCallback('valence')} unselectCallback={() => unselectCallback('valence')}>
                        <h3>Valence</h3>
                        <p>{song.valence}</p>
                    </SelectionDiv>

                    <SelectionDiv canSelect={selected.length < 3} selectCallback={() => selectCallback('loudness')} unselectCallback={() => unselectCallback('loudness')}>
                        <h3>Loudness</h3>
                        <p>{song.loudness}</p>
                    </SelectionDiv>

                    <SelectionDiv canSelect={selected.length < 3} selectCallback={() => selectCallback('tempo')} unselectCallback={() => unselectCallback('tempo')}>
                        <h3>Tempo</h3>
                        <p>{song.tempo}</p>
                    </SelectionDiv>

                    <SelectionDiv canSelect={selected.length < 3} selectCallback={() => selectCallback('popularity')} unselectCallback={() => unselectCallback('popularity')}>
                        <h3>Popularity</h3>
                        <p>{song.popularity}</p>
                    </SelectionDiv>

                    <h3>Key</h3>
                    <p>{song.key}</p>

                    <h3>Mode</h3>
                    <p>{song.mode}</p>
                </div>
            )}

        </div>
    )
}
