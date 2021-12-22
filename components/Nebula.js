import React, { useEffect, useRef, useState, useMemo } from 'react'
import useId from '../hooks/useId';
import useFeatures from '../hooks/useFeatures';
import axios from 'axios';
import * as THREE from 'three';

import { Canvas } from '@react-three/fiber'
import { OrbitControls, Html } from '@react-three/drei'
import PointWindow from './PointWindow';


const tempObject = new THREE.Object3D()
const tempColor = new THREE.Color()


const COLORS = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6',
    '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
    '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A',
    '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
    '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC',
    '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
    '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680',
    '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
    '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3',
    '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];

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

        const x = normalize(selected[0]);
        const y = normalize(selected[1]);
        const z = normalize(selected[2]);

        for (let i in data) {
            tempObject.position.set(x[i], y[i], z[i])
            tempObject.scale.setScalar(data[i].spotify_id == id ? 5 : 1);
            tempObject.updateMatrix();
            meshRef.current.setMatrixAt(i, tempObject.matrix);
        }
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
    const { id } = useId();
    const { selected } = useFeatures();
    const [selectedPosition, setSelectedPosition] = useState(new THREE.Vector3(0, 0, 0));
    const selectedBoxRef = useRef()
    const [nebula, setNebula] = useState([]);
    const [oldSelected, setOldSelected] = useState([])

    const [boxSong, setBoxSong] = useState(null);

    useEffect(() => {
        if (selected.length == 3 && selected != oldSelected) {
            setOldSelected(selected);
            axios({
                method: 'get',
                url: `/api/spotify/nebula/previews?axis1=${selected[0]}&axis2=${selected[1]}&axis3=${selected[2]}`,
            }).then(res => {
                console.log(res.data.length);
                console.log(res.data[0]);
                console.log(`x: ${res.data[0][selected[0]]}, y: ${res.data[0][selected[1]]}, z: ${res.data[0][selected[2]]}`);
                setNebula(res.data);
            }).catch(err => console.log(err));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, selected])

    const handleOnClick = (e) => {
        setSelectedPosition(e.point);
        setBoxSong(nebula[e.instanceId]);
        console.log(nebula[e.instanceId]);
    }

    return (
        <div className="nebulaContainer">
            {nebula.length > 0 &&
                <Canvas
                    linear
                    gl={{ antialias: false, alpha: false }}
                    camera={{ position: [0, 0, 15], near: 0.5, far: 20 }}>
                    <ambientLight />
                    <axisHelper />
                    <Points data={nebula} selected={selected} id={id} onClick={handleOnClick} />
                    <OrbitControls />
                    <SelectionCursor position={selectedPosition} ref={selectedBoxRef} song={boxSong} />
                    <mesh position={[7, 0, 0]}>
                        <Html>
                            <h3>{selected[0]} +</h3>
                        </Html>
                    </mesh>
                    <mesh position={[0, 7, 0]}>
                        <Html>
                            <h3>{selected[1]} +</h3>
                        </Html>
                    </mesh>
                    <mesh position={[0, 0, 7]}>
                        <Html>
                            <h3>{selected[2]} +</h3>
                        </Html>
                    </mesh>
                </Canvas>}
        </div>
    )
}
