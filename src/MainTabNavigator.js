import React from "react"
import { createStackNavigator } from "react-navigation-stack"
import { createBottomTabNavigator } from "react-navigation-tabs"

import { Icon  } from "native-base"

import DecksList from './components/DecksList'
import DeckDetail from './components/DeckDetail'
import AddDeck from './components/AddDeck'
import AddCard from './components/AddCard'
import Quiz from './components/Quiz'
import QuizResults from './components/QuizResults'

import { white, purple } from './utils/colors'


const navOptionHandler = (navigation) => ({
    header: null,
})


const DecksStack = createStackNavigator({
    home: {
      screen: DecksList,
      navigationOptions: navOptionHandler,
    },

    DeckDetail: {
        screen: DeckDetail,
        navigationOptions: () => ({
            headerTintColor: white,
            headerStyle: {
              backgroundColor: purple,
            },
        }),
    },

    AddCard: {
        screen: AddCard,
        navigationOptions: () => ({
          headerTintColor: white,
          headerStyle: {
            backgroundColor: purple,
          },
        }),
    },

    Quiz: {
        screen: Quiz,
        navigationOptions: ({ navigation }) => ({
          title: `Quiz: ${navigation.state.params.deckTitle}`,
          headerTintColor: white,
          headerStyle: {
            backgroundColor: purple,
          },
        }),
    },

    QuizResults: {
        screen: QuizResults,
        navigationOptions: ({ navigation }) => ({
          title: `Quiz Results: ${navigation.state.params.deckTitle}`,
          headerTintColor: white,
          headerStyle: {
            backgroundColor: purple,
          },
        }),
    }
  
})

DecksStack.navigationOptions = {
    tabBarLabel: "Decks",
    tabBarIcon: ({ focused }) => (
        <Icon name="home" size={25} color={"#000"}/>
    )
}

const AddDeckStack = createStackNavigator({
    AddDeck: {
        screen: AddDeck,
        navigationOptions: () => ({
         title: 'Add Deck',
        headerTintColor: white,
        headerStyle: {
             backgroundColor: purple,
        },
        }),
    }
})

AddDeckStack.navigationOptions = {
    tabBarLabel: "Decks",
    tabBarIcon: ({ focused }) => (
        <Icon name="add" size={25} color={"#000"}/>
    )
}


export const BottomTabNavigator = createBottomTabNavigator({
    DecksStack,
    AddDeckStack
})
  