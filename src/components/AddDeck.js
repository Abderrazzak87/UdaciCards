import React, { Component } from 'react'
import { View, TextInput, KeyboardAvoidingView, Button, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { purple } from '../utils/colors'
import { createDeck } from '../actions/'

class AddDeck extends Component {

  state = {
    title: '',
  }

  saveDeck = () => {

    const { navigation, dispatch } = this.props
    const { title } = this.state

    dispatch(createDeck({ title: title, questions: [] }))
    navigation.navigate('DeckDetail', { deckTitle: title })
  }

  render() {

    return (

      <View style={{ flex: 1, justifyContent: 'space-around' }}>
        <KeyboardAvoidingView behavior="position" enabled>
          <Button
            onPress={this.saveDeck}
            color={purple}
            disabled={this.state.title == ''}
            title="Add Deck"
          />
          <TextInput
            style={styles.textInput}
            placeholder="Deck title"
            multiline={true}
            onChangeText={(title) => this.setState({ title })} />

        </KeyboardAvoidingView>
      </View >

    )

  }
}

export default connect()(AddDeck) 


const styles = StyleSheet.create({
  textInput: {
      borderWidth: 1, 
      borderColor: purple, 
      borderRadius: 5, 
      minHeight: 40, 
      padding: 10, 
      marginBottom: 100
  },
})
