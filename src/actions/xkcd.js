import { FETCH_STATUSES } from '../constants';

export const XKCD_LATEST = 'XKCD_LATEST';
export const XKCD_FETCH_STATUS = 'XKCD_FETCH_STATUS';

export const latest = () => async (dispatch, _, { api: { xkcd } }) => {
    dispatch({
        type: XKCD_FETCH_STATUS,
        payload: {
            fetchStatus: FETCH_STATUSES.PENDING
        }
    });

    try {
        const latestEpisode = await xkcd.latest();

        dispatch({
            type: XKCD_LATEST,
            payload: {
                episode: latestEpisode
            }
        });
        dispatch({
            type: XKCD_FETCH_STATUS,
            payload: {
                fetchStatus: FETCH_STATUSES.SUCCESS
            }
        });
    } catch (_) {
        dispatch({
            type: XKCD_FETCH_STATUS,
            payload: {
                fetchStatus: FETCH_STATUSES.FAILURE
            }
        });
    }
};
