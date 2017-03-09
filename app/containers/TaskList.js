import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
//
import {collectChildren, createTree} from '../util/tree';
import clone from '../util/clone';
//
import TaskGroup from '../components/TaskGroup';

class TaskList extends Component {

    static renderEmpty() {
        return <h1>Please select a project</h1>;
    }

    renderGroup() {
        const {group, tasks} = this.props;

        return <TaskGroup {...group} tasks={tasks} />;
    }

    render() {
        return (
            <div className="task-list">
                { !this.props.group ? TaskList.renderEmpty() : this.renderGroup() }
            </div>
        );
    }
}

TaskList.propTypes = {
    group: PropTypes.object,
    tasks: PropTypes.array
};

TaskList.defaultProps = {
    tasks: [],
    group: null
};

function s2p(s) {
    const g = s.projects.find(p => p.selected === true);

    if (!g) {
        return {};
    }

    const all = collectChildren(g, s.projects).map(_g => _g.id).concat([g.id]);
    const _g = clone(g);
    createTree(s.projects, _g);
    return {
        group: _g,
        tasks: s.tasks.filter(t => all.includes(Math.floor(t.id)))
    };
}

export default connect(s2p)(TaskList);
