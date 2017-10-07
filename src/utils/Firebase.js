import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyAxA8tx8Zny-lXFGwk-0dTG9np_lmb2mI0',
  authDomain: 'dictadroid.firebaseapp.com',
  databaseURL: 'https://dictadroid.firebaseio.com',
};

firebase.initializeApp(config);

export const database = firebase.database();

export default firebase;
