import * as firebase from 'firebase';
import {
  apiKey,
  authDomain,
  databaseURL,
  storageBucket,
  messagingSenderId
} from 'react-native-dotenv';

const config = {
  apiKey,
  authDomain,
  databaseURL,
  storageBucket,
  messagingSenderId,
};

firebase.initializeApp(config);

export default firebase;
