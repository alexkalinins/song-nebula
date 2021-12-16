import { atom, useRecoilState } from 'recoil';

const idState = atom({
    key: 'idState',
    default: "0ZPquQV2aKmDfwPjvMdvRp" 
});

/**
 * Hook for the global state of the Spotify ID being displayed.
 * 
 * @returns the id and a function for setting id.
 */
const useId = () => {
    const [id, setIdState] = useRecoilState(idState);

    /**
     * Sets the id state
     * @param {string} newId the new id
     */
    const setId = (newId) => {
        setIdState(newId);
    };

    return {
        id,
        setId
    };
}

export default useId;