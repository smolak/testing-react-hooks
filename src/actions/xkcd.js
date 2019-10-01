export const XKCD_LATEST = 'XKCD_LATEST';

export const latest = () => async (dispatch, _, { api: { xkcd } }) => {
    const latestEpisode = await xkcd.latest();

    dispatch({
        type: XKCD_LATEST,
        payload: {
            episode: latestEpisode
        }
    })
};
