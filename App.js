
import React from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';
import {list, LargeSliderList} from './list';
// import all the components we are going to use

import LargeSlider from './components/LargeSlider';

const App = () => {

  return (
    <View style={styles.container}>
      <LargeSlider matchData={LargeSliderList}/>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#FFFFFF'
  },
});