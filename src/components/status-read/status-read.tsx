import { getStatusTask } from '../../utils/util';
import { StatusReadProps } from '../../types/types';
import { StatusTaskClass } from '../../const';


export const StatusRead = ({isFinished, date} : StatusReadProps) => {
  const statusText = getStatusTask({isFinished, date});
  const classNames = `task__status task__status${StatusTaskClass[statusText]}`;

  return <span className={classNames}>{statusText}</span>;
};
