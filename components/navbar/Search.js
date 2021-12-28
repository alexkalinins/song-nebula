import React, { useEffect, useState } from 'react'
import axios from 'axios'
import useId from '@hooks/useId';
import SearchResult from './SearchResult';

export default function Search() {
    const [search, setSearch] = useState("");
    const [results, setResults] = useState(null);
    const {id} = useId();

    const sendSearch = () =>{
        axios({
            method: 'get',
            url: `/api/spotify/search/${search}`,
        }).then(res => {
            setResults(res.data);
        }).catch(err => {
          console.error(err);
        })
    }

    useEffect(() => {setResults(null)}, [id])
    useEffect(() => {if(!search)setResults(null)}, [search])

    return (
        <div className="searchBarDiv">
            <input type="text" className="searchBar" placeholder="Search for a song..." onKeyPress={e => {
            if (e.key == 'Enter') {
              sendSearch();
            }
          }} 
          onChange={e=>{setSearch(e.target.value)}} />
          {results && (
            <div className="searchResults">
              {results.map(res =>(
                <SearchResult data={res} key={res.id}/>
              ))}
            </div>
          )}
        </div>
    )
}
