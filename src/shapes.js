import PropTypes from 'prop-types';

export const Episode = PropTypes.shape({
    title: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired
});

export default {
    Episode
};
