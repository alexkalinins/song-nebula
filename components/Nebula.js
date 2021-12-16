import React, { useEffect } from 'react'
import useId from '../hooks/useId';
import useFeatures from '../hooks/useFeatures';

export default function Nebula() {
    const {id} = useId();
    const {selected} = useFeatures();

    useEffect(()=>{
        if(selected.length==3){
            // make querry for cluster
        }
    }, [id, selected])

    return (
        <div className="nebulaContainer">
            <h1>TODO THREE.JS</h1>
        </div>
    )
}
