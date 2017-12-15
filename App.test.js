import React from 'react';
import App from './App';

import {Task} from './tasks/model';
import {getButtonsActive, markByStatus, orderTasks} from "./tasks/bl";

import renderer from 'react-test-renderer';

beforeEach(() => Task._last_id = 1);

it('renders without crashing', () => {
  const rendered = renderer.create(<App />).toJSON();
  expect(rendered).toBeTruthy();
});

it('check automatic increase of id', () => {
    new Task('asd');
    expect(Task._last_id).toBe(2);
    new Task('asdf');
    expect(Task._last_id).toBe(3);
});

it('check ordering of tasks', () => {
    const tasks: Array<Task> = [
        new Task('aa'), // id: 1
        new Task('ca'), // id: 2
        new Task('ba'), // id: 3
    ];
    expect(tasks.map(({id}) => id)).toEqual([1, 2, 3]);
    tasks[0].status = Task.STATUS.done;
    expect(orderTasks(tasks).map(({id}) => id)).toEqual([3, 2, 1]);
    tasks.push(new Task('de'));
    expect(orderTasks(tasks).map(({id}) => id)).toEqual([4, 3, 2, 1]);
    tasks[2].status = Task.STATUS.archived;
    expect(orderTasks(tasks).map(({id}) => id)).toEqual([4, 3, 1, 2]);
});

it('check marking with status', () => {
    const tasks: Array<Task> = [
        new Task('aa'), // id: 1
        new Task('ca'), // id: 2
        new Task('ba'), // id: 3
    ];
    const mbt5 = markByStatus(5);
    expect(mbt5(tasks, [1, 3]).map(({status}) => status)).toEqual([5,1,5]);
});

it('Check buttons active on task status', () => {
    const task = new Task('test');
    expect(getButtonsActive(task)).toEqual(['mark_done', 'delete']);
    task.status = Task.STATUS.deleted;
    expect(getButtonsActive(task)).toEqual([]);
    task.status = Task.STATUS.archived;
    expect(getButtonsActive(task)).toEqual([]);
    task.status = Task.STATUS.done;
    expect(getButtonsActive(task)).toEqual(['archive']);
});

it('checkActiveButtonsColor')