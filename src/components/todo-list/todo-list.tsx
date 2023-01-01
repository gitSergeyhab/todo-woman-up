import { Task } from '../task/task';
import { TaskMutate } from '../task-mutate/task-mutate';
import { TaskType } from '../../types/types';
import { EMPTY_TASK } from '../../const';

import './todo-list.less';


export const TodoList = ({tasks} : {tasks: TaskType[]}) => {

  const todoElements = tasks.map((item) => <Task key={item.id} task={item} />);

  const classNames = tasks.length ? 'todo-list' : 'todo-list todo-list--empty';

  // const emptyMessage = tasks.length ? null : <h2 className='empty-message'>Пока нет созданных задач</h2>;

  return (
    <div>
      <ul className={classNames}>
        <li className={'task task--new'}><TaskMutate onTurnToRead={() => null} task={EMPTY_TASK}/></li>
        {todoElements}
      </ul>
      {/* {emptyMessage} */}
    </div>
  );
};
