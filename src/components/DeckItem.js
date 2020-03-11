import React, { Component } from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { gray, black, white, gray2 } from '../utils/colors'

class DeckItem extends Component {
  render() {

    const { title, cardsCount, navigate } = this.props

    return (

      <TouchableOpacity style={styles.item} onPress={navigate}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.cardsCount}>{cardsCount} Cards</Text>
      </TouchableOpacity>

    )
  }
}


export default DeckItem

const styles = StyleSheet.create({
  item: {
    backgroundColor: white,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: gray2,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    alignItems: 'center',
  },
  title: {
    color: black,
    fontSize: 25,
    margin: 10
  },
  cardsCount: {
    color: gray,
    fontSize: 15,
    marginBottom: 10
  }
})