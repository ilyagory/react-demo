import {routerReducer as routing} from 'react-router-redux';
import {combineReducers} from 'redux';
import * as types from '../actions/types';
import clone from '../util/clone';

function sidebar(state = {locked: true, visible: true}, action) {
    switch (action.type) {
        case (types.SIDEBAR.LOCK): {
            const l = !state.locked;
            return {
                locked: l,
                visible: l === true
            };
        }
        case types.SIDEBAR.SHOW:
            return {
                locked: false,
                visible: !state.visible
            };
        default:
            return state;
    }
}

function projects(state = [], action) {
    let res;
    switch (action.type) {
        // todo move to new reducer... task-group reducer?
        case types.SIDEBAR.EXPAND:
            res = state.map((e) => {
                if (e.id === action.expanded) {
                    e.open = (typeof e.open === 'undefined') ? true : !e.open;
                }
                return e;
            });
            break;
        case types.SIDEBAR.SELECT:
            res = state.map((e) => {
                e.selected = (e.id === action.selected);
                return e;
            });
            break;
        default:
            res = Array.from(state);
            break;
    }
    return res;
}

function notifications(s = []) {
    return s;
}

function tasks(s = [], a) {
    const r = clone(s);
    switch (a.type) {
        case types.TASK.SELECT:
            return r.map((t) => {
                if (t.id === a.selected) {
                    t.selected = !t.selected;
                }
                return t;
            });
        default:
            return r;
    }
}

function layout(s = {}, a) {
    switch (a.type) {
        case types.LAYOUT.READY:
            return {ready: true};
        default:
            return s;
    }
}

const rootReducer = combineReducers({
    notifications,
    sidebar,
    projects,
    tasks,
    layout,
    routing
});

export default rootReducer;
