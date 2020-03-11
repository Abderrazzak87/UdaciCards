import React, { Component } from 'react'
import { View, FlatList } from 'react-native'
import { connect } from 'react-redux'
import DeckItem from './DeckItem'
import { getDecks } from '../actions/'
import { AppLoading } from "expo"

class DecksList extends Component {
    state = {
      ready: false,
    }

    componentDidMount () {
        this.props.dispatch(getDecks())
        this.setState(() => ({ready: true}))
    }

    renderItem = ({ item, index }) => {

        const { navigation } = this.props
        return (
            <DeckItem
                key={index}
                title={item.title}
                cardsCount={item.questions.length}
                navigate={() => navigation.navigate('DeckDetail', { deckTitle: item.title })} />
      )
    }


    render () {

        const { decks } = this.props;
        const { ready } = this.state;

        if (!ready) {
            return <AppLoading />
        }

        return (
            <View style={{ flex: 1 }}>
                <FlatList
                    data={Object.values(decks)}
                    keyExtractor={(item, index) => `${index}-${item.title}`}
                    renderItem={this.renderItem} 
                />
            </View>

        )
    }
    
}


function mapStateToProps (state) {
    return {
      decks: state.decks
    }
  }
  
export default connect(mapStateToProps)(DecksList)