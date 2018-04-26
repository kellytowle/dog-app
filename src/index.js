import React from 'react';
import ReactDOM from 'react-dom';
import './BreedApp/BreedApp.css';
// import App from './_boilerplate/App';
import registerServiceWorker from './registerServiceWorker';
import BreedApp from "./BreedApp/BreedApp";

ReactDOM.render(<BreedApp />, document.getElementById('root'));
registerServiceWorker();
