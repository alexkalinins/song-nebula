import React from 'react'
import Link from 'next/link';
import Search from './Search';
import useClusters from '@hooks/useClusters';

export default function NavBar() {
    const { hasClusterNebula } = useClusters();

    return (
        <div className="navBar">
            <div className="navBarLeftButtons">
                <h2>SongNebula</h2>
                {hasClusterNebula() &&
                    <Link href="/cluster_radio">
                        <div className="navButton">Cluster Radio</div>
                    </Link>
                }
                <Link href="/help">
                    <div className="navButton">Help</div>
                </Link>

                <Link href="/about">
                    <div className="navButton">About</div>
                </Link>
            </div>


            <Search />
        </div>
    )
}
