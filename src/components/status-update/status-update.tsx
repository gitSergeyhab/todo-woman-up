
type StatusUpdateProps = {
  isFinished: boolean;
  onChange: () => void;
}

export const StatusUpdate = ({isFinished, onChange} : StatusUpdateProps) => (
  <label className="task__status-update">
    <input type={'checkbox'} checked={isFinished} onChange={onChange}/>
      задача завершена
  </label>

);
