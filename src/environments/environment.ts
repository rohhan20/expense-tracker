import { initializeApp } from 'firebase/app';
import { getAuth, setPersistence, browserLocalPersistence } from 'firebase/auth';

export const environment = {
    production: false,
    firebaseConfig: {
        apiKey: "AIzaSyDz-j2JgQSdcWT6-DSoEjd0_H47IVz3SUU",
        authDomain: "expense-tracker-977fe.firebaseapp.com",
        projectId: "expense-tracker-977fe",
        storageBucket: "expense-tracker-977fe.firebasestorage.app",
        messagingSenderId: "624781238931",
        appId: "1:624781238931:web:070c6b28e20917ead7e366"
      }
};

// Initialize Firebase and set persistence
const app = initializeApp(environment.firebaseConfig);
const auth = getAuth(app);
setPersistence(auth, browserLocalPersistence);