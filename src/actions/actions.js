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
  dispatch => (
    database.ref(`users/${uid}/activeBookId`)
      .set(activeBookId)
      .then(() => {
        dispatch({
          type: actionTypes.SET_ACTIVE_BOOK,
          activeBookId,
        });
        return activeBookId;
      })
  )
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

export const addBook = book => (
  () => {
    const newBookRef = database.ref(`books/${uid}`).push();
    return newBookRef.set({
      id: newBookRef.key,
      ...book,
    }).then(() => newBookRef.key);
  }
);

export const removeBook = targetBook => (
  () => {
    const updates = {};
    updates[`/books/${uid}/${targetBook.id}`] = null;
    if (targetBook.lessons) {
      Object.keys(targetBook.lessons).forEach((key) => {
        updates[`/lessons/${uid}/${key}`] = null;
      });
    }
    if (targetBook.vocabs) {
      Object.keys(targetBook.vocabs).forEach((key) => {
        updates[`/vocabs/${uid}/${key}`] = null;
      });
    }
    return database.ref()
      .update(updates)
      .then(() => targetBook);
  }
);

export const editBook = (targetBook, title, lang, transFrm) => (
  () => (
    database.ref(`books/${uid}/${targetBook.id}`)
      .update({ title, lang, transFrm })
      .then(() => targetBook)
  )
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

export const addLesson = (targetBookId, title) => (
  () => {
    const newLessonRef = database.ref(`lessons/${uid}`).push();
    const newLessonId = newLessonRef.key;
    const updateData = {};
    updateData[`lessons/${uid}/${newLessonId}`] = {
      id: newLessonId,
      bookId: targetBookId,
      title,
    };
    updateData[`books/${uid}/${targetBookId}/lessons/${newLessonId}`] = true;
    return database.ref()
      .update(updateData)
      .then(() => newLessonId);
  }
);

export const removeLesson = targetLesson => (
  () => {
    const updateData = {};
    updateData[`books/${uid}/${targetLesson.bookId}/lessons/${targetLesson.id}`] = null;
    updateData[`lessons/${uid}/${targetLesson.id}`] = null;
    if (targetLesson.vocabs) {
      Object.keys(targetLesson.vocabs).forEach((key) => {
        updateData[`/vocabs/${uid}/${key}`] = null;
        updateData[`/books/${uid}/${targetLesson.bookId}/vocabs/${key}`] = null;
      });
    }
    return database.ref()
      .update(updateData)
      .then(() => targetLesson);
  }
);

export const editLesson = (targetLesson, title) => (
  () => (
    database.ref(`lessons/${uid}/${targetLesson.id}`)
      .update({ title })
      .then(() => targetLesson)
  )
);

export const listenToLessons = bookId => (
  (dispatch) => {
    dispatch(isFetchingLessons(true));
    const onLessonsChange = (snapshot) => {
      const val = snapshot.val() || {};
      dispatch(setLessons(val));
      dispatch(isFetchingLessons(false));
    };
    database.ref(`lessons/${uid}`)
      .orderByChild('bookId')
      .equalTo(bookId)
      .on('value', onLessonsChange);
    return onLessonsChange;
  }
);

export const unListenToLessons = (bookId, listener) => (
  () => (
    database.ref(`lessons/${uid}`)
      .orderByChild('bookId')
      .equalTo(bookId)
      .off('value', listener)
  )
);


// vocabs action
export const setVocabs = vocabs => ({
  type: actionTypes.SET_VOCABS,
  vocabs,
});

export const addVocab = vocab => (
  () => {
    const newVocabRef = database.ref(`vocabs/${uid}`).push();
    const newVocabId = newVocabRef.key;
    const updateData = {};
    updateData[`vocabs/${uid}/${newVocabId}`] = {
      id: newVocabId,
      ...vocab,
    };
    updateData[`lessons/${uid}/${vocab.lessonId}/vocabs/${newVocabId}`] = true;
    updateData[`books/${uid}/${vocab.bookId}/vocabs/${newVocabId}`] = true;

    return database.ref()
      .update(updateData)
      .then(() => newVocabId);
  }
);

export const removeVocab = targetVocab => (
  () => {
    const updateData = {};
    updateData[`lessons/${uid}/${targetVocab.lessonId}/vocabs/${targetVocab.id}`] = null;
    updateData[`books/${uid}/${targetVocab.bookId}/vocabs/${targetVocab.id}`] = null;
    updateData[`vocabs/${uid}/${targetVocab.id}`] = null;
    return database.ref()
      .update(updateData)
      .then(() => targetVocab);
  }
);

export const editVocab = (targetVocab, vocab) => (
  () => (
    database.ref(`vocabs/${uid}/${targetVocab.id}`)
      .update(vocab)
      .then(() => targetVocab)
  )
);

export const listenToVocabs = lessonId => (
  (dispatch) => {
    dispatch(isFetchingVocabs(true));
    const onVocabsChange = (snapshot) => {
      const val = snapshot.val() || {};
      dispatch(setVocabs(val));
      dispatch(isFetchingVocabs(false));
    };
    database.ref(`vocabs/${uid}`)
      .orderByChild('lessonId')
      .equalTo(lessonId)
      .on('value', onVocabsChange);
    return onVocabsChange;
  }
);

export const unListenToVocabs = (lessonId, listener) => (
  () => (
    database.ref(`vocabs/${uid}`)
      .orderByChild('lessonId')
      .equalTo(lessonId)
      .off('value', listener)
  )
);


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
