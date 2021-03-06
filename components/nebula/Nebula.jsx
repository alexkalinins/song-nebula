import React, { useEffect, useRef, useState, useMemo } from 'react'
import useId from '@hooks/useId';
import useFeatures from '@hooks/useFeatures';
import axios from 'axios';
import * as THREE from 'three';

import { Canvas } from '@react-three/fiber'
import { OrbitControls, Html } from '@react-three/drei'
import PointWindow from './PointWindow';

import { COLORS } from '@components/globals';
import useDisplaySong from '@hooks/useDisplaySong';

import Loader from 'react-loader-spinner'


const tempObject = new THREE.Object3D()
const tempColor = new THREE.Color()

function Points({ data, selected, id, onClick }) {
    const meshRef = useRef();

    const colorArray = useMemo(() => {
        return Float32Array.from(new Array(data.length).fill().flatMap((_, i) => tempColor.set(COLORS[data[i].cluster]).toArray()))
    }, [data]);


    useEffect(() => {
        // normalize selected[0] field for all elements of data to be between 0 and 100
        const normalize = (field) => {
            const max = Math.max(...data.map(d => d[field]));
            const min = Math.min(...data.map(d => d[field]));
            const scale = (v) => (v - min) / (max - min) * 10 - 5;
            return Float32Array.from(data.map(d => scale(d[field])))
        }

        const x = normalize('x');
        const y = normalize('y');
        const z = normalize('z');

        for (let i in data) {
            tempObject.position.set(x[i], y[i], z[i])
            tempObject.scale.setScalar(data[i].spotify_id == id ? 5 : 1);
            tempObject.updateMatrix();
            meshRef.current.setMatrixAt(i, tempObject.matrix);
        }

        meshRef.current.instanceMatrix.needsUpdate = true;
        console.log('Instanec ref')
        console.log(meshRef);
    }, [data, id, selected]);

    return (
        <instancedMesh ref={meshRef} args={[null, null, data.length]} onPointerDown={
            event => {
                onClick(event)
            }
        }>
            <boxGeometry args={[0.1, 0.1, 0.1]} >
                <instancedBufferAttribute attachObject={['attributes', 'color']} args={[colorArray, 3]} />
            </boxGeometry>
            <meshPhongMaterial vertexColors={THREE.VertexColors} />
        </instancedMesh>
    )

}

function SelectionCursor({ position, song }) {
    const htmlRef = useRef();
    useEffect(() => {
        console.debug(htmlRef.current.querySelector('.pointWindow'))
        const pointWindow = htmlRef.current.querySelector('.pointWindow')
        if (!pointWindow) return;
        pointWindow.style.backgroundColor = COLORS[song.cluster] + 'b0';
    }, [song])
    return (
        <mesh position={position}>
            {song &&
                <boxGeometry args={[0.5, 0.5, 0.5]} />
            }
            <pointLight intensity={1} position={position} />
            <meshPhongMaterial color={0x00ff00} />
            <Html ref={htmlRef}>
                {song &&
                    <PointWindow song={song} backgroundColor={COLORS[song.cluster]} />
                }
            </Html>
        </mesh>
    )
}


export default function Nebula() {
    const selectedBoxRef = useRef();

    const { id, setId } = useId();
    const { selected } = useFeatures();
    const { displaySong } = useDisplaySong();

    // the nebula data being displaed
    const [nebula, setNebula] = useState([]);

    // the previous full set of selected axis -- to prevent making unnecessary requests.
    const [oldSelected, setOldSelected] = useState([])

    // the position of selected point -- where PointWindow is displayed
    const [selectedPosition, setSelectedPosition] = useState(new THREE.Vector3(0, 0, 0));

    // the song whose info is being displayed in the PointWindow element
    const [boxSong, setBoxSong] = useState(null);

    // true if the nebula is being displayed.
    const [displaying, setDisplaying] = useState(false); 

    // the song that was clicked on last (for simulating double click)
    const [preselectedInstance, setPreselectedInstance] = useState(null);

    // song at which the camera is looking --- changed by double click
    const [cameraTarget, setCameraTarget] = useState(new THREE.Vector3(-1, -1, 0))

    const [loading, setLoading] = useState(false);

    const addCurrent = (data) => {
        if (data.filter(song => song.id === displaySong.id).length === 0) {
            console.log('Song not in nebula!')
            return [...data, {
                spotify_id: displaySong.id,
                preview_url: displaySong.preview_url ? displaySong.preview_url : '',
                image_url: displaySong.image_url,
                artist_names: displaySong.artist_names,
                x: displaySong[selected[0]],
                y: displaySong[selected[1]],
                z: displaySong[selected[2]],
                cluster: displaySong.cluster
            }]
        }

        return data

    }

    // get new data only when three new (different) axis are selected.
    useEffect(() => {
        if (selected.length == 3 && ([...selected].sort().join(',') != [...oldSelected].sort().join(','))) {
            setDisplaying(true);
            setOldSelected([...selected]);
            setLoading(true);
            axios({
                method: 'get',
                url: `/api/spotify/nebula/previews?axis1=${selected[0]}&axis2=${selected[1]}&axis3=${selected[2]}`,
            }).then(res => {
                console.log(res.data.length);
                console.log(`x: ${res.data[0].x}, y: ${res.data[0].y}, z: ${res.data[0].z}`);

                return addCurrent(res.data)
            })
                .then(data => {
                    setLoading(false);
                    setNebula(data);

                    if (!hasClusterNebula() && data) setClusterNebula(data);

                }).catch(err => console.log(err));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selected])

    const handleOnClick = (e) => {
        // simulating a double click --- move camera only on double click
        console.log('click')
        if (preselectedInstance === e.instanceId) {
            setCameraTarget(e.point)
            setPreselectedInstance(null);
            setId(nebula[e.instanceId].spotify_id);

        } else {
            setPreselectedInstance(e.instanceId)

            // double click necesarily follows a single click
            setBoxSong(nebula[e.instanceId]);
            setSelectedPosition(e.point);
        }
    }

    return (
        <div className="nebulaContainer">
            {(nebula && nebula.length > 0) &&
                <Canvas
                    linear
                    gl={{ antialias: true, alpha: false, toneMapping: THREE.ReinhardToneMapping }}
                    camera={{ position: [-1, -1, 15], near: 0.1, far: 100, zoom: 1.5 }}>
                    <ambientLight intensity={2} />
                    <Points data={nebula} selected={oldSelected} id={id} onClick={handleOnClick} />
                    <OrbitControls target={cameraTarget} />
                    <SelectionCursor position={selectedPosition} ref={selectedBoxRef} song={boxSong} />
                    {displaying &&
                        <mesh position={[7, 0, 0]}>
                            <Html>
                                <h3>{oldSelected[0]} +</h3>
                            </Html>
                        </mesh>
                    }

                    {displaying &&
                        <mesh position={[0, 7, 0]}>
                            <Html>
                                <h3>{oldSelected[1]} +</h3>
                            </Html>
                        </mesh>
                    }

                    {displaying &&
                        <mesh position={[0, 0, 7]}>
                            <Html>
                                <h3>{oldSelected[2]} +</h3>
                            </Html>
                        </mesh>
                    }



                </Canvas>}

                {loading && 
                <div className='loaderContainer'>
                <Loader type="Bars" height='200' width='200' color='blue' visible='true'/>
                </div>
            }
        </div>
    )
}
