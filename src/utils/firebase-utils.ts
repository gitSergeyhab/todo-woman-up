import { addDoc, setDoc, collection, CollectionReference, deleteDoc, doc, onSnapshot, QuerySnapshot } from 'firebase/firestore';
import { Dispatch, SetStateAction } from 'react';
import { db } from '../firebase';
import { AddTaskType, FileTask, TaskType } from '../types/types';
import { storage } from '../firebase';
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';
import { getFileName } from './util';
import { ERROR_FILE_PATH, FIRESTORE_PATH_NAME } from '../const';


const todosCollection = collection(db, FIRESTORE_PATH_NAME) as CollectionReference<AddTaskType>;

type CBType = Dispatch<SetStateAction<boolean>>

/**
 * создает новую задачу в firebase db
 * @param task - объект с данными { title: string;
    description: string;
    date: string;
    isFinished: boolean;
    files: FileTask[];}
 * @param clear - колбек ф-ция, очищающая инпут в случае выполнения
 * @param setError колбек ф-ция, сигнализирующая об ошибке
 */

export const createTask = async(task: AddTaskType, clear: () => void, setError: CBType) => {
  try {
    await addDoc(collection(db, FIRESTORE_PATH_NAME), task);
    clear();
    setError(false);
  } catch {
    setError(true);
  }
};

/**
 * запрос на чтение из firebase db
 * @param setTasks - колбек ф-ция, добавляет задачи в стеййт в случае выполнения
 * @param setError колбек ф-ция, сигнализирующая об ошибке
 */

export const readTasks = (setTasks: Dispatch<SetStateAction<TaskType[]>>, setError: CBType, setLoading: CBType) => {
  try {
    onSnapshot(todosCollection, (snapshot: QuerySnapshot<AddTaskType>) => {
      const todos = snapshot.docs.map((item) => ({ id: item.id, ...item.data() }));
      setTasks(todos);
      setError(false);
      setLoading(false);
    });

  } catch {
    setError(true);
    setLoading(false);
  }
};


/**
 * обновляет задачу в firebase db
 * @param id - ID обновляемой задачи
 * @param data  - объект с данными для обновления { title: string;
    description: string;
    date: string;
    isFinished: boolean;
    files: FileTask[];}
 * @param setError - колбек ф-ция, сигнализирующая об ошибке
 * @param setRead - колбек ф-ция, меняющая визуальную форму задачи с MUTATE на READ
 */

export const updateTask = async(id: string, data: AddTaskType, setError: CBType, setRead: () => void) => {
  try {
    const updatingTask = doc(db, `${FIRESTORE_PATH_NAME}/${id}`);
    await setDoc(updatingTask, data, { merge: true });
    setError(false);
    setRead();
  } catch {
    setError(true);
  }
};

/**
 * удаляет задачу из firebase db
 * @param id  - ID удаляемой задачи
 * @param setError - колбек ф-ция, сигнализирующая об ошибке
 */

export const deleteTask = async(id: string, setError: CBType) => {
  try {
    const deletingTask = doc(db, `${FIRESTORE_PATH_NAME}/${id}`);
    await deleteDoc(deletingTask);
    setError(false);
  } catch {
    setError(true);
  }
};


/**
 * загружает файл в firebase/storage и возвращает промис url с загруженым файлом
 * @param dirName - имя папки файла
 * @param file - загружаемый файл
 * @returns url с загруженым файлом
 */

export const getHref = async(dirName: string, file: File) => {

  const filename = getFileName(dirName, file);
  const fileRef = ref(storage, filename);
  const snapshot = await uploadBytes(fileRef, file);
  const url = await getDownloadURL(snapshot.ref);

  return url;
};


/**
 * загружает файлы в firebase/storage и возвращает промис массив объектов {name, href}: - name имя файла, href - путь
 * @param dirName  - имя папки файла
 * @param files  - загружаемые файлы
 * @returns массив {name, href}[]: - name имя файла, href - путь
 */

export const uploadFiles = async (dirName: string, files: FileList) => {

  const fileData: FileTask[] = [];

  for (const file of files) {
    try {
      const href = await getHref(dirName, file);
      fileData.push({href, name: file.name});
    } catch {
      fileData.push({href: ERROR_FILE_PATH, name: `${file.name} - не загружен.txt` });
    }
  }

  return fileData;
};
