
export type FileTask = { href: string; name: string };


export type AddTaskType = {
  title: string;
  description: string;
  date: string;
  isFinished: boolean;
  files: FileTask[];

}

export type TaskType = AddTaskType & {id: string | null};

export type StatusReadProps = {
  isFinished : boolean;
  date: string;
}

export type AdditionalType = {
  condition: boolean;
  value: string;
}
