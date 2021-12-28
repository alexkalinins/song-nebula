import SongDisplay from '@components/nebula/SongDisplay';
import Search from '@components/navbar/Search';
import useId from '@hooks/useId';
import Nebula from '@components/nebula/Nebula';
import Link from 'next/link';
import useClusters from '@hooks/useClusters';

export default function Home() {
  const { id } = useId();
  const { hasClusterNebula } = useClusters();

  return (
    <div>
      <main>
        <Nebula />
        <div className="topBar">
          <h1>SongNebula</h1>
          {hasClusterNebula() && <Link href="/cluster_radio"><div className="navButton">Clusters</div></Link>}

          <Search />
        </div>
        <div className="mainContent">
          <SongDisplay id={id} />
        </div>
      </main>
    </div>
  )
}
