import React, { Component } from 'react';
import Loafing from '../loafing.png';
import fetchJSON from '../fetch';
import PropTypes from 'prop-types';

class DogBreed extends Component {
    // Initially wanted to make this a stateless functional component, however more than that I want to preserve the
    // ability to deliberately cycle through the images in order, to prevent users seeing the same image twice before
    // having seen all others for the same breed.  For this, I need to maintain an instance variable of the current
    // photo index; I've opted to keep that state here vs. at the top (app) level, and thus am managing the other
    // relevant state properties here as well.

    constructor(props) {
        super(props);
        this.state = {
            breedPhotos: {
                // urls: [],
                // currentPhotoIndex:0
            },
            isLoading: true
        };
    }

    fetchImagesList() {
        const key = this.props.breedKey;
        if(key && (!this.state.breedPhotos[key] || this.state.breedPhotos[key].urls.length === 0)) {
            let baseUrl = "https://dog.ceo/api/breed/",
                breedSplit = key.split('-'),
                fullUrl = `${baseUrl}${breedSplit.join('/')}/images`;

            return fetchJSON(fullUrl)
                .then(imgUrls => {
                    let newBreedPhotos = this.state.breedPhotos;

                    newBreedPhotos[this.props.breedKey] = {
                        urls: imgUrls.message,
                        isLoading: true,
                        currentPhotoIndex: Math.floor(Math.random() * imgUrls.message.length)
                    };

                    this.setState({
                        breedPhotos: newBreedPhotos,
                    });
                })
                .catch(reason => {
                    console.error("Couldn't get image urls for breed; reason: %o", reason);
                });
        } else {
            return Promise.resolve();
        }
    }

    getClassAttribute() {
        if(this.state.isLoading) return "loading";
        return "";
    }

    getStyleAttribute() {
        const photos = this.state.breedPhotos[this.props.breedKey];

        let returnVal;
        if(this.state.isLoading) {
            returnVal = {
                backgroundImage: `url(${Loafing})`
            };
        } else {
            returnVal = {
                backgroundImage: `url(${photos.urls[photos.currentPhotoIndex]})`
            };
        }
        return returnVal;
    }

    incrementPhotoIndex() {
        this.setState({
            isLoading: true
        });
        const breedPhotos = this.state.breedPhotos,
            currentBreedPhotos = breedPhotos[this.props.breedKey];

        currentBreedPhotos.currentPhotoIndex = (currentBreedPhotos.currentPhotoIndex + 1) % currentBreedPhotos.urls.length;

        this.setState({
            breedPhotos: breedPhotos
        })
    }

    render() {
        const breedPhotos = this.state.breedPhotos[this.props.breedKey];
        if(breedPhotos && breedPhotos.urls.length > 0) {
            return (
                <div>
                    <h1>{this.props.breedKey.replace('-',', ')}</h1>
                    <div id="photo" className={this.getClassAttribute()} style={this.getStyleAttribute()} />
                    <img src={breedPhotos.urls[breedPhotos.currentPhotoIndex]} onLoad={(evt) => this.setState({
                        isLoading: false,
                        backgroundImage: breedPhotos.urls[breedPhotos.currentPhotoIndex]
                    })} />
                    <button onClick={this.incrementPhotoIndex.bind(this)}>Get new image of this breed</button>
                    <button onClick={() => {
                        this.props.selectBreed();
                        this.setState({
                            isLoading: true
                        });
                    }}>Select a different breed</button>
                </div>
            );
        } else {
            this.fetchImagesList();
            return (
                <div>
                    <h1>{this.props.breedKey}</h1>
                </div>
            );
        }
    }

};

DogBreed.propTypes = {
    breedKey: PropTypes.string.isRequired,
};

export default DogBreed;