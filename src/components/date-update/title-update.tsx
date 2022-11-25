import { ChangeEventHandler } from 'react';


type TitleUpdateProps = {title: string; onChange: (value: string) => void}

export const TitleUpdate = ({title, onChange} : TitleUpdateProps) => {

  const handleTitleChange: ChangeEventHandler<HTMLInputElement> = (evt) => onChange(evt.currentTarget.value);

  return <input type='text' value={title} onChange={handleTitleChange}/>;
};
