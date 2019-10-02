import { XKCD_LATEST, XKCD_FETCH_STATUS } from '../actions/xkcd';

const initialState = {
    episode: null,
    fetchStatus: null
};

export default (state = initialState, action) => {
    switch (action.type) {
    case XKCD_LATEST:
        return {
            ...state,
            episode: action.payload.episode
        };
    case XKCD_FETCH_STATUS:
        return {
            ...state,
            fetchStatus: action.payload.fetchStatus
        };
    default:
        return state;
    }
};
