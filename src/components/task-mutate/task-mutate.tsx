import { useRef, useState, FormEventHandler } from 'react';
import { ButtonBlock } from '../button-block/button-block';
import { DescriptionUpdate } from '../description-update/description-update';
import { Errors } from '../errors/errors';
import { StatusUpdate } from '../status-update/status-update';
import { TextUpdate } from '../text-update/date-update';
import { validateDate } from '../../utils/date-utils';
import { createTask, updateTask, uploadFiles } from '../../utils/firebase-utils';
import { TaskType } from '../../types/types';
import { ErrorText, TaskState } from '../../const';


type TaskUpdateProps = {
  task: TaskType;
  onTurnToRead: () => void;
}

export const TaskMutate = ({task, onTurnToRead} : TaskUpdateProps) => {

  const {id, title: oldTitle, description: oldDescription, date: oldDate, isFinished: oldIsFinished} = task;

  const typeButtons = id ? TaskState.Update : TaskState.Create;

  const [title, setTitle] = useState(oldTitle);
  const [description, setDescription] = useState(oldDescription);
  const [date, setDate] = useState(oldDate);
  const [isFinished, setIsFinished] = useState(oldIsFinished);
  const [errorDate, setErrorDate] = useState(false);
  const [errorServer, setErrorServer] = useState(false);

  const fileRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleChangeStatus = () => setIsFinished((value) => !value);

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setDate('');
    setIsFinished(false);
    formRef.current?.reset();
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (evt) => {
    evt.preventDefault();

    if (!validateDate(date)) {
      return setErrorDate(true);
    }

    if(title && description) {
      const newFiles = fileRef.current?.files;

      if (newFiles) {

        uploadFiles('files', newFiles).then((items) => {
          const data = {title, date, description, files: items, isFinished};
          id ?
            updateTask(id, data, setErrorServer, onTurnToRead) :
            createTask(data, resetForm, setErrorServer);
        });
      }
    }
  };

  const errorDateElement = errorDate ? <Errors errors={[ErrorText.DateFirst, ErrorText.DatSecond]}/> : null;
  const errorServerElement = errorServer ? <Errors errors={[ErrorText.ServerFirst, ErrorText.ServerSecond]}/> : null;

  return (
    <form className='task__form' onSubmit={handleSubmit} ref={formRef}>
      <div className='task__title-date'>
        <TextUpdate classes='task__title task__title--update' onChange={setTitle} text={title} placeholder={'Заголовок'}/>
        <TextUpdate classes='task__date task__date--update' onChange={setDate} text={date} placeholder={'дд.мм.гггг'}/>
      </div>
      <DescriptionUpdate classes='task__description task__description--update' onChange={setDescription} text={description}/>
      <input className='task__file task__file--update' type='file' id='file' name="file" ref={fileRef} multiple />
      <StatusUpdate isFinished={isFinished} onChange={handleChangeStatus}/>
      <ButtonBlock type={typeButtons} onTurnClick={onTurnToRead}/>
      {errorDateElement}
      {errorServerElement}
    </form>
  );
};
