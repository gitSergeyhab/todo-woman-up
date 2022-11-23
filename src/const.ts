import { TaskType } from './types/types';

export const DESCRIPTION_LENGTH_IN_LIST = 40;
export const SHORT_DESCRIPTION_LENGTH_IN_LIST = 30;

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
  files: undefined,
  isFinished: false,
};
