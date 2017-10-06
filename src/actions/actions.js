import actionTypes from './actionTypes';
import firebase, { database } from '../utils/Firebase';


// user action
export const setActiveBook = activeBookId => ({
  type: actionTypes.SET_ACTIVE_BOOK,
  activeBookId,
});

export const login = user => ({
  type: actionTypes.LOGIN,
  user: {
    id: user.id,
    displayName: user.displayName,
    email: user.email,
    photoURL: user.photoURL,
    activeBookId: user.activeBookId,
  },
});

export const logout = () => ({
  type: actionTypes.LOGOUT,
});

export const loginWithGoogle = () => (
  () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  }
);

export const loginWithFacebook = () => (
  () => {
    const provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(provider);
  }
);

export const loginWithTwitter = () => (
  () => {
    const provider = new firebase.auth.TwitterAuthProvider();
    firebase.auth().signInWithPopup(provider);
  }
);

export const loginWithGithub = () => (
  () => {
    const provider = new firebase.auth.GithubAuthProvider();
    firebase.auth().signInWithPopup(provider);
  }
);

export const logoutOfFirebase = () => (
  () => {
    firebase.auth().signOut();
  }
);

export const showLoading = () => ({
  type: actionTypes.SHOW_LOADING,
});

export const hideLoading = () => ({
  type: actionTypes.HIDE_LOADING,
});

export const initApp = () => (
  (dispatch) => {
    dispatch(showLoading());
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const userRef = `user/${user.uid}`;
        const userObj = {
          id: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          activeBookId: null,
        };
        database.ref(userRef)
          .once('value')
          .then((snapshot) => {
            if (snapshot.val()) {
              userObj.activeBookId = snapshot.activeBookId || null;
            }
            database.ref(userRef).set(userObj);
            dispatch(login(userObj));
            dispatch(hideLoading());
          });
      } else {
        dispatch(logout());
        dispatch(hideLoading());
      }
    });
  }
);


// books action

export const addBook = book => ({
  type: actionTypes.ADD_BOOK,
  book,
});

export const removeBook = targetBook => ({
  type: actionTypes.REMOVE_BOOK,
  targetBook,
});

export const editBook = (targetBook, title, lang, transFrm) => ({
  type: actionTypes.EDIT_BOOK,
  targetBook,
  title,
  lang,
  transFrm,
});


// lessons action

export const addLesson = (targetBookId, title) => ({
  type: actionTypes.ADD_LESSON,
  lesson: {
    targetBookId,
    title,
  },
});

export const removeLesson = targetLesson => ({
  type: actionTypes.REMOVE_LESSON,
  targetLesson,
});

export const editLesson = (targetLesson, title) => ({
  type: actionTypes.EDIT_LESSON,
  targetLesson,
  title,
});


// vocabs action
export const addVocab = vocab => ({
  type: actionTypes.ADD_VOCAB,
  vocab,
});

export const removeVocab = targetVocab => ({
  type: actionTypes.REMOVE_VOCAB,
  targetVocab,
});

export const editVocab = (targetVocab, vocab) => ({
  type: actionTypes.EDIT_VOCAB,
  targetVocab,
  vocab: vocab.formVocab,
  translation: vocab.formTranslation,
  pron: vocab.formPron,
  useSpeech: vocab.formUseSpeech,
  vocabType: vocab.formType,
  tags: vocab.formTags,
});
