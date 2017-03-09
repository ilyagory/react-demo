import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

function Backdrop({show, wait}) {
    if (show === false || wait === true) {
        return null;
    }

    return (
        <div
            className="backdrop"
            style={{
                height: document.body.scrollHeight,
                width: document.body.scrollWidth
            }}
        />
    );
}

Backdrop.propTypes = {
    show: PropTypes.bool,
    wait: PropTypes.bool
};

Backdrop.defaultProps = {
    show: false,
    wait: true
};

function s2p(s) {
    return {
        show: (!s.sidebar.locked && s.sidebar.visible),
        wait: !s.layout.ready
    };
}

export default connect(s2p)(Backdrop);
