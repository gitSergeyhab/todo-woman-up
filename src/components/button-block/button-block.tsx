import { TaskState } from '../../const';


type ButtonBlockProps = {
  type: TaskState;
  onTurnClick: () => void | undefined;
}

export const ButtonBlock = ({type, onTurnClick} : ButtonBlockProps) => {

  if (type === TaskState.Read) {
    return (
      <div className='task__buttons'>
        <button
          type='button' className='task__button task__button--blue'
          onClick={onTurnClick}
        >
          Изменить
        </button>
        <button type='submit' className='task__button task__button--red'>
          Удалить
        </button>
      </div>
    );
  }
  if (type === TaskState.Update) {
    return (
      <div className='task__buttons'>
        <button
          type='button' className='task__button task__button--yellow'
          onClick={onTurnClick}
        >
        Отменить
        </button>
        <button type='submit' className='task__button task__button--green'>Сохранить</button>
      </div>
    );
  }

  return (
    <div className='task__buttons'>
      <button type='submit' className='task__button task__button--green'>Создать</button>
    </div>
  );
};
