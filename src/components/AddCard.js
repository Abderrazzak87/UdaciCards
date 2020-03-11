import React, { Component } from 'react'
import { View, TextInput, KeyboardAvoidingView, Button, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { purple } from '../utils/colors'
import { createCard } from '../actions/'

class AddCard extends Component {

    state = { 
        question: '', 
        answer: '' 
    }

    static navigationOptions = ({ navigation }) => {
        const { deck } = navigation.state.params
    
        return {
          title: 'Add new card'
        }
    }

    addCard = () => {
        const { navigation, dispatch } = this.props
        const { question, answer } = this.state
        const { deck } = navigation.state.params
    
        dispatch(createCard({ question, answer }, deck.title))
        navigation.goBack()
    }

    render () {

        const { question, answer } = this.state

        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: 2, justifyContent: 'space-around' }}>
                    <KeyboardAvoidingView behavior="position" enabled>
                        <Button
                            onPress={this.addCard}
                            color={purple}
                            disabled={answer === '' || question === ''}
                            title="Add card"
                        />
                        <TextInput
                            style={styles.textInput}
                            placeholder="Question"
                            multiline={true}
                            onChangeText={(text) => this.setState({ question: text })} />
                        <TextInput
                            style={styles.textInput}
                            placeholder="Answer"
                            multiline={true}
                            onChangeText={(text) => this.setState({ answer: text })} />
                    </KeyboardAvoidingView>
                </View >
            </View >

        )
    }
}

export default  connect()(AddCard)

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
