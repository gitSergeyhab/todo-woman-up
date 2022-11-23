import { ChangeEventHandler } from 'react';

type TextUpdateProps = {
  text: string;
  onChange: (value: string) => void;
  classes: string;
  placeholder: string;
}

export const TextUpdate = ({text, onChange, classes, placeholder} : TextUpdateProps) => {
  const handleChange: ChangeEventHandler<HTMLInputElement> = (evt) => onChange(evt.currentTarget.value);

  return (
    <input type='text' className={classes} value={text} onChange={handleChange} placeholder={placeholder} required/>
  );
};
