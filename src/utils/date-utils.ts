import dayjs from 'dayjs';
import { DATE_FORMAT } from '../const';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

export const checkExpire = (date: string) => {
  const dateNow = dayjs();
  return dateNow.diff(date, 'day') > 0;
};


export const validateDate = (date: string) => dayjs(date, DATE_FORMAT, true).isValid();
