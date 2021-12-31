import { atom, useRecoilState } from 'recoil';

const displaySongState = atom({
    key: 'displaySongState',
    default: JSON.parse("{\"_id\":\"61bb6c1e25fa0cb7b63f16d0\",\"spotify_id\":\"0ZPquQV2aKmDfwPjvMdvRp\",\"title\":\"Último Romance\",\"artists\":[\"7Brxri4l1ATShikyHXsEr6\"],\"artist_names\":[\"Los Hermanos\"],\"duration_ms\":263440,\"date_added\":1639672862978,\"image_url\":\"https://i.scdn.co/image/ab67616d0000b273376d029f01458b3e714603b1\",\"preview_url\":\"https://p.scdn.co/mp3-preview/8ffc91a6e7b643cebdeb09a68adee195dac7804c?cid=3e61ba5da3304d17b04cee1e11d3f643\",\"song_url\":\"https://open.spotify.com/track/0ZPquQV2aKmDfwPjvMdvRp\",\"album\":\"Ventura\",\"danceability\":0.406,\"energy\":0.665,\"key\":3,\"loudness\":-6.264,\"mode\":0,\"speechiness\":0.0286,\"acousticness\":0.509,\"instrumentalness\":0.000641,\"liveness\":0.112,\"valence\":0.553,\"tempo\":159.997,\"popularity\":60,\"__v\":0,\"cluster\":4}")
})

const useDisplaySong = () => {
    const [displaySong, setDisplaySong] = useRecoilState(displaySongState);

    return { displaySong, setDisplaySong }
}

export default useDisplaySong;