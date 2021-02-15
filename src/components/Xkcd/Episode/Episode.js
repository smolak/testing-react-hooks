import React from 'react';

import shapes from '../../../shapes';

export default function Episode({ episode }) {
    return (
        <section>
            <h3>Title: { episode.title }</h3>
            <img src={ episode.img } alt={ episode.alt }/>
        </section>
    );
}

Episode.propTypes = {
    episode: shapes.Episode
};
