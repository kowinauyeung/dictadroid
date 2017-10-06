import actionTypes from './actionTypes';

// user action

export const setActiveBook = activeBookId => ({
  type: actionTypes.SET_ACTIVE_BOOK,
  activeBookId,
});


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
