import React, { Component } from 'react'
import { View, Text, Button, StyleSheet} from 'react-native'
import { connect } from 'react-redux'
import { addQuiz } from '../actions/'
import TextButton from './TextButton'
import { black, gray, red, white } from '../utils/colors'



class DeckDetail extends Component {

    static navigationOptions = ({ navigation }) => {
        const { deckTitle } = navigation.state.params
    
        return {
          title: deckTitle
        }
    }

    startQuiz = () => {
        const { navigation, dispatch, deck } = this.props

        dispatch(addQuiz(Object.assign({
          currentQuestion: 0,
          correctAnswers: 0,
          incorrectAnswers: 0
        }, deck)))
        
        navigation.navigate('Quiz', { deckTitle: deck.title })
    }

    render () {

        const { navigation, deck } = this.props

        return (

            <View style={styles.item}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.title}>{deck.title}</Text>
                    <Text style={styles.itemCardsCount}>{deck.questions.length} Cards</Text>
                </View>
                <View style={{ flex: 1 }}>
                    {
                        (deck.questions.length > 0) &&
                         <TextButton children='Start Quiz' style={{ fontSize: 20 }} onPress={this.startQuiz}/>
                          
                    }
                </View>
                <Button
                    onPress={() => navigation.navigate('AddCard', { deck })}
                    title="Add new card"
                    color={red} />
            </View>

        )
    }
}

function mapStateToProps (state, { navigation }) {

    const { deckTitle } = navigation.state.params

    return {
      deck: state.decks[deckTitle]
    }
}


export default  connect(mapStateToProps)(DeckDetail) 

const styles = StyleSheet.create({
    item: {
      flex: 1,
      backgroundColor: white,
      borderRadius: 10,
      margin: 5,
      alignItems: 'center',
    },
    title: {
      color: black,
      fontSize: 50,
      textAlign: 'center',
      marginTop: 50
    },
    itemCardsCount: {
      color: gray,
      fontSize: 20,
      textAlign: 'center',
      marginBottom: 10
    }
})
