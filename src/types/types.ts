
export type TaskType = {
  id: number| string | null;
  title: string;
  description: string;
  date: string;
  files: string[] | string | undefined;
  isFinished: boolean;
}

export type StatusReadProps = {
  isFinished : boolean;
  date: string;
}

export type AdditionalType = {
  condition: boolean;
  value: string;
}
