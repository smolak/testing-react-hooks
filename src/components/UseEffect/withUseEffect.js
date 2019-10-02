import React from 'react';

export default function withUseEffect({ action, cleanupAction, dependantProp }, Component) {
    return function WrappedComponent(props) {
        React.useEffect(() => {
            action();

            return cleanupAction;
        }, [ action, cleanupAction, props[dependantProp] ]);
        return <Component { ...props } />;
    }
}
