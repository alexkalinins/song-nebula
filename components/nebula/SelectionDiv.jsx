import React, { useState } from 'react'
import useFeatures from '@hooks/useFeatures';

export default function SelectionDiv({ feature, children }) {
    const [selected, setSelected] = useState(false)
    const {onSelect, onDeselect} = useFeatures();

    return (
        <div className={selected ? 'selectedDiv' : 'unselectedDiv'} onClick={() => {
            if(!selected){
                setSelected(onSelect(feature));
            } else {
                setSelected(!onDeselect(feature));
            }
        }}>
            {children}
        </div>
    )
}
