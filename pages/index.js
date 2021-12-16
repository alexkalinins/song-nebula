import SongDisplay from '../components/SongDisplay';
import Search from '../components/Search';
import useId from '../hooks/useId';
import Nebula from '../components/Nebula';

export default function Home() {
  const { id } = useId();

  return (
    <div>
      <main>
        <div className="topBar">
          <h1>SongNebula</h1>
          <Search />
        </div>
        <div className="mainContent">
          <SongDisplay id={id} />
          <Nebula />
        </div>
      </main>
    </div>
  )
}
