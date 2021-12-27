import React from 'react'
import { COLORS } from '../globals'

export default function ClusterButton({ index, onClick, selected }) {
    return (
        <div className={selected?"currentCluster":"clusterButton"} onClick={()=>onClick(index)} style={{backgroundColor: COLORS[index]}}>
            <h2>Cluster #{index}</h2>
        </div>
    )
}
