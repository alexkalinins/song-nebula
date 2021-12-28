import React from 'react'
import useId from '@hooks/useId';

export default function SearchResult({data}) {
    const {setId} = useId();

    return (
        <div className="searchResult" onClick={()=>setId(data.id)}>
            <img src={data.image_url} alt="" />
            <div>
                <h3>{data.title}</h3>
                <p>by {data.artist_names.toString().replace(',',', ')}</p>
            </div>            
        </div>
    )
}
