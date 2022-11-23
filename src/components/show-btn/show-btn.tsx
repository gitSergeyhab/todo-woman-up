import { ShowBtnName } from '../../const';

type ShowBtnProps = {
  isOpen: boolean;
  onClick: () => void;
}

export const ShowBtn = ({isOpen, onClick} : ShowBtnProps) => {

  const btnName = isOpen ? ShowBtnName.Hide : ShowBtnName.Show;

  return <button className='task__show-btn' type="button" onClick={onClick}>{btnName}</button>;

};
