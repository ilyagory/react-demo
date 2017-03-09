import React, {PropTypes} from 'react';
import Menu from '../img/menu.svg';

/**
 * @param {boolean} sidebarLocked is sidebar locked
 * @param {string} brand brand name
 * @param {function} onSideToggle sandwich on-click action show/hide floating sidebar
 * @returns {XML}
 * @constructor
 */
function TopBar({sidebarLocked, brand, onSideToggle}) {
    const sb = sidebarLocked ?
        null
        : <button type="button" className="btn btn-i" onClick={onSideToggle}><Menu /></button>;

    return (<div className="topbar">
        {sb}
        {brand}
    </div>);
}

TopBar.propTypes = {
    sidebarLocked: PropTypes.bool,
    brand: PropTypes.string,
    onSideToggle: PropTypes.func
};

TopBar.defaultProps = {
    sidebarLocked: false,
    brand: 'ACME inc.',
    onSideToggle: null
};

export default TopBar;
