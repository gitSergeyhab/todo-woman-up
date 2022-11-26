import dayjs from 'dayjs';
import { DATE_FORMAT } from '../const';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

/**
 * проверяет просрочена ли задача
 * @param date - крайняя дата
 * @returns true / false - просрочена / нет
 */

export const checkExpire = (date: string) => {
  const dateNow = dayjs();
  return dateNow.diff(date, 'day') > 0;
};

/**
 * проверяет корректность даты
 * @param date - дата
 * @returns true / false - валидна / нет
 */
export const validateDate = (date: string) => dayjs(date, DATE_FORMAT, true).isValid();
