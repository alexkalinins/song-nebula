import { atom, useRecoilState } from 'recoil';

const selectedState = atom({
    key: 'selectedState',
    default: []
});

/**
 * Hook for the global state of the selected features used for visualization. Only three or less features
 * can be selected at any time.
 * @returns the selected state and a function for setting selected state.
 */
const useFeatures = () => {
    const [selected, setSelected] = useRecoilState(selectedState);

    /**
     * If feature can be selected (less than 3 already selected) then selects.
     * @param {string} feature the being selected
     * @returns true if feature was selected, false if not selected
     */
    const onSelect = (feature) => {
        if(selected.length<3){
            setSelected([...selected, feature].sort());
            return true;
        }
        return false;
    };

    /**
     * Removes feature from the list of selected features.
     * @param {string} feature feature being deselected
     * @returns true always
     */
    const onDeselect = (feature) => {
        setSelected(selected.filter(f => f != feature));
        return true;
    };

    return {
        selected,
        onSelect,
        onDeselect,
    };
}

export default useFeatures;