import 'react-native-gesture-handler';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Home from './Home'
import { Provider } from 'react-redux'
import StackNavigation from './StackNavigation';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './redux/store';

export const Loadingdata = () => {
  return (
    <ActivityIndicator style={{ justifyContent: 'center', flex: 1, alignSelf: 'center' }} size='large' color="blue" />
  )
}

const App = () => {
  return (

    // <Provider store={store}>
    //   <View style={styles.container}>
    //     {/* <Text style={styles.textStyle}>App</Text> */}
    //     <StackNavigation />
    //   </View>
    // </Provider>   
    <Provider store={store}>
      <PersistGate loading={<Loadingdata />} persistor={persistor}>
        {/* <View style={styles.container}> */}
        <StackNavigation />
        {/* </View> */}
      </PersistGate>
    </Provider>

  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  textStyle: {
    color: 'black'
  }
})