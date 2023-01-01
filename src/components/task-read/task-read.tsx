import { useState, FormEventHandler } from 'react';
import { ButtonBlock } from '../button-block/button-block';
import { DescriptionRead } from '../description-read/description-read';
import { Errors } from '../errors/errors';
import { FilesRead } from '../files-read/files-read';
import { StatusRead } from '../status-read/status-read';
import { deleteTask } from '../../utils/firebase-utils';
import { TaskType } from '../../types/types';

import { ErrorText, TaskState } from '../../const';


type TaskReadProps = {
  task: TaskType;
  onTurnToUpdate: () => void;
}

export const TaskRead = ({task, onTurnToUpdate} : TaskReadProps) => {

  const {id, title, description, date, files, isFinished} = task;
  const [errorServer, setErrorServer] = useState(false);
  const [loading, setLoading] = useState(false);


  const handleDeleteTaskClick: FormEventHandler<HTMLFormElement> = (evt) => {
    evt.preventDefault();
    setLoading(true);
    if (id) {
      deleteTask(id, setErrorServer, setLoading);
    }
  };

  const errorServerElement = errorServer ? <Errors errors={[ErrorText.ServerFirst, ErrorText.ServerSecond]}/> : null;

  return (
    <form className='task__form' onSubmit={handleDeleteTaskClick}>
      <h3 className='task__title'>{title}</h3>
      <DescriptionRead description={description}/>
      <p className='task__date' >{date}</p>
      <FilesRead files={files}/>
      <StatusRead isFinished={isFinished} date={date}/>
      <ButtonBlock loading={loading} type={TaskState.Read} onTurnClick={onTurnToUpdate}/>
      {errorServerElement}
    </form>
  );
};
