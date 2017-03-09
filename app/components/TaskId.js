import React, {PropTypes} from 'react';

function TaskId({id, marker}) {
    return (
        <div className="tasks-id">
            <span>{id}</span>
            {marker}
        </div>
    );
}

TaskId.propTypes = {
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    marker: PropTypes.element
};

TaskId.defaultProps = {
    marker: null
};

export default TaskId;
