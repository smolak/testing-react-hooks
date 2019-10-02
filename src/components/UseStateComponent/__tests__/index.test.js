import React from 'react';
import { shallow, mount } from 'enzyme';

import UseStateComponent from '../index';

describe('UseStateComponent', () => {
    describe('when enzyme\'s mount is used', () => {
        // Need to mute jsdom's and react-dom's console.error that is logged when this mount fails.
        // All we want is to test it throws, and all other noise to be canceled out.
        let __logError = console.error;

        beforeEach(() => console.error = () => {});
        afterEach(() => console.error = __logError);

        it('should throw', () => {
            const errorMessage = 'Could not find "store" in the context of "Connect(Xkcd)". Either wrap the root ' +
                'component in a <Provider>, or pass a custom React context provider to <Provider> and the ' +
                'corresponding React context consumer to Connect(Xkcd) in connect options.';

            expect(() => mount(<UseStateComponent/>)).toThrow(errorMessage);
        });
    });

    it('should render with counter at default value (taken from state)', () => {
        const useStateComponent = shallow(<UseStateComponent />);
        const value = useStateComponent.find('[data-testid="value"]').text();

        expect(value).toEqual('0');
    });

    it('should increment the value when button is clicked (using callback from useState hook)', () => {
        const useStateComponent = shallow(<UseStateComponent />);
        const button = useStateComponent.find('button');

        button.simulate('click');

        const value = useStateComponent.find('[data-testid="value"]').text();

        expect(value).toEqual('1');
    });
});
