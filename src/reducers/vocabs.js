import actionTypes from '../actions/actionTypes';

const initState = {
  thisisavocab01: {
    id: 'thisisavocab01',
    vocab: '開きます',
    translation: '開',
    pron: 'あきます',
    useSpeech: true,
    lesson: 'l1',
    type: 'v',
    tags: ['他動詞', '一段動詞'],
  },
  thisisavocab02: {
    id: 'thisisavocab02',
    vocab: '始まる',
    translation: '開始',
    pron: 'はじまる',
    useSpeech: false,
    lesson: 'l1',
    type: 'v',
    tags: ['自動詞'],
  },
  thisisavocab03: {
    id: 'thisisavocab03',
    vocab: 'そのまま',
    translation: '就這樣',
    pron: '',
    useSpeech: false,
    lesson: 'l1',
    type: 'n',
    tags: ['名詞'],
  },
  thisisavocab04: {
    id: 'thisisavocab04',
    vocab: 'パーティー',
    translation: 'Party',
    pron: '',
    useSpeech: false,
    lesson: 'l1',
    type: 'n',
    tags: [],
  },
  thisisavocab05: {
    id: 'thisisavocab05',
    vocab: '拭く',
    translation: '擦',
    pron: 'ふく',
    useSpeech: false,
    lesson: 'l1',
    type: 'v',
    tags: ['名詞', '名詞'],
  },
  thisisavocab06: {
    id: 'thisisavocab06',
    vocab: '思う',
    translation: '想',
    pron: 'おもう',
    useSpeech: false,
    lesson: 'l1',
    type: 'v',
    tags: ['他動詞', '一段動詞'],
  },
  thisisavocab07: {
    id: 'thisisavocab07',
    vocab: '貼ります',
    translation: '貼',
    pron: 'はります',
    useSpeech: false,
    lesson: 'l1',
    type: 'v',
    tags: ['他動詞', '一段動詞'],
  },
  thisisavocab08: {
    id: 'thisisavocab08',
    vocab: '掛けます',
    translation: '掛',
    pron: 'かけます',
    useSpeech: false,
    lesson: 'l1',
    type: 'v',
    tags: ['他動詞', '一段動詞'],
  },
  thisisavocab09: {
    id: 'thisisavocab09',
    vocab: '並べます',
    translation: '並排',
    pron: 'ならべます',
    useSpeech: false,
    lesson: 'l1',
    type: 'v',
    tags: ['他動詞', '一段動詞'],
  },
  thisisavocab10: {
    id: 'thisisavocab10',
    vocab: '植えます',
    translation: '種植',
    pron: 'うえます',
    useSpeech: false,
    lesson: 'l1',
    type: 'v',
    tags: ['他動詞', '一段動詞'],
  },

  thisisavocab11: {
    id: 'thisisavocab11',
    vocab: '予習します',
    translation: '預習',
    pron: 'よしゅうします',
    useSpeech: false,
    lesson: 'l1',
    type: 'v',
    tags: ['他動詞', '一段動詞'],
  },
  thisisavocab12: {
    id: 'thisisavocab12',
    vocab: '授業',
    translation: '授課',
    pron: 'じゅぎょう',
    useSpeech: false,
    lesson: 'l1',
    type: 'n',
    tags: ['他動詞', '一段動詞'],
  },
  thisisavocab13: {
    id: 'thisisavocab13',
    vocab: '花瓶',
    translation: '花瓶',
    pron: 'かびん',
    useSpeech: false,
    lesson: 'l1',
    type: 'n',
    tags: ['他動詞'],
  },
  thisisavocab14: {
    id: 'thisisavocab14',
    vocab: '非常袋',
    translation: '避難袋',
    pron: 'ひじょうぶくろ',
    useSpeech: false,
    lesson: 'l1',
    type: 'v',
    tags: ['他動詞', '一段動詞'],
  },
  thisisavocab15: {
    id: 'thisisavocab15',
    vocab: '懐中電灯',
    translation: '手電筒',
    pron: 'かいちゅうでんとう',
    useSpeech: false,
    lesson: 'l1',
    type: 'v',
    tags: ['他動詞', '一段動詞'],
  },
};

const deleteVocab = (state, vocabId) => {
  const newState = { ...state };
  delete newState[vocabId];
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

const makeVocabObject = (state, vocab) => {
  const id = makeid();
  if (state[id]) return makeVocabObject(state, vocab);
  return {
    ...state,
    [id]: {
      ...vocab,
      id,
    },
  };
};

const vocabs = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.ADD_VOCAB:
      return makeVocabObject(state, action.vocab);

    case actionTypes.DELETE_VOCAB:
      return deleteVocab(state, action.targetVocabId);

    case actionTypes.EDIT_VOCAB:
      return {
        ...state,
        [action.targetVocab.id]: {
          ...state[action.targetVocab.id],
          vocab: action.vocab,
          translation: action.translation,
          pron: action.pron,
          useSpeech: action.useSpeech,
          type: action.vocabType,
          tags: action.tags,
        },
      };

    default:
      return state;
  }
};

export default vocabs;
