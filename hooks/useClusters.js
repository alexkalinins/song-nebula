import axios from 'axios';
import { atom, useRecoilState } from 'recoil';

const clusterState = atom({
    key: 'clusterState',
    default: null
});

const nebulaState = atom({
    key: 'nebulaState',
    default: null
});

const useClusters = () => {
    const [cluster, setCluster] = useRecoilState(clusterState);
    const [nebula, setNebulaState] = useRecoilState(nebulaState);

    const setClusterNebula = (newNebula) => {
        setNebulaState(newNebula);
    }

    const hasClusterNebula = () => {
        return !(nebula === undefined || nebula === null)
    }

    const clustersFromNebula = (nebula) => {
        const clusters = [];

        nebula.forEach(song => {
            if (clusters[song.cluster] === undefined) {
                clusters[song.cluster] = [];
            }
            clusters[song.cluster].push(song);
        });
        setCluster(clusters);
        return clusters;
    }

    const getClusters = () => {
        if (cluster) return cluster;

        if (!nebula) {
            console.log('no nebula')
            // axios({
            //     method: 'get',
            //     url: '/api/spotify/nebula/previews?axis1=acousticness&axis2=danceability&axis3=liveness',
            // }).then(res => {
            //     if (!hasClusterNebula() && res.data) {
            //         setClusterNebula(res.data);
            //         return clustersFromNebula(res.data);
            //     }

            // }).catch(err => {
            //     console.error(err)
            //     console.log('we be here')
            //     return []
            // });
        } else {
            console.log('we have a nebula')
            return clustersFromNebula(nebula);
        }


    }

    return { setClusterNebula, hasClusterNebula, getClusters }

}


export default useClusters
