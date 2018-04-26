import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BreedList from "../BreedList/BreedList";
import DogBreed from "../DogBreed/DogBreed";

class BreedApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            breedsList: null,
            breedOptions: [],
            selectedBreed: "",
            activeView: "list"
        };
        this.fetchBreeds();
    }

    fetchBreeds() {
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
                this.getBreedsOptionsList();
            })
            .catch(reason => {
                console.error("Failed to fetch breeds list; error: %o", reason);
            });
    }

    getBreedsOptionsList() {
        let returnArr = [];
        const renderOption = (breed, parentBreed, depth=0) => {
            // TODO: All 3 of these need to become props on DogBreed
            const formattedBreedName = `${breed.substr(0,1).toUpperCase()}${breed.substr(1)}`,
                breedKey = parentBreed ? `${parentBreed}-${breed}` : breed, // TODO: This breedKey maps to the API calls
                uiLabel = formattedBreedName.padStart((2 * depth) + formattedBreedName.length, "-");

            returnArr.push(<option key={breedKey} value={breedKey}>{uiLabel}</option>);

            // If there are sub-breeds, recurse
            if (this.state.breedsList[breed] && this.state.breedsList[breed].length > 0) {
                this.state.breedsList[breed].forEach(el => renderOption(el, breed, depth + 1));
            }
        };

        for(let breed in this.state.breedsList) {
            renderOption(breed);
        }

        this.setState({
            breedOptions: returnArr
        });
    }


    chooseBreed(event) {
        console.log("Chose breed event in BreedApp component: %o", event.target.value);
        this.setState({
            selectedBreed: event.target.value,
            activeView: "photo"
        });
    }

    render() {
        return (
            <main>
                <section data-view="list" data-is-active={this.state.activeView === "list"}>
                    <BreedList
                        breedOptions={this.state.breedOptions}
                        selectBreed={this.chooseBreed.bind(this)}
                    />
                    <button>View Selected Breed</button>
                </section>
                <section data-view="breed" data-is-active={this.state.activeView === "photo"}>
                    <DogBreed breedKey={this.state.selectedBreed}/>
                </section>
            </main>
        )
    }

};

BreedApp.stateTypes = {
    breedsList: PropTypes.array.isRequired,
    selectedBreed: PropTypes.string.isRequired,
    activeView: PropTypes.oneOf(["list","photo"])
};

export default BreedApp;