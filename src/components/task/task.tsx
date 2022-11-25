import { useState } from 'react';
import { TaskMutate } from '../task-mutate/task-mutate';
import { TaskRead } from '../task-read/task-read';
import { getClassNames, getStatusTask } from '../../utils/util';
import { TaskType } from '../../types/types';
import { StatusTask, TaskState } from '../../const';

import './task.less';


export const Task = ({task} : {task: TaskType}) => {

  const [state, setState] = useState(TaskState.Read);

  const onTurnToRead = () => setState(TaskState.Read);
  const onTurnToUpdate = () => setState(TaskState.Update);

  const {isFinished, date} = task;

  const statusText = getStatusTask({isFinished, date});

  const classes = getClassNames('task', [
    {condition: statusText === StatusTask.Current, value: 'task--current' },
    {condition: statusText === StatusTask.Expired, value: 'task--expired' },
  ]);

  const currentTask = state === TaskState.Read ?
    <TaskRead task={task} onTurnToUpdate={onTurnToUpdate}/> :
    <TaskMutate task={task} onTurnToRead={onTurnToRead}/>;

  return <li className={classes}>{currentTask}</li>;
};
