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

export const isFetchingBooks = isFetching => ({
  type: actionTypes.IS_FETCHING_BOOKS,
  isFetching,
});

export const isFetchingLessons = isFetching => ({
  type: actionTypes.IS_FETCHING_LESSONS,
  isFetching,
});

export const isFetchingVocabs = isFetching => ({
  type: actionTypes.IS_FETCHING_VOCABS,
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
    if (targetBook.lessons) {
      Object.keys(targetBook.lessons).forEach((key) => {
        updates[`/lessons/${uid}/${key}`] = null;
      });
    }
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
      .update({ title, lang, transFrm })
      .then(() => {
        isEditingBook = false;
      });
  }
);

export const listenToBooks = () => (
  (dispatch) => {
    dispatch(isFetchingBooks(true));
    database.ref(`books/${uid}`)
      .on('value', (snapshot) => {
        const val = snapshot.val() || {};
        dispatch(setBooks(val));
        dispatch(isFetchingBooks(false));
        dispatch(getAppReady());
      });
  }
);


// lessons action

export const setLessons = lessons => ({
  type: actionTypes.SET_LESSONS,
  lessons,
});

let isDeletingLesson = false;
export const removeLesson = targetLesson => (
  () => {
    if (isDeletingLesson) return;
    isDeletingLesson = true;
    const updateData = {};
    updateData[`books/${uid}/${targetLesson.bookId}/lessons/${targetLesson.id}`] = null;
    updateData[`lessons/${uid}/${targetLesson.id}`] = null;
    database.ref()
      .update(updateData)
      .then(() => {
        isDeletingLesson = false;
      });
  }
);

let isEditingLesson = false;
export const editLesson = (targetLesson, title) => (
  () => {
    if (isEditingLesson) return;
    isEditingLesson = true;
    database.ref(`lessons/${uid}/${targetLesson.id}`)
      .update({
        title,
      })
      .then(() => {
        isEditingLesson = false;
      });
  }
);

let isAddingLesson = false;
export const addLesson = (targetBookId, title) => (
  () => {
    if (isAddingLesson) return;
    isAddingLesson = true;
    const newLessonRef = database.ref(`lessons/${uid}`).push();
    const newLessonId = newLessonRef.key;
    const updateData = {};
    updateData[`lessons/${uid}/${newLessonId}`] = {
      id: newLessonId,
      bookId: targetBookId,
      title,
    };
    updateData[`books/${uid}/${targetBookId}/lessons/${newLessonId}`] = true;

    database.ref()
      .update(updateData)
      .then(() => {
        isAddingLesson = false;
      });
  }
);

let onLessonsChange = null;
export const listenToLessons = bookId => (
  (dispatch) => {
    if (onLessonsChange) return;
    dispatch(isFetchingLessons(true));
    onLessonsChange = (snapshot) => {
      const val = snapshot.val() || {};
      dispatch(setLessons(val));
      dispatch(isFetchingLessons(false));
    };
    database.ref(`lessons/${uid}`)
      .orderByChild('bookId')
      .equalTo(bookId)
      .on('value', onLessonsChange);
  }
);

export const unListenToLessons = bookId => (
  (dispatch) => {
    if (!onLessonsChange) return;
    database.ref(`lessons/${uid}`)
      .orderByChild('bookId')
      .equalTo(bookId)
      .off('value', onLessonsChange);
    onLessonsChange = null;
    dispatch(setLessons({}));
  }
);


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
