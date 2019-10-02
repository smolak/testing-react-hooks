import React from 'react';
import { mount } from 'enzyme';

import UseEffectComponent from '../index';

describe('UseEffectComponent', () => {
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
