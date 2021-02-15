import React from 'react';

export default function withUseEffect({ actionName, cleanupActionName, dependantPropNames = [] }, Component) {
    return function WrappedComponent(props) {
        const action = props[actionName];
        const dependantProps = dependantPropNames.map((name) => props[name]);
        const cleanupAction = props[cleanupActionName];

        React.useEffect(() => {
            action();

            return cleanupAction;
        }, [ action, ...dependantProps ]);

        return <Component { ...props } />;
    }
}
