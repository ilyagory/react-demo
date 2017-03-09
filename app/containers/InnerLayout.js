import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
//
import TopBar from '../components/TopBar';
import SideBar from './SideBar';
import TaskList from './TaskList';
import Backdrop from '../components/Backdrop';
import {sidebarToggle, layoutReady} from '../actions';
import noop from '../util/noop';

class InnerLayout extends Component {

    componentDidMount() {
        this.props.onReady();
    }

    componentDidUpdate() {
        this.props.onReady();
    }

    render() {
        const {sidebar, sideToggle} = this.props;

        return (
            <div className="inner-layout">
                <TopBar sidebarLocked={sidebar.locked} onSideToggle={sideToggle} />
                <SideBar />
                <TaskList />
                <Backdrop />
            </div>
        );
    }
}

InnerLayout.propTypes = {
    sidebar: PropTypes.object,
    sideToggle: PropTypes.func,
    onReady: PropTypes.func
};

InnerLayout.defaultProps = {
    sidebar: {},
    sideToggle: noop,
    onReady: noop
};

function s2p(s) {
    return {
        sidebar: s.sidebar
    };
}

function d2p(d) {
    return {
        sideToggle: () => d(sidebarToggle()),
        onReady: () => d(layoutReady())
    };
}

export default connect(s2p, d2p)(InnerLayout);
