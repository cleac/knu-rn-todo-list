import {Task} from "./model";

/** List of tasks operations */

const _makeOrder = (t1: Task, t2: Task) => {
    if (t1.status !== t2.status) {
        return t1.status > t2.status ? 1 : -1;
    } else if (t1.id !== t2.id) {
        return t1.id > t2.id ? -1 : 1;
    }
};

export const orderTasks = (tasksList: Array<Task>): Array<Task> =>
    tasksList.sort(_makeOrder);

export const markByStatus = (status: number) =>
    (tasksList: Array<Task>, ids: Array<number>): Array<Task> =>
        tasksList.map((task: Task) => {
            if (ids.indexOf(task.id) >= 0) {
                task.status = status;
            }
            return task;
        });

export const markDeleted = markByStatus(Task.STATUS.deleted);
export const markDone = markByStatus(Task.STATUS.done);
export const markArchived = markByStatus(Task.STATUS.archived);

/** Task itself operations */

export const makeTextStyle = (task: Task, defaultStyle?: Object<string, any>): Object<string, any> => {
    const style = defaultStyle || {};
    switch (task.status) {
        case Task.STATUS.deleted:
            Object.assign(style, {
                color: '#e69fb4',
                fontStyle: 'italic',
                textDecorationLine: 'line-through',
            });
            break;
        case Task.STATUS.done:
            Object.assign(style, {
                fontStyle: 'italic',
                color: '#a9e69d',
            });
    }
    return style;
};

export const getButtonsActive = (task: Task): Array<string> => {
    switch (task.status) {
        case Task.STATUS.new:
            return ['mark_done', 'delete'];
        case Task.STATUS.deleted:
            return [];
        case Task.STATUS.done:
            return ['archive'];
        case Task.STATUS.archived:
        default:
            return [];
    }
};

export const getButtonColor = (btnType: string): string => {
    switch (btnType) {
        case 'mark_done':
            return '#009102';
        case 'delete':
            return '#ff3140';
        case 'archive':
            return '#9d9b93';
    }
};

export const getButtonTitle = (btnType: string): string => {
    switch (btnType) {
        case 'mark_done':
            return 'Mark as done';
        case 'delete':
            return 'Delete';
        case 'archive':
            return 'Archive';
    }
}