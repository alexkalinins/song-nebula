import { atom, useRecoilState } from 'recoil';

const displaySongState = atom({
    key: 'displaySongState',
    default: null
})

const useDisplaySong = () => {
    const [displaySong, setDisplaySong] = useRecoilState(displaySongState);

    return { displaySong, setDisplaySong }
}

export default useDisplaySong;