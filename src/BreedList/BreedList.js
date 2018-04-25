import React, { Component } from 'react';
import PropTypes from 'prop-types';

class BreedList extends Component {
    // Initially wanted to make this a stateless functional component, however more than that I want the preserve the
    // ability to deliberately cycle through the images in order, to prevent from seeing the same image twice before
    // having seen all others for the same breed.  For this, I need to maintain an instance variable of the current
    // photo index, so I'll need state & the `this` scope at this level.

    constructor(props) {
        super(props);
        this.state = {
            breedsList: null,
            selectedBreed: null
        };
        this.fetchBreedsList();
    }

    fetchBreedsList() {
        return fetch("https://dog.ceo/api/breeds/list/all")
            .then(response => {
                return response.json();
            })
            .then(jsonData => {
                console.log("Fetched breeds list: %o", jsonData.message);
                this.setState({
                    breedsList: jsonData.message,
                    selectedBreed: Object.keys(jsonData.message)[0]
                });
            })
            .catch(reason => {
                console.error("Failed to fetch breeds list; error: %o", reason);
            });
    }

    chooseBreed(event) {
        console.log("Chose breed event: %o", event.target.value);
        this.setState({
            selectedBreed: event.target.value
        });
    }

    getBreedsOptionsList() {
        let returnArr = [];
        const renderOption = (breed, parentBreed, depth=0) => {
            const formattedBreedName = `${breed.substr(0,1).toUpperCase()}${breed.substr(1)}`,
                breedKey = parentBreed ? `${parentBreed}_${breed}` : breed;
            returnArr.push(<option value={breedKey} key={breedKey}>{
                formattedBreedName.padStart((2 * depth) + formattedBreedName.length, "-")
            }</option>);

            if (this.state.breedsList[breed] && this.state.breedsList[breed].length > 0) {
                this.state.breedsList[breed].forEach(el => renderOption(el, breed, depth + 1));
            }
        };

        for(let breed in this.state.breedsList) {
            renderOption(breed);
        }
        return returnArr;
    }

    render() {
        return (
            <select onChange={(evt) => this.chooseBreed(evt)}>
                {this.getBreedsOptionsList()}
            </select>
        )
    }

};

BreedList.stateTypes = {
    breedsList: PropTypes.array.isRequired,
    selectedBreed: PropTypes.string.isRequired,
};

export default BreedList;