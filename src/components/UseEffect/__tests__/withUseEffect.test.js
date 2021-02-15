import React from 'react';
import PropTypes from 'prop-types';
import { mount } from 'enzyme';

import withUseEffect from '../withUseEffect';

function SomeComponent({ name }) {
    return <div data-testid='name'>{ name }</div>;
}

SomeComponent.propTypes = {
    name: PropTypes.string.isRequired
};

const defaultProps = { name: 'John Rambo' };

function render(hookDependencies, props = defaultProps) {
    const WrappedComponent = withUseEffect(hookDependencies, SomeComponent);

    return mount(<WrappedComponent { ...props } />);
}

describe('withUseEffect higher order function', () => {
    it('should return a wrapped component, one that was passed, for which the useEffect hook will be used', () => {
        const hookConfig = { actionName: 'fetchSomething' };
        const props = {
            ...defaultProps,
            fetchSomething: jest.fn()
        };
        const wrappedComponent = render(hookConfig, props);
        const name = wrappedComponent.find('[data-testid="name"]').text();

        expect(name).toEqual(defaultProps.name);
    });

    it('should call the action using hook', () => {
        const hookConfig = { actionName: 'fetchSomething' };
        const props = {
            ...defaultProps,
            fetchSomething: jest.fn()
        };

        render(hookConfig, props);

        expect(props.fetchSomething).toHaveBeenCalled();
        expect(props.fetchSomething).toHaveBeenCalledTimes(1);
    });

    describe('when a prop change, that the useEffect depends on', () => {
        it('should call the action again', () => {
            const hookDependencies = {
                actionName: 'fetchSomething',
                dependantPropNames: [ 'name' ]
            };
            const props = {
                ...defaultProps,
                name: 'John Rambo',
                fetchSomething: jest.fn()
            };
            const wrappedComponent = render(hookDependencies, props);

            expect(props.fetchSomething).toHaveBeenCalledTimes(1);

            wrappedComponent.setProps({ name: 'Arnold S.' });

            expect(props.fetchSomething).toHaveBeenCalledTimes(2);
        });
    });

    describe('when a prop that the useEffect depends on does NOT change', () => {
        it('should call the action once', () => {
            const hookDependencies = {
                actionName: 'fetchSomething',
                dependantPropNames: [ 'name' ]
            };
            const props = {
                ...defaultProps,
                fetchSomething: jest.fn()
            };
            const wrappedComponent = render(hookDependencies, props);

            expect(props.fetchSomething).toHaveBeenCalledTimes(1);

            wrappedComponent.setProps({ name: props.name });

            expect(props.fetchSomething).toHaveBeenCalledTimes(1);
        });
    });

    it('should call another action on cleanup', () => {
        const hookDependencies = {
            actionName: 'fetchSomething',
            cleanupActionName: 'byeBye',
            dependantPropNames: [ 'name' ]
        };
        const props = {
            ...defaultProps,
            fetchSomething: jest.fn(),
            byeBye: jest.fn()
        };
        const wrappedComponent = render(hookDependencies, props);

        wrappedComponent.unmount();

        expect(props.byeBye).toHaveBeenCalled();
        expect(props.byeBye).toHaveBeenCalledTimes(1);
    });

    it('should pass all of the actions and dependant props to rendered component', () => {
        const hookDependencies = {
            actionName: 'fetchSomething',
            cleanupActionName: 'byeBye',
            dependantPropNames: [ 'name' ]
        };
        const props = {
            ...defaultProps,
            fetchSomething: jest.fn(),
            byeBye: jest.fn()
        };
        const wrappedComponent = render(hookDependencies, props);
        const { name, fetchSomething, byeBye } = wrappedComponent.props();

        expect(name).toEqual(props.name);
        expect(fetchSomething).toEqual(props.fetchSomething);
        expect(byeBye).toEqual(props.byeBye);
    });

    describe('if you want to have independent usages of each effect (and e.g. store them as modules)', () => {
        it('should be possible', () => {
            const hookDependencies1 = { actionName: 'fetchSomething1' };
            const hookDependencies2 = { actionName: 'fetchSomething2' };
            const props = {
                ...defaultProps,
                fetchSomething1: jest.fn(),
                fetchSomething2: jest.fn()
            };

            const fetchSomething1 = (Component) => withUseEffect(hookDependencies1, Component);
            const fetchSomething2 = (Component) => withUseEffect(hookDependencies2, Component);

            // use pipe if you want to stack more hooks nicer
            const WrappedComponent = fetchSomething2(fetchSomething1(SomeComponent));

            mount(<WrappedComponent { ...props } />);

            expect(props.fetchSomething1).toHaveBeenCalled();
            expect(props.fetchSomething1).toHaveBeenCalledTimes(1);

            expect(props.fetchSomething2).toHaveBeenCalled();
            expect(props.fetchSomething2).toHaveBeenCalledTimes(1);

            expect(props.fetchSomething1).toHaveBeenCalledBefore(props.fetchSomething2);
        });

        it('should still return a wrapped component', () => {
            const hookDependencies1 = { actionName: 'fetchSomething1' };
            const hookDependencies2 = { actionName: 'fetchSomething2' };
            const props = {
                ...defaultProps,
                fetchSomething1: jest.fn(),
                fetchSomething2: jest.fn()
            };

            const fetchSomething1 = (Component) => withUseEffect(hookDependencies1, Component);
            const fetchSomething2 = (Component) => withUseEffect(hookDependencies2, Component);

            const WrappedComponent = fetchSomething2(fetchSomething1(SomeComponent));

            const wrappedComponent = mount(<WrappedComponent { ...props } />);
            const name = wrappedComponent.find('[data-testid="name"]').text();

            expect(name).toEqual(defaultProps.name);
        });
    });
});
