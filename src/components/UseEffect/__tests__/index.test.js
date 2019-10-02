import React from 'react';
import { mount } from 'enzyme';

import UseEffectComponent from '../index';

describe('UseEffectComponent', () => {
    describe.only('when enzyme\'s mount is used', () => {
        // Need to mute jsdom's and react-dom's console.error that is logged when this mount fails.
        // All we want is to test it throws, and all other noise to be canceled out.
        let __logError = console.error;

        beforeEach(() => console.error = () => {});
        afterEach(() => console.error = __logError);

        it('should throw', () => {
            const errorMessage = 'Could not find "store" in the context of "Connect(Xkcd)". Either wrap the root ' +
                'component in a <Provider>, or pass a custom React context provider to <Provider> and the ' +
                'corresponding React context consumer to Connect(Xkcd) in connect options.';

            expect(() => mount(<UseEffectComponent />)).toThrow(errorMessage);
        });
    });

    it('should call the action passed in props', () => {
         const props = {
             anAction: jest.fn(),
             cleanupAction: jest.fn(),
             dependantProp: 'value'
         };

         mount(<UseEffectComponent { ...props } />);

         expect(props.anAction).toHaveBeenCalled();
    });

    describe('when a prop that the useEffect depends on changes', () => {
        it('should call the action twice', () => {
            const props = {
                anAction: jest.fn(),
                cleanupAction: jest.fn(),
                dependantProp: 'value'
            };

            const useEffectComponent = mount(<UseEffectComponent { ...props } />);

            expect(props.anAction).toHaveBeenCalledTimes(1);

            useEffectComponent.setProps({ dependantProp: 'new value' });

            expect(props.anAction).toHaveBeenCalledTimes(2);
        });
    });

    describe('when a prop that the useEffect depends on does NOT change', () => {
        it('should call the action once', () => {
            const props = {
                anAction: jest.fn(),
                cleanupAction: jest.fn(),
                dependantProp: 'value'
            };

            const useEffectComponent = mount(<UseEffectComponent { ...props } />);

            expect(props.anAction).toHaveBeenCalledTimes(1);

            useEffectComponent.setProps({ dependantProp: 'value' });

            expect(props.anAction).toHaveBeenCalledTimes(1);
        });
    });

    it('should call another action on cleanup', () => {
        const props = {
            anAction: jest.fn(),
            cleanupAction: jest.fn(),
            dependantProp: 'value'
        };

        const useEffectComponent = mount(<UseEffectComponent { ...props } />);

        useEffectComponent.unmount();

        expect(props.cleanupAction).toHaveBeenCalledTimes(1);
    });
});
