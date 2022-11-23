import { ChangeEventHandler } from 'react';

type FileInputProps = {
  files: string[] | string | undefined;
  onChange: (value: string) => void;

}

export const FileInput = ({files, onChange} : FileInputProps) => {

  const handleChange: ChangeEventHandler<HTMLInputElement> = (evt) => onChange(evt.currentTarget.value);

  return (
    <div>
      <label htmlFor="file">Загрузить файлы</label>
      <input type='file' id='file' name="file" value={files} onChange={handleChange} multiple />
    </div>
  );};
