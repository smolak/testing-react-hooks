import withUseEffect from './withUseEffect';
import { latest } from '../../actions/xkcd';

import AComponent from './AComponent';

export default withUseEffect(
    { actionName: 'latest', cleanupActionName: 'byeBye', dependantPropNames: [ 'episode '] },
    AComponent
);
