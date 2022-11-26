import { DESCRIPTION_LENGTH_IN_LIST, SHORT_DESCRIPTION_LENGTH_IN_LIST, StatusTask } from '../const';
import { AdditionalType, StatusReadProps } from '../types/types';
import { checkExpire } from './date-utils';

/**
 * Воззрвщает сокращеную строку, если ее длина > DESCRIPTION_LENGTH_IN_LIST + "..."
 * @param description строка или null
 * @returns исходная строка или сокращенная строка или null (если description === null)
 */

export const cutDescription = (description : string | null ) => {
  if (description) {
    return description.length > DESCRIPTION_LENGTH_IN_LIST ? `${description.slice(0, SHORT_DESCRIPTION_LENGTH_IN_LIST)}...` : description;
  }
  return null;
};


/**
 * Воззрвщает статус задачи
 * @param param0 - {isFinished, date} isFinished - boolean - закончена или нет; date - string - крайняя дата (формат ДД.ММ.ГГГ)
 * @returns статус задачи -> StatusReadProps (завершена / в процессе / просрочена)
 */

export const getStatusTask = ({isFinished, date} : StatusReadProps) => {

  if (isFinished) {
    return StatusTask.Finished;
  }

  if (checkExpire(date)) {
    return StatusTask.Expired;
  }

  return StatusTask.Current;
};


/**
 * Воззрвщает строку классов для css
 * @param usual - общий класс
 * @param additional - {condition, value}[] - condition - boolean - условие; value - string - класс с модификатором;
 * @returns общий класс + классы с модификаторами
 */

export const getClassNames = (usual: string, additional: AdditionalType[]) => {
  const addClasses = additional.map((item) => item.condition ? item.value : '').join(' ');
  return `${usual} ${addClasses}`;
};

/**
 * возвращает уникальное имя файла с папкой
 * @param dirName - имя папки
 * @param file - файл
 * @returns - уникальное имя файла с папкой
 */

export const getFileName = (dirName: string, file: File) => {
  const {name, lastModified} = file;
  const nameArr = name.split('.');
  const ext = nameArr[nameArr.length - 1];
  const newName = nameArr.slice(0, nameArr.length - 1).join('.');
  return `${dirName}/${newName}-${lastModified}.${ext}`;
};
