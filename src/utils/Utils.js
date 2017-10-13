const Utils = {};

export const plainVocabObject = vocab => ({
  vocab: vocab.vocab,
  translation: vocab.translation,
  pron: vocab.pron,
  useSpeech: vocab.useSpeech,
  type: vocab.type,
  tags: vocab.tags,
  lang: vocab.lang,
});

export const parseJSONFromURIComponent = json => (
  JSON.parse(decodeURIComponent(json))
);

export const parseJSONToURIComponent = json => (
  encodeURIComponent(JSON.stringify(json))
);

export const removeStuffInVocab = val => (val.replace(/～/g, ''));

export default Utils;
