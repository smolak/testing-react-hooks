import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';

import Xkcd from '../Xkcd';

export default class Root extends React.Component {
    static propTypes = {
        store: PropTypes.object.isRequired
    };

    render() {
        return (
            <Provider store={ this.props.store }>
                <Xkcd />
            </Provider>
        );
    }
}
