import React from 'react';
import PropTypes from 'prop-types';

import Episode from './Episode';

import { FETCH_STATUSES } from '../../constants';

export default function Xkcd({ fetchLatestEpisode, fetchStatus }) {
    return (
        <section>
            <h2>XKCD</h2>
            <button onClick={ fetchLatestEpisode }>Get latest</button>
            { fetchStatus === FETCH_STATUSES.PENDING ? <p>Loading...</p> : null }
            { fetchStatus === FETCH_STATUSES.SUCCESS ? <Episode /> : null }
            { fetchStatus === FETCH_STATUSES.FAILURE ? <p>Something went wrong, try again...</p> : null }
        </section>
    )
}

Xkcd.propTypes = {
    fetchLatestEpisode: PropTypes.func.isRequired,
    fetchStatus: PropTypes.oneOf(Object.values(FETCH_STATUSES))
};
