import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  StyleSheet,
  Animated,
  Easing,
  Image,
} from 'react-native';
import { useDispatch, useSelector} from 'react-redux';
import { SET_STEP} from '../actions/accordionActions';

const AccordionItem = ({title, children, index}) => {
  const animatedController = useRef(new Animated.Value(0)).current;
  const [bodySectionHeight, setBodySectionHeight] = useState(0);
  const stepIndex = useSelector(state => state.accordionReducer.accordionStepReducer);

  const dispatch = useDispatch();

  const bodyHeight = animatedController.interpolate({
    inputRange: [0, 1],
    outputRange: [0, bodySectionHeight],
  });

  const arrowAngle = animatedController.interpolate({
    inputRange: [0, 1],
    outputRange: ['0rad', `${Math.PI}rad`],
  });
  
  const toggleListItem = () => {
    if (stepIndex[index - 1]) {
      Animated.timing(animatedController, {
        duration: 300,
        toValue: 0,
        easing: Easing.bezier(0.4, 0.0, 0.2, 1),
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(animatedController, {
        duration: 300,
        toValue: 1,
        easing: Easing.bezier(0.4, 0.0, 0.2, 1),
        useNativeDriver: false,
      }).start();
    }
    
    dispatch({type: SET_STEP, payload: index - 1});
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={() => {
        toggleListItem()
        }}>
        <View style={styles.titleContainer}>
          <Text style={{fontSize: 16, fontWeight: 'bold', color: stepIndex[index - 1] ? 'black' : 'white'}}>{title}</Text>
          <Animated.View style={{transform: [{rotateZ: arrowAngle}]}}>
            <Image
              source={require('../assets/Down.png')}
              style={{
                width: 24,
                height: 24,
                resizeMode: 'contain',
                marginRight: 5,
                tintColor: stepIndex[index - 1] ? 'black' : 'white',
              }}
            />
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
      <Animated.View style={[styles.bodyBackground, {height: bodyHeight}]}>
        <View
          style={styles.bodyContainer}
          onLayout={event =>
            setBodySectionHeight(event.nativeEvent.layout.height)
          }>
          {children}
        </View>
      </Animated.View>
    </>
  );
};
export default AccordionItem;

const styles = StyleSheet.create({
  bodyBackground: {
    overflow: 'hidden',
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
  },
  bodyContainer: {
    padding: 5,
    position: 'absolute',
    bottom: 0,
  },
});
