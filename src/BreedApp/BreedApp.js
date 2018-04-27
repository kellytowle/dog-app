import React, { Component } from 'react';
import PropTypes from 'prop-types';
import fetchJSON from '../fetch';
import BreedList from "../BreedList/BreedList";
import DogBreed from "../DogBreed/DogBreed";

class BreedApp extends Component {
    state = {
        breedsJSON: null,
        selectedBreed: "",
        activeView: "list"
    }

    componentDidMount() {
        this.fetchBreeds();
    }

    fetchBreeds() {
        return fetchJSON("https://dog.ceo/api/breeds/list/all")
            .then(jsonData => {
                this.setState({
                    breedsJSON: jsonData.message
                });
            })
            .catch(reason => {
                console.error("Failed to fetch breeds list; error: %o", reason);
            });
    }

    chooseBreed(event) {
        console.log("Chose breed event in BreedApp component: %o", event.target.value);
        if(event.target.attributes["data-breed-key"].value !== "--") {
            this.setState({
                selectedBreed: event.target.attributes["data-breed-key"].value,
                activeView: "photo"
            });
        }
    }

    render() {
        return (
            <main>
                <section data-view="list" data-is-active={this.state.activeView === "list"}>
                    <h1>Dog Gallery</h1>
                    <BreedList
                        breedsJSON={this.state.breedsJSON}
                        selectBreed={this.chooseBreed.bind(this)}
                    />
                </section>
                <section data-view="breed" data-is-active={this.state.activeView === "photo"}>
                    <DogBreed
                        breedKey={this.state.selectedBreed}
                        selectBreed={() => this.setState({ activeView: "list" })}
                    />
                </section>
            </main>
        )
    }

};

BreedApp.stateTypes = {
    breedsJSON: PropTypes.object.isRequired,
    selectedBreed: PropTypes.string.isRequired,
    activeView: PropTypes.oneOf(["list","photo"])
};

export default BreedApp;