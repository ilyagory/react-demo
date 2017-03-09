import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions';
//
import {createTree} from '../util/tree';
import clone from '../util/clone';
import noop from '../util/noop';
//
import TreeItem from '../components/TreeItem';
//
import LockOutline from '../img/lock-outline.svg';
import LockOpen from '../img/lock-open.svg';
import Add from '../img/add.svg';
import Close from '../img/close.svg';

class SideBar extends Component {
    renderClose() {
        const {isLocked, onToggle} = this.props;

        if (isLocked) {
            return null;
        }

        return (<button
            type="button"
            className="btn btn-i"
            onClick={onToggle}
        >
            <Close />
        </button>);
    }

    renderLockIco() {
        return this.props.isLocked ? <LockOutline /> : <LockOpen />;
    }

    renderProjects() {
        const {projects, markerOpen, itemSelect} = this.props;

        if (!(Array.isArray(projects) && projects.length)) {
            return null;
        }

        const t = createTree(clone(projects));
        return (
            <div className="project-tree">
                {
                    t.map(e => (
                        <TreeItem
                            onOpen={markerOpen}
                            onSelect={itemSelect}
                            key={e.id}
                            {...e}
                        />
                    ))
                }
            </div>
        );
    }

    renderNotifications() {
        const {notifications} = this.props;

        if (!notifications) {
            return null;
        }

        return <div className="notifications">{notifications}</div>;
    }

    render() {
        const {isLocked, isVisible, onLock, wait} = this.props;

        if (!isLocked && !isVisible) {
            return null;
        }

        if (wait) {
            return null;
        }

        const c = ['sidebar'];

        if (isLocked !== true) {
            c.push('float');

            if (isVisible !== true) {
                c.push('hidden');
            }
        }

        return (
            <div
                className={c.join(' ')}
                style={{height: document.body.scrollHeight}}
            >
                {this.renderClose()}
                <div className="section notification-link">
                    Уведомления
                    {this.renderNotifications()}
                </div>
                <div className="section project-header">
                    Проекты
                    <button type="button" className="btn btn-i"><Add /></button>
                </div>
                {this.renderProjects()}
                <div className="footer">
                    <button
                        type="button"
                        className="btn btn-i"
                        onClick={onLock}
                    >
                        {this.renderLockIco()}
                    </button>
                </div>
            </div>
        );
    }
}

SideBar.propTypes = {
    onLock: PropTypes.func,
    onToggle: PropTypes.func,
    markerOpen: PropTypes.func,
    itemSelect: PropTypes.func,
    isLocked: PropTypes.bool,
    isVisible: PropTypes.bool,
    projects: PropTypes.array,
    notifications: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    wait: PropTypes.bool
};
SideBar.defaultProps = {
    onLock: noop,
    onToggle: noop,
    markerOpen: noop,
    itemSelect: noop,
    isLocked: true,
    isVisible: true,
    wait: true,
    projects: [],
    notifications: 0
};

function s2p(s) {
    return {
        isLocked: s.sidebar.locked,
        isVisible: s.sidebar.visible,
        projects: s.projects,
        notifications: (s.notifications.length > 99) ? '99+' : s.notifications.length,
        wait: !s.layout.ready
    };
}

function d2p(d) {
    return {
        onLock: () => d(actions.sidebarLock()),
        onToggle: () => d(actions.sidebarToggle()),
        //
        itemSelect: id => d(actions.sidebarSelect(id)),
        markerOpen: id => d(actions.sidebarExpand(id))
    };
}

function mp(s, d, o) {
    const m = Object.assign({}, s, d, o);

    function walk(_o) {
        m.projects.forEach((p) => {
            if (p.id === _o.parent) {
                p.open = true;
                walk(p);
            }
        });
    }

    walk(s.projects.find(p => p.open === true));
    return m;
}

export default connect(s2p, d2p, mp)(SideBar);
