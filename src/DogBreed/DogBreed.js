import React, { Component } from 'react';
import PropTypes from 'prop-types';

class DogBreed extends Component {
    // Initially wanted to make this a stateless functional component, however more than that I want the preserve the
    // ability to deliberately cycle through the images in order, to prevent from seeing the same image twice before
    // having seen all others for the same breed.  For this, I need to maintain an instance variable of the current
    // photo index, so I'll need state & the `this` scope at this level.

    constructor(props) {
        super(props);
        this.fetchImagesList();
        this.fetchImage(true);
    }

    fetchImagesList() {

    }

    fetchImage(isRandom=false) {

    }

    render() {

    }

};

DogBreed.propTypes = {
    name: PropTypes.string.isRequired,
    breedKey: PropTypes.string.isRequired,
    subBreedKey: PropTypes.string
};

export default DogBreed;