
import React, {useState} from 'react';

import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  Animated,
  PanResponder,
  TouchableOpacity,
  Easing
} from 'react-native';


const SCREEN_WIDTH = Dimensions.get('window').width;

export default function Slider({matchData}){
  const [startIndex, setStartIndex] = useState(0);
  const [xPosition, setXPosition] = useState(new Animated.Value(0));

  let CardprevR = xPosition.interpolate({
    inputRange: [0, SCREEN_WIDTH],
    outputRange: [SCREEN_WIDTH, cardsStyle[1].right],
  });
  let CardprevH = xPosition.interpolate({
    inputRange: [0, SCREEN_WIDTH],
    outputRange: [cardsStyle[0].height, cardsStyle[1].height],
  });

  let CardprevO = xPosition.interpolate({
    inputRange: [0, SCREEN_WIDTH],
    outputRange: [0, 1],
  });
  let Card0H = xPosition.interpolate({
    inputRange: [-SCREEN_WIDTH, 0, SCREEN_WIDTH * cardsStyle[3].height/cardsStyle[2].height],
    outputRange: [cardsStyle[0].height, cardsStyle[1].height, cardsStyle[2].height],
  });
  let Card0R = xPosition.interpolate({
    inputRange: [-SCREEN_WIDTH, 0, SCREEN_WIDTH],
    outputRange: [SCREEN_WIDTH, cardsStyle[1].right, cardsStyle[2].right],
  });
  let Card0O = xPosition.interpolate({
    inputRange: [-SCREEN_WIDTH, 0, SCREEN_WIDTH],
    outputRange: [0, 1, 0],
  });

  let Card1H = xPosition.interpolate({
    inputRange: [-SCREEN_WIDTH, 0, SCREEN_WIDTH *cardsStyle[3].height/cardsStyle[2].height ],
    outputRange: [cardsStyle[1].height, cardsStyle[2].height, cardsStyle[2].height],
  });
  let Card1R = xPosition.interpolate({
    inputRange: [-SCREEN_WIDTH, 0, SCREEN_WIDTH/2],
    outputRange: [cardsStyle[1].right, cardsStyle[2].right, cardsStyle[3].right],
  });
  let Card1O = xPosition.interpolate({
    inputRange: [-SCREEN_WIDTH, 0, SCREEN_WIDTH *cardsStyle[3].height/cardsStyle[2].height ],
    outputRange: [1, 0, 0],
  });

  let Card2R = xPosition.interpolate({
    inputRange: [-SCREEN_WIDTH, 0, SCREEN_WIDTH/2],
    outputRange: [cardsStyle[2].right, cardsStyle[3].right, cardsStyle[3].right],
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
          //  easing:Easing.linear,
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
           // easing:Easing.linear,
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

  function LargeSliderCard({ id, style, matchData }) {
    function TeamInfo({side, name}){
      return(
        <View style={[CardStyle.TeamInfoCon, side=='away'?CardStyle.awaySide:'']}>
          <View style={CardStyle.symbolImg}></View>
          <Text style={CardStyle.name}>{name}</Text>
          <Animated.View style={{
            opacity: id==0?CardprevO:id==1?Card0O:id==2?Card1O:0
          }}>
            <View style={[CardStyle.sideCon, side=='away'?CardStyle.sideConAway:'']}>
              <Text style={CardStyle.side}>{side}</Text>
            </View>
            <View style={[CardStyle.miniCircleArea, side=='away'?CardStyle.miniCircleAreaAway:'']}>
              <View style={CardStyle.miniCircleCon}>
                <View style={[CardStyle.miniCircle,{backgroundColor:'#EA1901'}]}></View>
                <View style={[CardStyle.miniCircle,{backgroundColor:'#EA1901'}]}></View>
                <View style={[CardStyle.miniCircle,{backgroundColor:'#67D93B'}]}></View>
                <View style={[CardStyle.miniCircle,{backgroundColor:'#67D93B'}]}></View>
                <View style={[CardStyle.miniCircle,{backgroundColor:'#F5A623'}]}></View>
              </View>
            </View>
          </Animated.View>
        </View>
      )
    }

    function MatchInfoDetails({place, date}){
      return(
        <View style={CardStyle.MatchInfoDetailsCon}>
          <Text style={[CardStyle.MatchInfoDetailText,CardStyle.MatchInfoDetailPlace]}>{place}</Text>
          <Text style={[CardStyle.MatchInfoDetailText,CardStyle.MatchInfoDetailDate]}>{date}</Text>
        </View>
      )
    }
    function InfoBar({name, homeValue, awayValue}){
      function calcWidthValues(){
        const width = 255-3;// 3 is space
        const home = Number(homeValue.replace('%',''));
        const away = Number(awayValue.replace('%',''));
        return {
          hWidth: Math.floor(width/(home+away)*home),
          aWidth: Math.ceil(width/(home+away)*away)
        }
      }
      const {hWidth, aWidth} = calcWidthValues();
      return(
        <View>
          <View style={CardStyle.InfoBarHeader}>
              <Text style={CardStyle.InfoBarHeaderSideValue}>{homeValue}</Text>
              <Text style={CardStyle.InfoBarHeaderName}>{name}</Text>
              <Text style={CardStyle.InfoBarHeaderSideValue}>{awayValue}</Text>
          </View>
          <View style={CardStyle.InfoBarCon}>
            <View style={[CardStyle.InfoBarHome, {width:hWidth}]}></View>
            <View style={[CardStyle.InfoBarAway, {width:aWidth}]}></View>
          </View>
        </View>
      )
    }
    if(matchData===null){
        return(<></>)
    }
    return (
      <Animated.View
        style={[
          styles.cardsStyle,
          CardStyle.cardCon,
          cardsStyle[id],
          style,
        ]}>
          <View style={CardStyle.InCard}>
          <View style={CardStyle.MatchInfoCon}>
              <TeamInfo side='home' name={`${matchData.homeOponent.team}`}/>
              <MatchInfoDetails place={matchData.matchPlace} date={matchData.date}/>
              <TeamInfo side='away' name={`${matchData.awayOponent.team}`}/>
            </View>
            <Animated.View style={
              {
              opacity: id==0?CardprevO:id==1?Card0O:id==2?Card1O:0
              }
            }>
            <View style={CardStyle.InfoBarsCon}>
              <InfoBar homeValue={matchData.homeOponent["gf/gp"]} awayValue={matchData.awayOponent["gf/gp"]} name="GF/GP"/>
              <InfoBar homeValue={matchData.homeOponent["GA/GP"]} awayValue={matchData.awayOponent["GA/GP"]} name='GA/GP'/>
              <InfoBar homeValue={matchData.homeOponent["PP"]} awayValue={matchData.awayOponent["PP"]} name='PP%'/>
              <InfoBar homeValue={matchData.homeOponent["PK"]} awayValue={matchData.awayOponent["PK"]} name='PK%'/>
            </View>
            <View style={CardStyle.footerButtonCon}>
              <TouchableOpacity style={CardStyle.ViewDetailsButton}>
                <Text style={CardStyle.ViewDetailsButtonText}>View Details</Text>
              </TouchableOpacity>
              <TouchableOpacity  style={CardStyle.PlayButton}>
                 <Image
                    style={CardStyle.PlayButtonImg}
                    source={require('../assets/images/play.png')}
                  />
              </TouchableOpacity>
            </View>
            </Animated.View>
          </View>
      </Animated.View>
    );
  };

  function PrevCard({id, style, matchData}){
    if(startIndex==0){
      return(<></>)
    }
    return(
      <LargeSliderCard id={id} style={style} matchData={matchData}/>
    )
  }

  return (
      <Animated.View 
        {...panResponder.panHandlers}
        style={styles.container}>
          <PrevCard 
            id={0}
            key={0}
            style={
              {
              right: CardprevR,
              height: CardprevH
            }}
            matchData={matchData[startIndex-1]?matchData[startIndex-1]:null}
          />
          <LargeSliderCard
            key={1}
            id={1}
            style={{
                height: Card0H,
                right: Card0R,
              }}
              matchData={matchData[startIndex]?matchData[startIndex]:null}
          />
          <LargeSliderCard
            key={2}
            id={2}
            style={{ 
                height: Card1H,
                right: Card1R,
            }}
            matchData={matchData[startIndex+1]?matchData[startIndex+1]:null}
          />

          <LargeSliderCard
            key={3}
            id={3}
            style={{
                right: Card2R,
            }}
            matchData={matchData[startIndex+2]?matchData[startIndex+2]:null}
          />
      </Animated.View>
  );
};


const CardStyle = StyleSheet.create({  
  cardCon:{
    width:295,
    height:431,
    display: 'flex',
    flexDirection:'column',
    borderRadius: 24,
    backgroundColor: '#012C2E'
  }, 
  InCard:{
    paddingHorizontal: 20,
    paddingVertical: 25
  },
  MatchInfoCon: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent:'space-between',
  },
  MatchInfoDetailsCon:{
    width:100,
    height:63,
    display: 'flex',
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',
  },
  MatchInfoDetailText:{
    color:'#FFFFFF',
    textAlign:'center',
  },
  MatchInfoDetailPlace:{
    fontWeight:700,
    fontSize:11
  },
  MatchInfoDetailDate:{
    fontWeight: 300,
    fontSize: 10,
    width: 80
  },
  TeamInfoCon:{
    display: 'flex',
    flexDirection:'column',
    width:66
  },
  awaySide:{
    alignItems:'flex-end'
  },
  symbolImg:{
    width:63, 
    height:63, 
    borderRadius:63/2, 
    backgroundColor:'red'
  },
  name:{
    color:'#FFFFFF',
    fontWeight:700,
    fontSize:15,
    marginTop:8,
    textTransform: 'uppercase'
  },
  sideCon:{
    width: 80,
    display:'flex',
    flexDirection:'row',
    justifyContent:'flex-start'
  },
  sideConAway:{
    justifyContent:'flex-end'
  },
  side:{
    color: '#FFFFFF',
    fontWeight: 300,
    fontSize: 13,
    textTransform: 'capitalize',
  },
  miniCircleArea:{
    width:80,
    display: 'flex',
    flexDirection:'row',
    justifyContent:'flex-start'
  },
  miniCircleAreaAway:{
    justifyContent:'flex-end'
  },
  miniCircleCon:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent:'space-between',
    width: 46,
    marginTop:4
  },
  
  miniCircle:{
    width: 6,
    height: 6,
    borderRadius: 3
  },
  InfoBarsCon:{
    height:180,
    display:'flex',
    flexDirection:'column',
    justifyContent:'space-between',
    marginTop:25,
  },
  InfoBarHeader:{
    width:'100%',
    display: 'flex',
    flexDirection:'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  },
  InfoBarHeaderName:{
    color:'#FFFFFF',
    fontWeight:300,
    fontSize:12
  },
  InfoBarHeaderSideValue:{
    color:'#FFFFFF',
    fontWeight:700,
    fontSize: 12,
  },
  InfoBarCon:{
    width:255,
    height: 4,
    display: 'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    marginTop: 3,
  },
  InfoBarHome:{
    backgroundColor: '#FF8744',
    height: 4,
    borderRadius:2
  },
  InfoBarAway:{
    backgroundColor: '#FCDC2A',
    height: 4,
    borderRadius:2
  },
  footerButtonCon:{
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  ViewDetailsButton:{
    backgroundColor: 0xFF874444,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
    borderRadius: 12
  },
  ViewDetailsButtonText:{
    color: '#FF8744',
    fontWeight: 500,
    fontSize:15,
    padding:10
  },
  PlayButton:{
    backgroundColor: '#FF8744',
    width: 80,
    height: 80,
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    borderRadius: 40,
    borderWidth: 6,
    marginTop:27,
    borderColor: '#FFFFFF'
  },
  PlayButtonImg:{
    width:14,
    height:15
  }
})


const styles = StyleSheet.create({
    container: {
      width: SCREEN_WIDTH,
      height: 431,
      justifyContent: 'flex-start',
    },
    cardsStyle: {
      position: 'absolute',
      color: 0xFE0565
    },
 
  });


const cardsStyle=[
  {
    width: 295,
    height: 374,
    right: SCREEN_WIDTH,
  },
  {
    width: 295,
    height: 431,
    right: 70,
  },
  {
    width: 295,
    height: 374,
    right: -SCREEN_WIDTH + 128,
  },
  {
    width: 295,
    height: 374,
    right: -SCREEN_WIDTH,
  }
]
