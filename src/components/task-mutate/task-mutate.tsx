import { useRef, useState, FormEventHandler } from 'react';
import { TaskState } from '../../const';
// import { TaskType } from '../../types/types';
import { ButtonBlock } from '../button-block/button-block';
import { DescriptionUpdate } from '../description-update/description-update';
import { StatusUpdate } from '../status-update/status-update';
import { TextUpdate } from '../text-update/date-update';

import { db } from '../../firebase';
import { collection, addDoc } from 'firebase/firestore';

const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;


type AddTaskType = {
  title: string;
  description: string;
  date: string;
  isFinished: boolean;
  files: string | string[] | undefined;
}

type TaskType = AddTaskType & {id: number | null}

type TaskUpdateProps = {
  task: TaskType;
  onTurnToRead: () => void;
}

const addTask = async(task: AddTaskType, clear: () => void) => {

  try {
    await addDoc(collection(db, 'todos'), task);
    clear();
    console.log('ok!');
  } catch (err) {
    console.log('err', err);
  }

};

export const TaskMutate = ({task, onTurnToRead} : TaskUpdateProps) => {

  const {id, title: oldTitle, description: oldDescription, date: oldDate, isFinished} = task;

  const [title, setTitle] = useState(oldTitle);
  const [description, setDescription] = useState(oldDescription);
  const [date, setDate] = useState(oldDate);
  const [isChecked, setChecked] = useState(isFinished);

  const [error, setError] = useState(false);

  const fileRef = useRef<HTMLInputElement>(null);
  // const formRef = useRef<HTMLFormElement>(null);

  const handleChangeStatus = () => setChecked((value) => !value);

  const typeButtons = id ? TaskState.Update : TaskState.Create;

  const resetForm = () => {
    // const form = formRef.current;
    // if (form) {
    //   form.reset();
    setTitle('');
    setDescription('');
    setDate('');
    setChecked(false);
    // }


  };

  const handleAddNewTaskClick: FormEventHandler<HTMLFormElement> = (evt) => {
    evt.preventDefault();
    if (!DATE_PATTERN.test(date)) {
      return setError(true);

    }

    if(title && description && DATE_PATTERN.test(date)) {
      addTask({title, date, description, files: '', isFinished}, resetForm);
    }

  };

  const errorElement = error ? <p className='task__error'> формат даты должен быть ГГГГ-ММ-ДД. <br/> Например 2022-12-12</p> : null;

  return (
    <form className='task__form' onSubmit={handleAddNewTaskClick}>
      <div className='task__title-date'>
        <TextUpdate classes='task__title task__title--update' onChange={setTitle} text={title} placeholder={'Заголовок'}/>
        <TextUpdate classes='task__date task__date--update' onChange={setDate} text={date} placeholder={'гггг-мм-дд'}/>
      </div>
      <DescriptionUpdate classes='task__description task__description--update' onChange={setDescription} text={description}/>

      <input className='task__file task__file--update' type='file' id='file' name="file" ref={fileRef} multiple />

      <StatusUpdate isFinished={isChecked} onChange={handleChangeStatus}/>

      <ButtonBlock type={typeButtons} onTurnClick={onTurnToRead}/>

      {errorElement}

    </form>
  );
};
