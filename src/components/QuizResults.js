import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, StyleSheet } from 'react-native'

import { gray, black } from '../utils/colors'
import TextButton from './TextButton'
import { resetQuiz } from '../actions/'
import { clearLocalNotification, setLocalNotification } from '../utils/helpers'

class QuizResults extends Component {

  componentDidMount() {
    clearLocalNotification()
      .then(setLocalNotification())
  }

  restartQuiz = () => {

      const { dispatch } = this.props
      dispatch(resetQuiz())

  }

  render() {
    const { correctAnswers, incorrectAnswers, totalQuestions,  } = this.props

    return (
        <View style={{ flex: 1 }}>
          <Text style={styles.percentage}>Score: {(correctAnswers/totalQuestions*100).toFixed(0)}%</Text>
          <Text style={styles.stats}>Total questions: {totalQuestions}</Text>
          <Text style={styles.stats}>Correct answers: {correctAnswers}</Text>
          <Text style={styles.stats}>Incorrect answers: {incorrectAnswers}</Text>
          <TextButton children='Restart Quiz' style={styles.restart} onPress={this.restartQuiz}/>
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
    incorrectAnswers: state.quiz.incorrectAnswers,
  }
}


export default connect(mapStateToProps)(QuizResults)

const styles = StyleSheet.create({
  percentage: {
    color: black,
    fontSize: 40,
    marginTop: 25,
    textAlign: 'center',
  },
  stats: {
    color: gray,
    fontSize: 20,
    marginTop: 25,
    textAlign: 'center',
  },
  restart: { fontSize: 15, paddingTop: 80 }
})