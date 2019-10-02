import { connect } from 'react-redux';

import Episode from './Episode';

export const mapStateToProps = (state) => ({
    episode: state.xkcd.episode
});

export default connect(mapStateToProps)(Episode);
