import React from 'react';
import PropTypes from 'prop-types';

const BreedList = (props) => {
        return (
            <select onChange={props.selectBreed}>
                {props.breedOptions}
            </select>
        )
};

BreedList.propTypes = {
    selectBreed: PropTypes.func.isRequired,
    breedOptions: PropTypes.array
};

export default BreedList;