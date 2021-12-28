import React from 'react'
import Link from 'next/link';
import Search from './Search';
import useClusters from '../../hooks/useClusters';

export default function NavBar() {
    const { hasClusterNebula } = useClusters();

    return (
        <div className="navBar">
            <h1>SongNebula</h1>
            {hasClusterNebula() &&
                <Link href="/cluster_radio">
                    <div className="navButton">Clusters</div>
                </Link>
            }

            <Search />
        </div>
    )
}
