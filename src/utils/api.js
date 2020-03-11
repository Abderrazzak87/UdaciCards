import { AsyncStorage } from 'react-native'
import { UDACICARDS_STORAGE_KEY, formatResults } from './_DATA'

export async function getItemByKey(key) {
    const decks = await AsyncStorage.getItem(UDACICARDS_STORAGE_KEY)
      .then(formatResults)
    return  decks[key]
  }

export function fetchDecks ( ){
  return AsyncStorage.getItem(UDACICARDS_STORAGE_KEY)
    .then(formatResults)
}

export async function submitCard (key, card) {
    const deck = await getItemByKey(key)
    deck.questions.push(card)
    submitDeck(key, deck)
  }

export function submitDeck (key, deck) {
  return AsyncStorage.mergeItem(UDACICARDS_STORAGE_KEY, JSON.stringify({
    [key]: deck
  }))
}



