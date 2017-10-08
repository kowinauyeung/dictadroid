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
    if (targetBook.vocabs) {
      Object.keys(targetBook.vocabs).forEach((key) => {
        updates[`/vocabs/${uid}/${key}`] = null;
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

let isDeletingLesson = false;
export const removeLesson = targetLesson => (
  () => {
    if (isDeletingLesson) return;
    isDeletingLesson = true;
    const updateData = {};
    updateData[`books/${uid}/${targetLesson.bookId}/lessons/${targetLesson.id}`] = null;
    updateData[`lessons/${uid}/${targetLesson.id}`] = null;
    if (targetLesson.vocabs) {
      Object.keys(targetLesson.vocabs).forEach((key) => {
        updateData[`/vocabs/${uid}/${key}`] = null;
      });
    }
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
  () => {
    if (!onLessonsChange) return;
    database.ref(`lessons/${uid}`)
      .orderByChild('bookId')
      .equalTo(bookId)
      .off('value', onLessonsChange);
    onLessonsChange = null;
  }
);


// vocabs action
export const setVocabs = vocabs => ({
  type: actionTypes.SET_VOCABS,
  vocabs,
});

let isAddingVocab = false;
export const addVocab = vocab => (
  () => {
    if (isAddingVocab) return;
    isAddingVocab = true;
    const newVocabRef = database.ref(`vocabs/${uid}`).push();
    const newVocabId = newVocabRef.key;
    const updateData = {};
    updateData[`vocabs/${uid}/${newVocabId}`] = {
      id: newVocabId,
      ...vocab,
    };
    updateData[`lessons/${uid}/${vocab.lessonId}/vocabs/${newVocabId}`] = true;
    updateData[`books/${uid}/${vocab.bookId}/vocabs/${newVocabId}`] = true;

    database.ref()
      .update(updateData)
      .then(() => {
        isAddingVocab = false;
      });
  }
);

let isDeletingVocab = false;
export const removeVocab = targetVocab => (
  () => {
    if (isDeletingVocab) return;
    isDeletingVocab = true;
    const updateData = {};
    updateData[`lessons/${uid}/${targetVocab.lessonId}/vocabs/${targetVocab.id}`] = null;
    updateData[`books/${uid}/${targetVocab.bookId}/vocabs/${targetVocab.id}`] = null;
    updateData[`vocabs/${uid}/${targetVocab.id}`] = null;
    database.ref()
      .update(updateData)
      .then(() => {
        isDeletingVocab = false;
      });
  }
);

let isEditingVocab = false;
export const editVocab = (targetVocab, vocab) => (
  () => {
    if (isEditingVocab) return;
    isEditingVocab = true;
    database.ref(`vocabs/${uid}/${targetVocab.id}`)
      .update(vocab)
      .then(() => {
        isEditingVocab = false;
      });
  }
);

let onVocabsChange = null;
export const listenToVocabs = lessonId => (
  (dispatch) => {
    if (onVocabsChange) return;
    dispatch(isFetchingVocabs(true));
    onVocabsChange = (snapshot) => {
      const val = snapshot.val() || {};
      dispatch(setVocabs(val));
      dispatch(isFetchingVocabs(false));
    };
    database.ref(`vocabs/${uid}`)
      .orderByChild('lessonId')
      .equalTo(lessonId)
      .on('value', onVocabsChange);
  }
);

export const unListenToVocabs = lessonId => (
  () => {
    if (!onVocabsChange) return;
    database.ref(`vocabs/${uid}`)
      .orderByChild('lessonId')
      .equalTo(lessonId)
      .off('value', onVocabsChange);
    onVocabsChange = null;
  }
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
