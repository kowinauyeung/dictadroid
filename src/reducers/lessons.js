import actionTypes from '../actions/actionTypes';

const initState = {
  l1: {
    id: 'l1',
    title: '第一課',
    vocabs: {
      v1: true,
      v2: true,
      v3: true,
    },
  },
  l2: {
    id: 'l2',
    title: '第二課',
    vocabs: {
      v1: true,
      v2: true,
      v3: true,
    },
  },
  l3: {
    id: 'l3',
    title: '第三課',
    vocabs: {
      v1: true,
      v2: true,
      v3: true,
    },
  },
};

const deleteLesson = (state, lessonId) => {
  const newState = { ...state };
  delete newState[lessonId];
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

const makeLessonObject = (state, lesson) => {
  const id = makeid();
  if (state[id]) return makeLessonObject(state, lesson);
  return {
    ...state,
    [id]: {
      ...lesson,
      id,
      vocabs: {},
    },
  };
};

const lessons = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.ADD_LESSON:
      return makeLessonObject(state, action.lesson);

    case actionTypes.REMOVE_LESSON:
      return deleteLesson(state, action.targetLesson.id);

    case actionTypes.EDIT_LESSON:
      return {
        ...state,
        [action.targetLesson.id]: {
          ...state[action.targetLesson.id],
          title: action.title,
        },
      };

    default:
      return state;
  }
};

export default lessons;
