import React, { useState } from 'react'

export default function SelectionDiv({ canSelect, selectCallback, unselectCallback, children }) {
    const [selected, setSelected] = useState(false)
    return (
        <div className={selected ? 'selectedDiv' : 'unselectedDiv'} onClick={() => {
            if (!selected) {
                if (canSelect) {
                    selectCallback();
                    setSelected(true)
                }
            } else {
                // dont care about canSelect if unselecting
                unselectCallback();
                setSelected(false)
            }
        }}>
            {children}
        </div>
    )
}
