import React from 'react';
import PropTypes from 'prop-types';

export default function Xkcd({ episode, fetchLatestEpisode }) {
    function renderEpisode() {
        return (
            <section>
                <h3>Latest episode: { episode.title }</h3>
                <img src={ episode.img } alt={ episode.alt } />
            </section>
        );
    }

    return (
        <section>
            <h2>XKCD</h2>
            <button onClick={ fetchLatestEpisode }>Get latest</button>
            { episode ? renderEpisode() : null }
        </section>
    )
}

Xkcd.propTypes = {
    episode: PropTypes.shape({
        title: PropTypes.string.isRequired,
        img: PropTypes.string.isRequired,
        alt: PropTypes.string.isRequired
    }),
    fetchLatestEpisode: PropTypes.func.isRequired
};
