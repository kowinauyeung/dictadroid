import actionTypes from './actionTypes';
import firebase, { database } from '../utils/Firebase';

let uid = null;

// app actions 

export const showLoading = () => ({
  type: actionTypes.SHOW_LOADING,
});

export const hideLoading = () => ({
  type: actionTypes.HIDE_LOADING,
});

export const isFetchingBook = isFetching => ({
  type: actionTypes.IS_FETCHING_BOOKS,
  isFetching,
});

export const getAppReady = () => ({
  type: actionTypes.GET_APP_READY,
});


// user actions
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

export const setActiveBook = activeBookId => (
  (dispatch) => {
    database.ref(`users/${uid}/activeBookId`)
      .set(activeBookId)
      .then(() => {
        dispatch({
          type: actionTypes.SET_ACTIVE_BOOK,
          activeBookId,
        });
      });
  }
);

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
  (dispatch) => {
    dispatch(showLoading());
    firebase.auth()
      .signOut()
      .then(() => {
        dispatch(hideLoading());
      });
  }
);


// books action

export const setBooks = books => ({
  type: actionTypes.SET_BOOKS,
  books,
});

let isAddingBook = false;
export const addBook = book => (
  () => {
    if (isAddingBook) return;
    isAddingBook = true;
    const newBookRef = database.ref(`books/${uid}`).push();
    newBookRef.set({
      id: newBookRef.key,
      ...book,
    }).then(() => {
      isAddingBook = false;
    });
  }
);

let isDeletingBook = false;
export const removeBook = targetBook => (
  () => {
    if (isDeletingBook) return;
    isDeletingBook = true;
    const updates = {};
    updates[`/books/${uid}/${targetBook.id}`] = null;
    database.ref()
      .update(updates)
      .then(() => {
        isDeletingBook = false;
      });
  }
);

let isEditingBook = false;

export const editBook = (targetBook, title, lang, transFrm) => (
  () => {
    if (isEditingBook) return;
    isEditingBook = true;
    database.ref(`books/${uid}/${targetBook.id}`)
      .set({ id: targetBook.id, title, lang, transFrm })
      .then(() => {
        isEditingBook = false;
      });
  }
);

export const listenToBooks = () => (
  (dispatch) => {
    dispatch(isFetchingBook(true));
    database.ref(`books/${uid}`)
      .on('value', (snapshot) => {
        const val = snapshot.val() || {};
        dispatch(setBooks(val));
        dispatch(isFetchingBook(false));
        dispatch(getAppReady());
      });
  }
);


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

export const initApp = () => (
  (dispatch) => {
    dispatch(showLoading());
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const userRef = `users/${user.uid}`;
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
              userObj.activeBookId = snapshot.val().activeBookId || null;
            }
            uid = userObj.id;
            database.ref(userRef).set(userObj);
            dispatch(login(userObj));
            dispatch(hideLoading());
            dispatch(listenToBooks());
          });
      } else {
        uid = null;
        dispatch(logout());
        dispatch(hideLoading());
      }
    });
  }
);
