import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {sidebarExpand} from '../actions';
import noop from '../util/noop';
//
import Task from './Task';
import Marker from './Marker';
import TaskId from './TaskId';

class TaskGroup extends Component {

    get tasks() {
        const {tasks, id} = this.props;
        return tasks.filter(t => Math.floor(t.id) === id);
    }

    get hasChild() {
        return this.props.children.length > 0 || this.tasks.length > 0;
    }

    renderTasks() {
        const tasks = this.tasks;

        if (!tasks.length || !this.props.open) {
            return null;
        }

        return (
            <div className="tasks">
                {tasks.map(t => <Task key={t.id} {...t} />)}
            </div>
        );
    }

    renderChildren() {
        const {children, tasks, open, onOpen} = this.props;
        if (!this.hasChild || !open) {
            return null;
        }

        return (
            <div className="children">
                {children.map(c => <TaskGroup key={c.id.toString()} {...c} onOpen={onOpen} tasks={tasks} />)}
            </div>
        );
    }

    renderMarker() {
        const {children, id, onOpen} = this.props;
        return (children.length || this.tasks.length)
            ? <Marker id={id} onOpen={onOpen} />
            : null;
    }

    render() {
        const {id, title, open} = this.props;
        const c = ['task-group'];

        if (this.hasChild && open === true) {
            c.push('family');
        }

        if (open === true) {
            c.push('open');
        }

        return (
            <div className={c.join(' ')}>
                <TaskId id={id} marker={this.renderMarker()} />
                <div className="group-title">{title}</div>
                {this.renderTasks()}
                {this.renderChildren()}
            </div>
        );
    }
}

TaskGroup.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string,
    tasks: PropTypes.array,
    children: PropTypes.array,
    open: PropTypes.bool,
    onOpen: PropTypes.func
};

TaskGroup.defaultProps = {
    title: '',
    children: [],
    tasks: [],
    open: false,
    onOpen: noop
};

function dp(d) {
    return {
        onOpen: id => d(sidebarExpand(id))
    };
}

export default connect(null, dp)(TaskGroup);
