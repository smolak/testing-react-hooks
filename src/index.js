import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';

import './index.css';
import Root from './components/Root';
import { createStoreEnhancer } from './store';
import reducers from './reducers';
import { latest } from './apis/xkcd';

const api = {
    xkcd: {
        latest
    }
};

const storeEnhancer = createStoreEnhancer(api);
const store = createStore(reducers, storeEnhancer);

const props = {
    store
};

ReactDOM.render(<Root { ...props } />, document.getElementById('root'));

