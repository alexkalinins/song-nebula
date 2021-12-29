import SongDisplay from '@components/nebula/SongDisplay';
import useId from '@hooks/useId';
import Nebula from '@components/nebula/Nebula';
import NavBar from '@components/navbar/NavBar';
import Footer from '@components/Footer';

export default function Home() {
  const { id } = useId();

  return (
    <div>
      <main>
        <div className="nebulaPage">
          <NavBar />
          <SongDisplay id={id} />
          <Nebula />
        </div>
      </main>
      <Footer />
    </div>
  )
}
