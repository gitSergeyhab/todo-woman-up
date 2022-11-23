import { TaskState } from '../../const';
import { TaskType } from '../../types/types';
import { ButtonBlock } from '../button-block/button-block';
import { DescriptionRead } from '../description-read/description-read';
import { FilesRead } from '../files-read/files-read';
import { StatusRead } from '../status-read/status-read';


type TaskReadProps = {
  task: TaskType;
  onTurnToUpdate: () => void;
}

export const TaskRead = ({task, onTurnToUpdate} : TaskReadProps) => {

  const {id, title, description, date, files, isFinished} = task;


  return (
    <>
      <h3 className='task__title'>{title}</h3>
      <DescriptionRead description={description}/>
      <p className='task__date'>{date}</p>
      <FilesRead files={files}/>

      <StatusRead isFinished={isFinished} date={date}/>
      <ButtonBlock type={TaskState.Read} onTurnClick={onTurnToUpdate}/>
    </>
  );
};
