import { addDoc, setDoc, collection, CollectionReference, deleteDoc, doc, onSnapshot, QuerySnapshot } from 'firebase/firestore';
import { Dispatch, SetStateAction } from 'react';
import { db } from '../firebase';
import { AddTaskType, FileTask, TaskType } from '../types/types';
import { storage } from '../firebase';
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';
import { getFileName } from './util';
import { ERROR_FILE_PATH, FIRESTORE_PATH_NAME } from '../const';


const todosCollection = collection(db, FIRESTORE_PATH_NAME) as CollectionReference<AddTaskType>;

type ErrorType = Dispatch<SetStateAction<boolean>>

export const createTask = async(task: AddTaskType, clear: () => void, setError: ErrorType) => {
  try {
    await addDoc(collection(db, FIRESTORE_PATH_NAME), task);
    clear();
    setError(false);
  } catch {
    setError(true);
  }
};


export const readTasks = (setTasks: Dispatch<SetStateAction<TaskType[]>>, setError: ErrorType) => {
  try {
    onSnapshot(todosCollection, (snapshot: QuerySnapshot<AddTaskType>) => {
      const todos = snapshot.docs.map((item) => ({ id: item.id, ...item.data() }));
      setTasks(todos);
    });
    setError(false);
  } catch {
    setError(true);
  }
};

export const updateTask = async(id: string, data: AddTaskType, setError: ErrorType, setRead: () => void) => {
  try {
    const updatingTask = doc(db, `${FIRESTORE_PATH_NAME}/${id}`);
    await setDoc(updatingTask, data, { merge: true });
    setError(false);
    setRead();
  } catch {
    setError(true);
  }
};


export const deleteTask = async(id: string, setError: ErrorType) => {
  try {
    const deletingTask = doc(db, `${FIRESTORE_PATH_NAME}/${id}`);
    await deleteDoc(deletingTask);
    setError(false);
  } catch {
    setError(true);
  }
};

export const getHref = async(dirName: string, file: File) => {

  const filename = getFileName(dirName, file);
  const fileRef = ref(storage, filename);
  const snapshot = await uploadBytes(fileRef, file);
  const url = await getDownloadURL(snapshot.ref);

  return url;
};

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
