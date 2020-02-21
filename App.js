import { AppLoading ,ScreenOrientation,} from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import React, { useState } from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import rootSaga from './sagas';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import reducers from './reducers';
import createSagaMiddleware from 'redux-saga';
import {Router} from './navigation/MainTabNavigator'
import * as firebase from 'firebase';
import { DeviceMotion,orientation } from 'expo-sensors';
import { AsyncStorage } from 'react-native';

// import StorybookUI from './storybook';

// export default StorybookUI;

export default function App(props) {
  
// Initialize Firebase
// AsyncStorage.setItem('token',"saving token")
// const value =await AsyncStorage.getItem('token');


const firebaseConfig = {
  apiKey: "AIzaSyCFVT-tOrR43XpCY0zKy7qRVHqJ93Au_2c",
  authDomain: "",
  databaseURL: "",
  storageBucket: "gs://social-network-de3a1.appspot.com"
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);

}
// let ori=0;
// DeviceMotion.addListener(orientation)
// DeviceMotion.addListener(Orientation=> Orientation.rotation.gamma<-0.5?ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE):ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT))

// console.log(ori)
//  if(ori!==0){
// ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
//  }else{
// ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);

//  }
// ScreenOrientation.Orientation.
// ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
  const [isLoadingComplete, setLoadingComplete] = useState(false);
  const sagaMiddleware = createSagaMiddleware();
  this.store = createStore(reducers, applyMiddleware(sagaMiddleware));
  sagaMiddleware.run(rootSaga);
  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return (
      // <Router>
      <Provider store={this.store}>

      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={() => handleFinishLoading(setLoadingComplete)}
      />
      </Provider>
      // </Router>
    );
  } else {
    return (
      // <Router>
      <Provider store={this.store}>

      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        {/* <AppNavigator /> */}
        <Router/>
      </View>
      </Provider>
      // </Router>
    );
  }
  // export {socket};
}

async function loadResourcesAsync() {
  await Promise.all([
    Asset.loadAsync([
      // require('./assets/images/robot-dev.png'),
      // require('./assets/images/robot-prod.png'),
    ]),
    Font.loadAsync({
      // This is the font that we are using for our tab bar
      ...Ionicons.font,
      // We include SpaceMono because we use it in HomeScreen.js. Feel free to
      // remove this if you are not using it in your app
      // 'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
    }),
  ]);
}

function handleLoadingError(error) {
  // In this case, you might want to report the error to your error reporting
  // service, for example Sentry
  console.warn(error);
}

function handleFinishLoading(setLoadingComplete) {
  setLoadingComplete(true);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
