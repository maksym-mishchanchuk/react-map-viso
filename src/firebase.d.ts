declare module 'firebase/app' {
  import { firestore } from 'firebase/firestore';
  export interface FirebaseApp {
    firestore?(): firestore.Firestore;
  }

  export class initializeApp {
    constructor(firebaseConfig: {
      storageBucket: string;
      apiKey: string;
      messagingSenderId: string;
      appId: string;
      projectId: string;
      measurementId: string;
      authDomain: string
    }) {
      
    }

  }
}
