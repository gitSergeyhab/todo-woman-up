import { useState } from 'react';
import { ShowBtn } from '../show-btn/show-btn';
import { FileTask } from '../../types/types';


const getFileName = (filePath: string) => {
  const filArr = filePath.split('/');
  return filArr[filArr.length - 1];
};


const FileLink = ({name, href} : FileTask) => (
  <a href={href} target={'_blank'} rel='noreferrer'>{ getFileName(name) }</a>
);


export const FilesRead = ({files} : {files: FileTask[] }) => {

  const [filesShown, setFilesShown] = useState(false);

  const handleToggleBtn = () => setFilesShown((value) => !value);

  const fileElements = files.length ? <ul className='task__file-list'>{files.map(({name, href}) => <li key={name}> <FileLink href={href} name={name} /> </li> )}</ul> : null;

  const showMoreBtn = files.length ? <ShowBtn isOpen={filesShown} onClick={handleToggleBtn}/> : null;

  const fileContent = filesShown ? <div className='task__files'>  {fileElements} </div> : null;

  return (
    <div className='task__files'>
      {files && files.length ? 'Прикреплённые файлы:' : 'Нет прикрепленных файлов'}
      {showMoreBtn}
      {fileContent}
    </div>
  );
};
