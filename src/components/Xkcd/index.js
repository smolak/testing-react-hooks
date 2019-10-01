import { connect } from 'react-redux';

import { latest } from '../../actions/xkcd';

import Xkcd from './Xkcd';

export const mapStateToProps = (state) => ({
    episode: state.xkcd.episode
});

export const mapDispatchToProps = {
    fetchLatestEpisode: latest
};

export default connect(mapStateToProps, mapDispatchToProps)(Xkcd);
