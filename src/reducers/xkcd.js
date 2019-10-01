import { XKCD_LATEST } from '../actions/xkcd';

const initialState = {
    episode: null
};

export default (state = initialState, action) => {
    switch (action.type) {
    case XKCD_LATEST:
        return {
            episode: action.payload.episode
        };
    default:
        return state;
    }
};
