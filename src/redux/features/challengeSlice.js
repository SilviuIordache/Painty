import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  challengeWords: [],
  currentWord: '',
  roundCurrent: 1,
  roundTotal: 3,
  roundTime: 30,
  timer: 30
};

export const challengeSlice = createSlice({
  name: 'challenge',
  initialState,
  reducers: {
    initialiseChallengeMode: (state) => {
      state.roundCurrent = 1;
      state.challengeWords = generateRandomWords(3);
    },
    setCurrentWord: (state) => {
      state.currentWord = state.challengeWords[state.roundCurrent - 1];
    },
    incrementRound: (state) => {
      state.roundCurrent += 1;
    },
    updateTimer: (state) => {
      state.timer -= 1;
    },
    resetTimer: (state) => {
      state.timer = state.roundTime;
    }
  },
});

function generateRandomWords(amount) {
  const words = require('../../jsons/words.json').list;

  // generate unique random index numbers
  const randomIndexes = [];
  while (randomIndexes.length < amount) {
    const randomNumber = Math.floor(Math.random() * words.length) + 1;
    if (randomIndexes.indexOf(randomNumber) === -1) {
      randomIndexes.push(randomNumber);
    }
  }

  // populate words array with words found at above indexes
  let wordsArray = [];
  randomIndexes.forEach((num) => {
    wordsArray.push(words[num]);
  });

  return wordsArray;
}

export const { initialiseChallengeMode, setCurrentWord, incrementRound, updateTimer, resetTimer } =
  challengeSlice.actions;
export default challengeSlice.reducer;
