import * as firebase from 'firebase';
  // Your web app's Firebase configuration
  const firebaseConfig = {
    
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const database = firebase.database();
  const auth = firebase.auth();

  export { database, auth }