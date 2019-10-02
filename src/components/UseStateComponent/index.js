import React, { useState } from 'react';

import Xkcd from '../Xkcd';

export default function UseStateComponent() {
    const [ value, setValue ] = useState(0);
    const increment = () => setValue(value + 1);

    return (
        <React.Fragment>
            <Xkcd />
            <div data-testid='value'>{ value }</div>
            <button onClick={ increment } />
        </React.Fragment>
    );
}
