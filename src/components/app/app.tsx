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

  useEffect(() => readTasks(setTasks, setErrorServer), []);

  const content = tasks.length ? <TodoList tasks={tasks}/> : null;
  const loading = !errorServer && !tasks.length ? <Errors big errors={['Грузим', 'Ожидайте', 'Почти все...']}/> : null;
  const error = errorServer ? <Errors big errors={[ErrorText.ServerFirst, ErrorText.ServerSecond]}/> : null;


  return (
    <main className='main'>
      {content}
      {loading}
      {error}
    </main>
  );
}

export default App;
