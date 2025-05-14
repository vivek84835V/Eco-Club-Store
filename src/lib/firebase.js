import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyB54bi-hkeH__wLlHhbaJEoT5qXe77PmE0',
  authDomain: 'e-clo-auth.firebaseapp.com',
  projectId: 'e-clo-auth',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
