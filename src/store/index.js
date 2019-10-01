import thunk from 'redux-thunk';
import { applyMiddleware, compose } from 'redux';

export const createStoreEnhancer = (api) => {
    const thunkMiddleware = thunk.withExtraArgument({ api });
    const enhancers = [ applyMiddleware(thunkMiddleware) ];

    if (window.__REDUX_DEVTOOLS_EXTENSION__) {
        enhancers.push(window.__REDUX_DEVTOOLS_EXTENSION__());
    }

    return compose(...enhancers);
};
