import { getStatusTask } from '../../utils/util';
import { StatusReadProps } from '../../types/types';


export const StatusRead = ({isFinished, date} : StatusReadProps) => {
  const statusText = getStatusTask({isFinished, date});

  return <span className='task__status'>{statusText}</span>;
};
