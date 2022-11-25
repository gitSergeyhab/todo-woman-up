import { DESCRIPTION_LENGTH_IN_LIST, SHORT_DESCRIPTION_LENGTH_IN_LIST, StatusTask } from '../const';
import { AdditionalType, StatusReadProps } from '../types/types';
import { checkExpire } from './date-utils';

export const cutDescription = (description : string | null ) => {
  if (description) {
    return description.length > DESCRIPTION_LENGTH_IN_LIST ? `${description.slice(0, SHORT_DESCRIPTION_LENGTH_IN_LIST)}...` : description;
  }
  return null;
};


export const getStatusTask = ({isFinished, date} : StatusReadProps) => {

  if (isFinished) {
    return StatusTask.Finished;
  }

  if (checkExpire(date)) {
    return StatusTask.Expired;
  }

  return StatusTask.Current;
};


export const getClassNames = (usual: string, additional: AdditionalType[]) => {
  const addClasses = additional.map((item) => item.condition ? item.value : '').join(' ');
  return `${usual} ${addClasses}`;
};

export const getFileName = (dirName: string, file: File) => {
  const {name, lastModified} = file;
  const nameArr = name.split('.');
  const ext = nameArr[nameArr.length - 1];
  const newName = nameArr.slice(0, nameArr.length - 1).join('.');
  return `${dirName}/${newName}-${lastModified}.${ext}`;
};
