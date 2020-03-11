import { fetchDecks, submitCard, submitDeck } from '../utils/api'

export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const ADD_DECK = 'ADD_DECK'
export const ADD_CARD = 'ADD_CARD'
export const ADD_QUIZ = 'ADD_QUIZ'
export const ADD_ANSWER = 'ADD_ANSWER'

export function receiveDecks (decks) {
    return {
      type: RECEIVE_DECKS,
      decks,
    }
  }
  
  function addDeck (deck) {
    return {
      type: ADD_DECK,
      deck,
    }
  }
  
  function addCard (card, deckTitle) {
    return {
      type: ADD_CARD,
      card,
      deckTitle
    }
  }
  
  export function addQuiz (quiz) {
    return {
      type: ADD_QUIZ,
      quiz
    }
  }
  
  export function addQuizAnswer (answer) {
    return {
      type: ADD_ANSWER,
      answer
    }
  }

  export function resetQuiz () {
    return async (dispatch) => {
      dispatch(addQuizAnswer({correctAnswers: 0, currentQuestion: 0, incorrectAnswers: 0}));
    }
  }
  
  export function createCard (card, deckTitle) {
    return async (dispatch) => {
      await submitCard(deckTitle, card)
      dispatch(addCard(card, deckTitle));
    }
  }
  
  export function createDeck (deck) {
    return (dispatch) => {
      submitDeck(deck.title, deck);
      dispatch(addDeck(deck));
    }
  }
  
  export function getDecks () {
    return (dispatch) => {
      fetchDecks()
        .then((decks) => dispatch(receiveDecks(decks)));
    }
  }
  