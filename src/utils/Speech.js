import { removeStuffInVocab } from './Utils';

const responsiveVoice = window.responsiveVoice;
const Speech = {};

const langMap = {
  en: 'UK English Female',
  zh: 'Chinese (Hong Kong) Female',
  ja: 'Japanese Female',
};

Speech.pron = (vocab, lang) => {
  const voice = langMap[lang];
  const text = (vocab.useSpeech && vocab.pron) ? vocab.pron : vocab.vocab;
  if (responsiveVoice.isPlaying()) responsiveVoice.cancel();
  responsiveVoice.cancel();
  responsiveVoice.speak(removeStuffInVocab(text), voice);
};

Speech.trans = (vocab, lang) => {
  const voice = langMap[lang];
  if (responsiveVoice.isPlaying()) responsiveVoice.cancel();
  responsiveVoice.cancel();
  responsiveVoice.speak(removeStuffInVocab(vocab.translation), voice);
};

Speech.speak = (text, lang) => {
  const voice = langMap[lang];
  responsiveVoice.cancel();
  responsiveVoice.speak(removeStuffInVocab(text), voice);
};

export default Speech;
