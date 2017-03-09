// at sidebar project tree
import React, {PropTypes, Component} from 'react';
import Marker from './Marker';
import noop from '../util/noop';

class TreeItem extends Component {

    constructor(...a) {
        super(...a);
        this._onSelect = this._onSelect.bind(this);
    }

    _onSelect(e) {
        if (e.target.className === 'marker') {
            return;
        }

        this.props.onSelect(this.props.id);
    }

    renderChildren() {
        const {children, onOpen, onSelect} = this.props;

        if (!(Array.isArray(children) && children.length)) {
            return null;
        }

        return (
            <div className="children">
                {children.map(e => <TreeItem onOpen={onOpen} onSelect={onSelect} key={e.id} {...e} />)}
            </div>
        );
    }

    renderMarker() {
        const {children, onOpen, id} = this.props;

        if (!(Array.isArray(children) && children.length)) {
            return null;
        }

        return <Marker id={id} onOpen={onOpen} />;
    }

    render() {
        const {title, children, selected, open} = this.props;
        const c = ['item'];

        if (Array.isArray(children) && children.length) {
            c.push('family');
        }

        if (selected === true) {
            c.push('selected');
        }

        if (open === true) {
            c.push('open');
        }

        return (<div className={c.join(' ')}>
            <div className="title" onClick={this._onSelect}>
                <div className="title-inner">
                    {this.renderMarker()}
                    {title}
                </div>
            </div>
            {this.renderChildren()}
        </div>);
    }
}

TreeItem.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string,
    children: PropTypes.array,
    selected: PropTypes.bool,
    open: PropTypes.bool,
    onOpen: PropTypes.func,
    onSelect: PropTypes.func
};

TreeItem.defaultProps = {
    title: '',
    children: [],
    selected: false,
    open: false,
    onOpen: noop,
    onSelect: noop
};

export default TreeItem;
