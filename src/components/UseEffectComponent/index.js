import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

export default function UseEffectComponent({ anAction, cleanupAction, dependantProp }) {
    useEffect(() => {
        anAction();

        return cleanupAction;
    }, [ dependantProp ]);

    return <div>Anything</div>;
}

UseEffectComponent.propTypes = {
    anAction: PropTypes.func.isRequired,
    cleanupAction: PropTypes.func.isRequired,
    dependantProp: PropTypes.string.isRequired
};
