import SongDisplay from '@components/nebula/SongDisplay';
import useId from '@hooks/useId';
import Nebula from '@components/nebula/Nebula';
import NavBar from '@components/navbar/NavBar';
import Footer from '@components/Footer';
import Head from '@components/Head';


export default function Home() {
  const { id } = useId();

  return (
    <div className="indexContainer">
      <Head/>
      <main>
        <div className="nebulaPage">
          <NavBar />
          <Nebula />
          <SongDisplay id={id} />
        </div>
      </main>
      <Footer />
    </div>
  )
}
