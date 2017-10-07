import actionTypes from '../actions/actionTypes';

const initState = {
  m1: {
    id: 'm1',
    title: '大家的日本語初級I',
    lang: 'ja',
    transFrm: 'zh',
    lessons: {
      l1: true,
      l2: true,
      l3: true,
    },
  },
  m2: {
    id: 'm2',
    title: '大家的日本語初級II',
    lang: 'ja',
    transFrm: 'zh',
    lessons: {
      l1: true,
      l2: true,
      l3: true,
    },
  },
  m3: {
    id: 'm3',
    title: '大家的日本語進階I',
    lang: 'ja',
    transFrm: 'zh',
    lessons: {
      l1: true,
      l2: true,
      l3: true,
    },
  },
  m4: {
    id: 'm4',
    title: '大家的日本語進階II',
    lang: 'ja',
    transFrm: 'zh',
    lessons: {
      l1: true,
      l2: true,
      l3: true,
    },
  },
};

const deleteBook = (state, bookId) => {
  const newState = { ...state };
  delete newState[bookId];
  return newState;
};

const makeid = () => {
  let text = '';
  const possible = 'abcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < 7; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
};

const makeBookObject = (state, book) => {
  const id = makeid();
  if (state[id]) return makeBookObject(state, book);
  return {
    ...state,
    [id]: {
      ...book,
      id,
    },
  };
};

const books = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.ADD_BOOK:
      return makeBookObject(state, action.book);

    case actionTypes.REMOVE_BOOK:
      return deleteBook(state, action.targetBook.id);

    case actionTypes.EDIT_BOOK:
      return {
        ...state,
        [action.targetBook.id]: {
          ...state[action.targetBook.id],
          title: action.title,
          lang: action.lang,
          transFrm: action.transFrm,
        },
      };

    default:
      return state;
  }
};

export default books;
