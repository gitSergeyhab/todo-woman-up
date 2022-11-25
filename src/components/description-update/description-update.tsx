import { ChangeEventHandler } from 'react';


type TextUpdateProps = {
  text: string;
  onChange: (value: string) => void;
  classes: string;
}

export const DescriptionUpdate = ({text, onChange, classes} : TextUpdateProps) => {

  const handleChange: ChangeEventHandler<HTMLTextAreaElement> = (evt) => onChange(evt.currentTarget.value);

  return <textarea className={classes} value={text} placeholder={'описание задачи'} onChange={handleChange} required/>;
};
