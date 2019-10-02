import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { latest } from '../../actions/xkcd';
import Xkcd from '../Xkcd';

const byeBye = () => console.log('Bye bye!');

export default function UseEffectComponent({ anAction = latest, cleanupAction = byeBye, dependantProp }) {
    useEffect(() => {
        anAction();

        return cleanupAction;
    }, [ dependantProp ]);

    return <Xkcd />;
}

UseEffectComponent.propTypes = {
    anAction: PropTypes.func.isRequired,
    cleanupAction: PropTypes.func.isRequired,
    dependantProp: PropTypes.string.isRequired
};
