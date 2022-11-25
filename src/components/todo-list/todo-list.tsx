import { Task } from '../task/task';
import { TaskMutate } from '../task-mutate/task-mutate';
import { TaskType } from '../../types/types';
import { EMPTY_TASK } from '../../const';

import './todo-list.less';


export const TodoList = ({tasks} : {tasks: TaskType[]}) => {

  const todoElements = tasks.map((item) => <Task key={item.id} task={item} />);

  return (
    <ul className='todo-list'>
      <li className={'task task--new'}><TaskMutate onTurnToRead={() => null} task={EMPTY_TASK}/></li>
      {todoElements}
    </ul>
  );
};
