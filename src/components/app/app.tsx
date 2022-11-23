import { useState, useEffect } from 'react';

// import { db } from '../../firebase';
// import { collection, query, onSnapshot, doc } from 'firebase/firestore';
// import { firestore } from 'firebase-admin'


import { TaskType } from '../../types/types';
import { TodoList } from '../todo-list/todo-list';

import './app.less';


const TASKS: TaskType[] = [
  {id: 1, date: '2022-11-22', description: 'description description s description dd description f description dd description', files: ['/files/1.txt', '/files/2.txt'], isFinished: false, title: 'First Task'},
  {id: 2, date: '2022-12-22', description: 'description  s description dd description f description dd ', files: ['/files/1.txt'], isFinished: false, title: 'First Task 2'},
  {id: 3, date: '2022-10-22', description: 'description ', files: undefined, isFinished: false, title: 'First Task 3'},
  {id: 4, date: '2022-11-22', description: 'description description s description dd description f description dd description', files: ['/files/4.txt', '/files/5.txt'], isFinished: true, title: 'First Task 4'},
  {id: 5, date: '2022-12-22', description: 'description  s description dd description f description dd ', files: ['/files/1.txt'], isFinished: true, title: 'First Task 5'},
  {id: 6, date: '2022-10-22', description: 'description ', files: undefined, isFinished: true, title: 'First Task 6'},
  {id: 7, date: '2022-11-21', description: 'description ', files: undefined, isFinished: false, title: 'First Task 7'},
  {id: 8, date: '2022-11-23', description: 'description ', files: undefined, isFinished: false, title: 'First Task 8'},
  {id: 9, date: '2022-02-30', description: 'description ', files: undefined, isFinished: false, title: 'First Task 8'},
];

// const converter = {
//   toFirestore: (data: TaskType[]) => data,
//   // fromFirestore: (snap: FirebaseFirestore.QueryDocumentSnapshot) => snap.data() as User,
//   fromFirestore: (snap: firestore.QueryDocumentSnapshot) => snap.data() as TaskType[]
// }

// const getTasks = () => {
//   try {
//     const queries = query(collection(db, 'todos').withConverter(converter));
//     const unsub = onSnapshot(queries, (querySnapshot) => {
//       const taskArr: TaskType[] = [];
//       querySnapshot.forEach((item: TaskType) => {
//         taskArr.push({...item.data, id: item.id})
//       })
//     })
//     return unsub;

//   } catch (err) {
//     console.log(err)
//   }
// }


function App(): JSX.Element {

  // const [tasks, setTasks] = useState<TaskType[]>([]);

  // useEffect(() => {

  // })

  return (
    <main className='main'>
      <TodoList tasks={TASKS}/>
    </main>
  );
}

export default App;
