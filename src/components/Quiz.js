import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text ,Button, StyleSheet,  Animated  } from 'react-native'


import TextButton from './TextButton'
import { addQuizAnswer } from '../actions/'
import { gray, green, black, red } from '../utils/colors'

class Quiz extends Component {

    state = {
        bounceValue: new Animated.Value(1),
        showingQuestion: true
    }

    toggleShowQuestion = () => {

        const { showingQuestion, bounceValue } = this.state
        
        Animated.sequence([
          Animated.timing(bounceValue, { duration: 120, toValue: 1.04}),
          Animated.timing(bounceValue, { duration: 120, toValue: 1})
        ]).start()
    
        this.setState({ showingQuestion: !showingQuestion })
    }

    setCorrect = () => {
        const { correctAnswers, currentQuestion, incorrectAnswers, dispatch } = this.props
        dispatch(addQuizAnswer({ correctAnswers: correctAnswers + 1, currentQuestion: currentQuestion + 1, incorrectAnswers }))
    }
    
    setIncorrect = () => {
        const { currentQuestion, correctAnswers, incorrectAnswers, dispatch } = this.props
        dispatch(addQuizAnswer({ correctAnswers, currentQuestion: currentQuestion + 1, incorrectAnswers: incorrectAnswers + 1 }))
    }

    render() {

        const { quiz, currentQuestion, totalQuestions, navigation } = this.props
        const { bounceValue, showingQuestion } = this.state
        const { deckTitle } = navigation.state.params

        if (currentQuestion === totalQuestions) {
            return navigation.navigate('QuizResults', { quiz, deckTitle })
        }

        return (
            <View style={styles.item}>
                <View style={{ flex: 2 }}>
                    <Text style={styles.itemCardsCount}>{currentQuestion}/{totalQuestions}</Text>
                    <View style={styles.questionContainer}>
                        <Animated.Text
                            style={[styles.question, { transform: [{ scale: bounceValue }] }]}>
                            {showingQuestion ? quiz.questions[currentQuestion].question : quiz.questions[currentQuestion].answer}
                        </Animated.Text>
                    </View>
                </View>
                <View style={{ flex: 1 }}>
                    <TextButton onPress={this.toggleShowQuestion}>
                        {showingQuestion ? 'Show answer' : 'Show question'}
                    </TextButton>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', margin: 50, alignItems: 'stretch' }}>
                    <Button
                        onPress={this.setCorrect}
                        title="Correct"
                        color={green} />
                    <Button
                        onPress={this.setIncorrect}
                        title="Incorrect"
                        color={red} />
                </View>
            </View>
        )
    }
}

function mapStateToProps (state) {
    return {
      quiz: state.quiz,
      totalQuestions: state.quiz.questions.length,
      currentQuestion: state.quiz.currentQuestion,
      correctAnswers: state.quiz.correctAnswers,
      incorrectAnswers: state.quiz.incorrectAnswers
    }
  }

export default  connect(mapStateToProps)(Quiz)

const styles = StyleSheet.create({
    questionContainer: {
      flex: 1,
      justifyContent: 'center',
    },
    question: {
      color: black,
      fontSize: 30,
      marginTop: 30,
      textAlign: 'center',
    },
    item: {
      flex: 1
    },
    itemCardsCount: {
      color: gray,
      fontSize: 15,
      marginBottom: 10
    }
  })
