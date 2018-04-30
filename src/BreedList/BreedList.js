import React from 'react';
import PropTypes from 'prop-types';

const BreedList = (props) => {
    function getBreedsList() {
        let returnArr = [];
        const createItem = (breed, parentBreed, depth=0) => {
            const formattedBreedName = `${breed.substr(0,1).toUpperCase()}${breed.substr(1)}`,
                breedKey = parentBreed ? `${parentBreed}-${breed}` : breed, // TODO: This breedKey maps to the API calls
                uiLabel = formattedBreedName.padStart((2 * depth) + formattedBreedName.length, "-");

            let className = "";

            if(!parentBreed && breed === props.selectedBreed) {
                className = "selected";
            } else if (`${parentBreed}-${breed}` === props.selectedBreed) {
                className = "selected";
            }

            returnArr.push(<li key={breedKey} data-breed-key={breedKey} className={className} onClick={props.chooseBreed}>{uiLabel}</li>);

            // If there are sub-breeds, recurse
            if (props.breedsJSON[breed] && props.breedsJSON[breed].length > 0) {
                props.breedsJSON[breed].forEach(el => createItem(el, breed, depth + 1));
            }
        };

        for(let breed in props.breedsJSON) {
            createItem(breed);
        }

        return returnArr;
    }

    return (
            <ul>
                {getBreedsList()}
            </ul>
        )
};

BreedList.propTypes = {
    chooseBreed: PropTypes.func.isRequired,
    selectedBreed: PropTypes.string,
    breedsJSON: PropTypes.object
};

export default BreedList;