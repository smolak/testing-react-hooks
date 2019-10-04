import React from 'react';

import Episode from '../Xkcd/Episode/Episode';
import shapes from '../../shapes';

export function AComponent({ episode }) {
    return episode ? <Episode data-testid='episode' episode={ episode } /> : null;
}

AComponent.propTypes = {
    episode: shapes.Episode
};
