import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyC8zz1xPr5A2NjLU7wGFxaoxhpQFLjPDTU",
    authDomain: "product-management-21.firebaseapp.com",
    databaseURL: "https://product-management-21.firebaseio.com",
    projectId: "product-management-21",
    storageBucket: "product-management-21.appspot.com",
    messagingSenderId: "752638458815"
  };

export default firebase.initializeApp(config);