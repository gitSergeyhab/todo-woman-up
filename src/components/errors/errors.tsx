import { getClassNames } from '../../utils/util';


const Error = ({error} : {error: string}) => <li className='task__error'>{error}</li>;

export const Errors = ({errors, big} : {errors: string[]; big?: boolean}) => {
  const errorsElements = errors.map((item) => <Error key={item} error={item}/>);
  const classes = getClassNames('task__errors', [{condition: big || false, value: 'task__errors--big'}]);
  return <ul className={classes}>{errorsElements}</ul>;
};


