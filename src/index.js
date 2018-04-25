import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './_boilerplate/App';
import registerServiceWorker from './registerServiceWorker';
import BreedList from "./BreedList/BreedList";

ReactDOM.render(<BreedList />, document.getElementById('root'));
registerServiceWorker();
