
import React, {useState} from 'react';

import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Animated,
  PanResponder,
} from 'react-native';


const SCREEN_WIDTH = Dimensions.get('window').width;


export default function Slider({matchData}){
  const [startIndex, setStartIndex] = useState(0);
  const [xPosition, setXPosition] = useState(new Animated.Value(0));

  let CardprevR = xPosition.interpolate({
    inputRange: [0, SCREEN_WIDTH],
    outputRange: [SCREEN_WIDTH, cardsStyle[0].right],
  });


  let Card0H = xPosition.interpolate({
    inputRange: [-SCREEN_WIDTH, 0, SCREEN_WIDTH],
    outputRange: [cardsStyle[1].height, cardsStyle[1].height, cardsStyle[2].height],
  });
  let Card0R = xPosition.interpolate({
    inputRange: [-SCREEN_WIDTH, 0, SCREEN_WIDTH],
    outputRange: [SCREEN_WIDTH, cardsStyle[1].right, cardsStyle[2].right],
  });
  let Card0BG = xPosition.interpolate({
    inputRange: [-SCREEN_WIDTH, 0, SCREEN_WIDTH],
    outputRange: [cardsStyle[1].backgroundColor, cardsStyle[1].backgroundColor, cardsStyle[2].backgroundColor],
  });

  let Card1H = xPosition.interpolate({
    inputRange: [-SCREEN_WIDTH, 0, SCREEN_WIDTH],
    outputRange: [cardsStyle[1].height, cardsStyle[2].height, cardsStyle[3].height],
  });
  let Card1R = xPosition.interpolate({
    inputRange: [-SCREEN_WIDTH, 0, SCREEN_WIDTH],
    outputRange: [cardsStyle[1].right, cardsStyle[2].right, cardsStyle[3].right],
  });
  let Card1BG = xPosition.interpolate({
    inputRange: [-SCREEN_WIDTH, 0, SCREEN_WIDTH],
    outputRange: [cardsStyle[1].backgroundColor, cardsStyle[2].backgroundColor, cardsStyle[3].backgroundColor],
  });
  let Card1O = xPosition.interpolate({
    inputRange: [-SCREEN_WIDTH, 0, SCREEN_WIDTH],
    outputRange: [1, 1, 0],
  });

  let Card2H = xPosition.interpolate({
    inputRange: [-SCREEN_WIDTH, 0, SCREEN_WIDTH],
    outputRange: [cardsStyle[2].height, cardsStyle[3].height, cardsStyle[3].height],
  });
  let Card2R = xPosition.interpolate({
    inputRange: [-SCREEN_WIDTH, 0, SCREEN_WIDTH],
    outputRange: [cardsStyle[2].right, cardsStyle[3].right, cardsStyle[3].right],
  });
  let Card2BG = xPosition.interpolate({
    inputRange: [-SCREEN_WIDTH, 0, SCREEN_WIDTH],
    outputRange: [cardsStyle[2].backgroundColor, cardsStyle[3].backgroundColor, cardsStyle[3].backgroundColor],
  });
  let Card2O = xPosition.interpolate({
    inputRange: [-SCREEN_WIDTH, 0, SCREEN_WIDTH],
    outputRange: [1, 0, 0],
  });

  const returnBackAnim = () =>{
    Animated.spring(xPosition, {
      toValue: 0,
      speed: 5,
      bounciness: 10,
      useNativeDriver: false,
    }).start();
  }

  let panResponder = PanResponder.create({
    onStartShouldSetPanResponder:
      (evt, gestureState) => false,
    onMoveShouldSetPanResponder:
      (evt, gestureState) => true,
    onStartShouldSetPanResponderCapture: 
      (evt, gestureState) => false,
    onMoveShouldSetPanResponderCapture:
      (evt, gestureState) => true,
    onPanResponderMove:
      (evt, gestureState) => {
        xPosition.setValue(gestureState.dx);
        if (gestureState.dx > SCREEN_WIDTH - 300) {
          
        } else if (gestureState.dx < -SCREEN_WIDTH + 300) {
        
        }
      },
    onPanResponderRelease: (evt, gestureState) => {
      if (
        gestureState.dx < SCREEN_WIDTH - 250&&
        gestureState.dx > -SCREEN_WIDTH + 250
      ) {
        returnBackAnim();
      } else if (gestureState.dx > SCREEN_WIDTH - 250) {
        if( startIndex <= 0){
          return returnBackAnim();
        }
        Animated.parallel([
          Animated.timing(xPosition, {
            toValue: SCREEN_WIDTH,
            duration: 200,
            useNativeDriver: false,
          }),
        ]).start(() => {
          if(startIndex>0){
            setStartIndex(startIndex-1);
          }
          xPosition.setValue(0);
        });
      } else if (gestureState.dx < -SCREEN_WIDTH + 250) {
        Animated.parallel([
          Animated.timing(xPosition, {
            toValue: -SCREEN_WIDTH,
            duration: 200,
            useNativeDriver: false,
          }),
        ]).start(() => {
          if(startIndex < matchData.length){
            setStartIndex(startIndex+1);
          }
          xPosition.setValue(0);
        });
      }
    },
  });

  function SliderCard({ id, style, matchData}) {
    if(matchData===null){
        return(<></>)
    }
    return (
      <Animated.View
        style={[
          styles.cardsStyle,
          cardsStyle[id>4?4:id],
          style,
        ]}>
          <Animated.View style={[{opacity:id==2?Card2O:id==1?Card1O:1}]}>

          <View style={styles.one}>
          <Text>Date: {matchData.date}</Text>
          </View>

          </Animated.View>
      </Animated.View>
    );
  };

  function PrevCard({id, style, matchData}){
    if(startIndex==0){
      return(<></>)
    }
    return(
      <SliderCard id={id} style={style} matchData={matchData}/>
    )
  }

  return (
      <Animated.View 
        {...panResponder.panHandlers}
        style={styles.container}>
          <PrevCard 
            id={0}
            key={0}
            style={{
              right: CardprevR,
              opacity: 1,
            }}
            matchData={matchData[startIndex-1]?matchData[startIndex-1]:null}
          />
          <SliderCard
            key={1}
            id={1}
            style={{
                height: Card0H,
                right: Card0R,
                backgroundColor: Card0BG
              }}
              matchData={matchData[startIndex]?matchData[startIndex]:null}
          />
          <SliderCard
            key={2}
            id={2}
            style={{ 
                height: Card1H,
                right: Card1R,
                backgroundColor: Card1BG
            }}
            matchData={matchData[startIndex+1]?matchData[startIndex+1]:null}
          />
          <SliderCard
            key={3}
            id={3}
            style={{ 
                height: Card2H,
                right: Card2R,
                backgroundColor: Card2BG
            }}
            matchData={matchData[startIndex+2]?matchData[startIndex+2]:null}
          />
          <SliderCard
            key={4}
            id={4}
            matchData={matchData[startIndex+3]?matchData[startIndex+3]:null}
          />
      </Animated.View>
  );
};


const styles = StyleSheet.create({
    container: {
      width: SCREEN_WIDTH,
      height:185,
      justifyContent: 'center',
      alignItems: 'center',
    },
    cardsStyle: {
      position: 'absolute',
      borderRadius: 15,
      color: 0xFE0565
    },
    one:{
      height:'100%',
      backgroundColor:'#FF0523',
      borderRadius:15
    }  
  });


const cardsStyle=[
  {
    backgroundColor: '#FFFFFF',
    width:295,
    height:185,
    right:52,
    zIndex:11,
    elevation:11
  },
  {
    backgroundColor: '#FFFFFF',
    width:295,
    height:185,
    right:52,
    zIndex:10,
    elevation:10
  },
  {
    backgroundColor: '#B79FED',
    width:295,
    height:153,
    right:36,
    zIndex:9,
    elevation:9
  },
  {
    backgroundColor: '#875DE1',
    width:295,
    height:121,
    right:20,
    zIndex:8,
    elevation:8
  },
  {
    backgroundColor: '#875DE1',
    width:295,
    height:121,
    right:20,
    zIndex:2,
    elevation:2
  }
]
