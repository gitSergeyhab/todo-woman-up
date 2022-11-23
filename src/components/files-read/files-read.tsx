import { useState } from 'react';
import { ShowBtn } from '../show-btn/show-btn';


const getFileName = (filePath: string) => {
  const filArr = filePath.split('/');
  return filArr[filArr.length - 1];
};


const FileLink = ({href} : {href: string}) => (
  <a href={href} target={'_blank'} rel='noreferrer'>{ getFileName(href) }</a>
);


export const FilesRead = ({files} : {files: string | string[] | undefined}) => {

  const [filesShown, setFilesShown] = useState(false);

  const handleToggleBtn = () => setFilesShown((value) => !value);

  const fileElements = files && Array.isArray(files) ? <ul className='task__file-list'>{files.map((item) => <li key={item}> <FileLink href={item}/> </li> )}</ul> : null;
  const fileElement = files && !Array.isArray(files) ? <a href={files} target={'_blank'} rel='noreferrer'>{files}</a> : null;

  const showMoreBtn = files ? <ShowBtn isOpen={filesShown} onClick={handleToggleBtn}/> : null;

  const fileContent = filesShown ? <div className='task__files'>  {fileElements} {fileElement}</div> : null;

  return (
    <div className='task__files'>
      {files ? 'Прикреплённые файлы:' : 'Нет прикрепленных файлов'}

      {showMoreBtn}
      {fileContent}
    </div>
  );
};
