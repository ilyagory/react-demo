import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import TaskId from './TaskId';
//
import Check from '../img/check.svg';
import Add from '../img/add.svg';
import Comment from '../img/comment.svg';
//
import {taskSelect} from '../actions';
import noop from '../util/noop';

class Task extends Component {

    static contractorsCount(cl) {
        if (!(cl > 3)) {
            return null;
        }

        const c = cl - 3;
        return <div className="count">+{c > 99 ? 99 : c}</div>;
    }

    renderDeadline() {
        const {deadline} = this.props;

        return <div className="deadline">{deadline.join(' ')}</div>;
    }

    renderContractors() {
        const {contractors} = this.props;
        const cl = contractors.length;
        const r = [];

        if (cl) {
            for (let i = 0; i < 3; i++) {
                const c = contractors[i];

                if (c !== undefined) {
                    r.push(
                        <div className="person" key={c.id}>
                            <img src={`contractors/${c.name}.jpg`} alt={c.name} />
                        </div>
                    );
                }
            }
        }

        return (
            <div className="contractors">
                {r}
                {Task.contractorsCount(cl)}
                <button type="button" className="btn btn-i add">
                    <Add />
                </button>
            </div>
        );
    }

    renderComments() {
        const {comments} = this.props;
        const c = ['comments'];
        const _c = comments.length;

        if (!_c) {
            return null;
        }

        if (comments.some(c_ => c_.unread === true)) {
            c.push('unread');
        }

        return (
            <div className={c.join(' ')}>
                <Comment />
                <div className="count">{_c > 99 ? '99+' : _c}</div>
            </div>
        );
    }

    renderTags() {
        const {tags} = this.props;

        if (!tags.length) {
            return null;
        }

        return tags.map(t => <div className={`tag tag-${t.type}`} key={t.id}>{t.title}</div>);
    }

    renderCheck() {
        const {id, onCheck, selected} = this.props;
        const c = ['check'];

        if (selected === true) {
            c.push('selected');
        }

        return (
            <div className={c.join(' ')} onClick={() => onCheck(id)}>
                <Check />
            </div>
        );
    }

    render() {
        const {id, title, status} = this.props;

        return (
            <div className="task">
                <TaskId id={id.toString().split('.')[1]} />
                <div className="task-body">
                    {this.renderCheck()}
                    <div className="title">
                        {title}
                        {this.renderComments()}
                        {this.renderTags()}
                    </div>
                    <div className={`status status-${status[0]}`}>{status[1]}</div>
                    {this.renderContractors()}
                </div>
                {this.renderDeadline()}
            </div>
        );
    }
}

Task.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    deadline: PropTypes.array,
    status: PropTypes.array.isRequired,
    contractors: PropTypes.array,
    comments: PropTypes.array,
    tags: PropTypes.array,
    selected: PropTypes.bool,
    onCheck: PropTypes.func
};

Task.defaultProps = {
    deadline: [],
    contractors: [],
    comments: [],
    tags: [],
    selected: false,
    onCheck: noop
};

function p2d(d) {
    return {
        onCheck: id => d(taskSelect(id))
    };
}

export default connect(null, p2d)(Task);
