import SongDisplay from '@components/nebula/SongDisplay';
import useId from '@hooks/useId';
import Nebula from '@components/nebula/Nebula';
import NavBar from '@components/navbar/NavBar';

export default function Home() {
  const { id } = useId();

  return (
    <div>
      <main>
        <Nebula />
        <NavBar/>
        <div className="mainContent">
          <SongDisplay id={id} />
        </div>
      </main>
    </div>
  )
}
