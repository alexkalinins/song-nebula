import React, { useEffect, useState } from 'react'
import useId from '../hooks/useId';
import useFeatures from '../hooks/useFeatures';
import axios from 'axios';

export default function Nebula() {
    const {id} = useId();
    const {selected} = useFeatures();

    const [nebula, setNebula] = useState([]);
    const [oldSelected, setOldSelected] = useState([])

    useEffect(()=>{
        if(selected.length==3 && selected != oldSelected){
            setOldSelected(selected);
            axios({
                method: 'get',
                url: `/api/spotify/nebula/previews?axis1=${selected[0]}&axis2=${selected[1]}&axis3=${selected[2]}`,
            }).then(res=>{
                console.log(res.data.length);
                console.log(res.data[0]);
                setNebula(res.data);
            }).catch(err => console.log(err));
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, selected])

    return (
        <div className="nebulaContainer">
            <h1>TODO THREE.JS</h1>
        </div>
    )
}
