import React from 'react';
import { shallow } from 'enzyme';

import { AComponent } from '../index';

describe('AComponent', () => {
    it('should render its contents (or whatever is happening with that component)', () => {
        const aComponent = shallow(<AComponent />);
        const xkcd = aComponent.find('[data-testid="xkcd"]');

        expect(xkcd).toHaveLength(1);
    });
});
