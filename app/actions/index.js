import * as types from './types';

export function sidebarLock() {
    return {
        type: types.SIDEBAR.LOCK
    };
}

export function sidebarToggle() {
    return {
        type: types.SIDEBAR.SHOW
    };
}

export function sidebarExpand(id) {
    return {
        type: types.SIDEBAR.EXPAND,
        expanded: id
    };
}

export function sidebarSelect(id) {
    return {
        type: types.SIDEBAR.SELECT,
        selected: id
    };
}

export function taskSelect(id) {
    return {
        type: types.TASK.SELECT,
        selected: id
    };
}

export function layoutReady() {
    return {
        type: types.LAYOUT.READY
    };
}
