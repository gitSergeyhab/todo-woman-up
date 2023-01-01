import { useState, useEffect } from 'react';
import { TodoList } from '../todo-list/todo-list';
import { Errors } from '../errors/errors';
import { readTasks } from '../../utils/firebase-utils';
import { TaskType } from '../../types/types';
import { ErrorText } from '../../const';

import './app.less';


function App(): JSX.Element {

  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [errorServer, setErrorServer] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => readTasks(setTasks, setErrorServer, setLoading), []);

  const content = <TodoList tasks={tasks}/> ;
  const errorElement = errorServer ? <Errors big errors={[ErrorText.ServerFirst, ErrorText.ServerSecond]}/> : null;
  const loadingElement = loading ? <h2 className='header-message'>Задачи загружаются... </h2> : null;
  const emptyMessageElement = !tasks.length && !loading ? <h2 className='header-message'>Пока нет созданных задач</h2> : null;


  return (
    <main className='main'>
      {content}
      {errorElement}
      {loadingElement}
      {emptyMessageElement}
    </main>
  );
}

export default App;
