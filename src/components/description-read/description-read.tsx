import { useState } from 'react';
import { DESCRIPTION_LENGTH_IN_LIST } from '../../const';
import { cutDescription } from '../../utils/util';
import { ShowBtn } from '../show-btn/show-btn';


export const DescriptionRead = ({description} : {description : string | null}) => {

  const [descriptionShown, setDescriptionShown] = useState(false);

  const handleToggleBtn = () => setDescriptionShown((value) => !value);

  const showMoreBtn = description && description.length > DESCRIPTION_LENGTH_IN_LIST ?
    <ShowBtn isOpen={descriptionShown} onClick={handleToggleBtn} /> :
    null;

  const descriptionText = descriptionShown ? description : cutDescription(description);

  return (
    <p className='task__description'>
      {descriptionText}
      {showMoreBtn}
    </p>
  );

};
