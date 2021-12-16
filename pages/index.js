import Head from 'next/head'
import Image from 'next/image'
import SongDisplay from '../components/SongDisplay';
import { useState } from 'react';

export default function Home() {
  const [songId, setSongId] = useState("0ZPquQV2aKmDfwPjvMdvRp");
  const [search, setSearch] = useState("")
  return (
    <div>
      <main>
        <div className="topBar">
          <h1>SongNebula</h1>
          <input type="text" className="searchBar" placeholder="Search for a song..." onKeyPress={e => {
            if (e.key == 'Enter') {
              //todo submit search
            }
          }} />
        </div>
        <SongDisplay id={songId} />
      </main>
    </div>
  )
}
