import { TaskType } from './types/types';

export const DESCRIPTION_LENGTH_IN_LIST = 40;
export const SHORT_DESCRIPTION_LENGTH_IN_LIST = 30;

export const DATE_FORMAT = 'DD.MM.YYYY';

export const enum StatusTask {
  Current = 'в процессе',
  Expired = 'просрочена',
  Finished = 'завершена'
}

export const enum ShowBtnName {
  Show = 'показать',
  Hide = 'скрыть'
}

export const enum TaskState {
  Read = 'read',
  Update = 'update',
  Create = 'create'
}

export const EMPTY_TASK: TaskType = {
  id: null,
  title: '',
  date: '',
  description: '',
  files: [],
  isFinished: false,
};

export const enum ErrorText {
  ServerFirst = 'Что-то пошло не так',
  ServerSecond = 'Попробуйте позже',
  DateFirst = 'Неправильная дата или формат',
  DatSecond = 'Формат даты: ДД.ММ.ГГГГ',
}


export const FIRESTORE_PATH_NAME = 'todos';
export const ERROR_FILE_PATH = '/files/error.txt';
