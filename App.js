import React, { Component } from 'react'
import { applyMiddleware, createStore } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import reducer from './src/reducers/'
import Constants from 'expo-constants'


import { View, StatusBar } from 'react-native'
import { createAppContainer } from 'react-navigation'
import { BottomTabNavigator } from './src/MainTabNavigator'
import { purple } from './src/utils/colors'


import { setLocalNotification } from './src/utils/helpers'

const Navigation = createAppContainer(BottomTabNavigator)

function UdaciStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

export default class App extends Component {


  componentDidMount() {
    setLocalNotification()
  }

  store = createStore(reducer, applyMiddleware(thunk))

  render() {
    return (
      <Provider store={this.store}>
        <View style={{ flex: 1 }}>
          <UdaciStatusBar backgroundColor={purple} barStyle='light-content'/>
           <Navigation />
        </View>
      </Provider>
    )
  }
}
