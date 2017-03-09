import React, {PropTypes} from 'react';
import noop from '../util/noop';

const Marker = ({id, onOpen}) => <span className="marker" onClick={() => onOpen(id)}>►</span>;

Marker.propTypes = {
    id: PropTypes.number,
    onOpen: PropTypes.func
};

Marker.defaultProps = {
    id: undefined,
    onOpen: noop
};

export default Marker;
