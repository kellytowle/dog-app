import React from 'react';
import ReactDOM from 'react-dom';
import './BreedApp/BreedApp.css';

import registerServiceWorker from './registerServiceWorker';
import BreedApp from "./BreedApp/BreedApp";

ReactDOM.render(<BreedApp />, document.getElementById('root'));
registerServiceWorker();
