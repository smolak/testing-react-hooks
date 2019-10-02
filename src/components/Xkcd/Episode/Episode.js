import React from 'react';
import PropTypes from 'prop-types';

export default function Episode({ episode }) {
    return (
        <section>
            <h3>Title: { episode.title }</h3>
            <img src={ episode.img } alt={ episode.alt }/>
        </section>
    );
}

Episode.propTypes = {
    episode: PropTypes.shape({
        title: PropTypes.string.isRequired,
        img: PropTypes.string.isRequired,
        alt: PropTypes.string.isRequired
    })
};
