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

const props = { name: 'John Rambo' };

function render(hookDependencies) {
    const WrappedComponent = withUseEffect(hookDependencies, SomeComponent);

    return mount(<WrappedComponent { ...props } />);
}

describe('withUseEffect higher order function', () => {
    it('should return a wrapped component, one that was passed, for which the useEffect hook will be used', () => {
        const wrappedComponent = render({ action: () => {} });
        const name = wrappedComponent.find('[data-testid="name"]').text();

        expect(name).toEqual(props.name);
    });

    it('should call the action passed (can be changed to handle a collection of them)', () => {
        const hookDependencies = { action: jest.fn() };

        render(hookDependencies);

        expect(hookDependencies.action).toHaveBeenCalled();
    });

    describe('when a prop change, that the useEffect depends on', () => {
        it('should call the action again', () => {
            // The `dependantProp` can easily be extended to a list of props for which the useEffect
            // will call the action, should they (props) change.
            const hookDependencies = {
                action: jest.fn(),
                dependantProp: 'name'
            };
            const wrappedComponent = render(hookDependencies);

            expect(hookDependencies.action).toHaveBeenCalledTimes(1);

            wrappedComponent.setProps({ name: 'Arnold S.' });

            expect(hookDependencies.action).toHaveBeenCalledTimes(2);
        });
    });

    describe('when a prop that the useEffect depends on does NOT change', () => {
        it('should call the action once', () => {
            const hookDependencies = {
                action: jest.fn(),
                dependantProp: 'name'
            };
            const wrappedComponent = render(hookDependencies);

            expect(hookDependencies.action).toHaveBeenCalledTimes(1);

            wrappedComponent.setProps({ name: props.name });

            expect(hookDependencies.action).toHaveBeenCalledTimes(1);
        });
    });

    it('should call another action on cleanup', () => {
        const hookDependencies = {
            action: jest.fn(),
            dependantProp: 'name',
            cleanupAction: jest.fn()
        };
        const wrappedComponent = render(hookDependencies);

        wrappedComponent.unmount();

        expect(hookDependencies.cleanupAction).toHaveBeenCalledTimes(1);
    });

    it('should be possible to stack withUseEffect if you want to have independent usages of each effect', () => {
        const hookDependencies1 = { action: jest.fn() };
        const hookDependencies2 = { action: jest.fn() };
        const fetchSomething1 = (Component) => withUseEffect(hookDependencies1, Component);
        const fetchSomething2 = (Component) => withUseEffect(hookDependencies2, Component);

        // use pipe if you want to stack more hooks nicer
        const WrappedComponent = fetchSomething1(fetchSomething2(SomeComponent));

        mount(<WrappedComponent { ...props } />);

        expect(hookDependencies1.action).toHaveBeenCalledTimes(1);
        expect(hookDependencies2.action).toHaveBeenCalledTimes(1);
    });
});
