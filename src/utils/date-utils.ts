import dayjs from 'dayjs';

export const checkExpire = (date: string) => {
  const dateNow = dayjs();
  return dateNow.diff(date, 'day') > 0;
};


