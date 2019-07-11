import firebase from 'firebase/app';
import 'firebase/firebase-storage';

const firebaseConfig = {
  apiKey: '',
  authDomain: 'graffiti-wall-cd293.firebaseapp.com',
  databaseURL: 'https://graffiti-wall-cd293.firebaseio.com',
  projectId: 'graffiti-wall-cd293',
  storageBucket: 'gs://graffiti-wall-cd293.appspot.com',
  messagingSenderId: '',
  appId: '',
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage().ref();

export { storage };
