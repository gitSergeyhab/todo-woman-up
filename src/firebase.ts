import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';
import {firebaseConfig} from './super-secret-config';

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);