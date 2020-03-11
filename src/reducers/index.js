import { ADD_ANSWER
    , ADD_CARD
    , ADD_DECK
    , ADD_QUIZ
    , RECEIVE_DECKS } from '../actions/'

const store = {
    decks: {},
    quiz: {}
  }

  export default function reducer(state = store, action) {

    switch (action.type) {

        case RECEIVE_DECKS:
            return {
                ...state,
                decks: action.decks,
            }

        case ADD_DECK:
            return {
                ...state,
                decks: {
                    ...state.decks,
                    [action.deck.title]: action.deck
                }
            }

        case ADD_CARD:
            return {
                ...state,
                decks: {
                    ...state.decks,
                    [action.deckTitle]: {
                        ...state.decks[action.deckTitle],
                        questions: state.decks[action.deckTitle].questions.concat([action.card])
                    }
                }
            }

        case ADD_QUIZ:
            return {
                ...state,
                quiz: action.quiz
            }

        case ADD_ANSWER:
            return {
                ...state,
                quiz: {
                    ...state.quiz,
                    ...action.answer
                }
            }
        default:
            return state
    }
}