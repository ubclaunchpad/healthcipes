import React from 'react';
import {useMemo} from 'react';
import {Svg, Path} from 'react-native-svg';
import {
  Dimensions,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import {line, curveBasis} from 'd3-shape';
import globalStyles from './src/styles/globalStyles';

const {width: wWidth} = Dimensions.get('window');

export default function TabsUI({tabs}) {
  const tabWidth = useMemo(() => wWidth / tabs.length, [tabs.length]);
  const NAVIGATION_BOTTOM_TABS_HEIGHT = 80;

  const lineGenerator = line()
    .x(({x}) => x)
    .y(({y}) => y);

  const d = useMemo(() => {
    const left = lineGenerator([
      {x: 0, y: 0},
      {x: tabWidth * 2, y: 0},
    ]);
    const right = lineGenerator([
      {x: tabWidth * 3, y: 0},
      {x: wWidth, y: 0},
      {x: wWidth, y: NAVIGATION_BOTTOM_TABS_HEIGHT},
      {x: 0, y: NAVIGATION_BOTTOM_TABS_HEIGHT},
      {x: 0, y: 0},
    ]);

    const center = lineGenerator.curve(curveBasis)([
      {x: tabWidth * 2 + 7, y: 0},
      {x: tabWidth * 2, y: 0},
      {x: tabWidth * 2 + 15, y: NAVIGATION_BOTTOM_TABS_HEIGHT * 0.45},
      {x: tabWidth * 3 - 15, y: NAVIGATION_BOTTOM_TABS_HEIGHT * 0.45},
      {x: tabWidth * 3, y: 0},
      {x: tabWidth * 3 - 7, y: 0},
    ]);

    return `${left} ${center} ${right}`;
  }, [lineGenerator, tabWidth]);

  function getIcon(tab) {
    switch (tab) {
      case 'FeedTab': {
        return (
          <Image
            source={require('./src/assets/Feed.png')}
            style={globalStyles.tabIcon}
          />
        );
      }
      case 'PantryTab': {
        return (
          <Image
            source={require('./src/assets/Pantry.png')}
            style={globalStyles.tabIcon}
          />
        );
      }
      case 'NotificationTab': {
        return (
          <Image
            source={require('./src/assets/Notification.png')}
            style={globalStyles.tabIcon}
          />
        );
      }
      case 'ProfileTab': {
        return (
          <Image
            source={require('./src/assets/Profile.png')}
            style={globalStyles.tabIcon}
          />
        );
      }
      default:
        break;
    }

    return null;
  }

  return (
    <View
      {...{height: NAVIGATION_BOTTOM_TABS_HEIGHT, width: wWidth, bottom: 0}}
      position="absolute"
      backgroundColor="transparent">
      <Svg width={wWidth} {...{height: NAVIGATION_BOTTOM_TABS_HEIGHT}}>
        <Path fill="white" {...{d}} />
      </Svg>
      <View {...StyleSheet.absoluteFill}>
        <View flexDirection="row">
          {tabs.map((tab, key) => {
            if (key === Math.floor(tabs.length / 2)) {
              return (
                <View
                  key="logo"
                  width={tabWidth}
                  alignItems="center"
                  flexDirection="column"
                  height={NAVIGATION_BOTTOM_TABS_HEIGHT}>
                  <TouchableOpacity
                    onPress={tab.action}
                    position="absolute"
                    style={{top: -NAVIGATION_BOTTOM_TABS_HEIGHT / 2}}>
                    <Image
                      source={require('./src/assets/Post.png')}
                      style={[globalStyles.middleTabIcon]}
                    />
                  </TouchableOpacity>
                </View>
              );
            }

            return (
              <TouchableOpacity {...{key}} onPress={tab.action}>
                <View
                  width={tabWidth}
                  alignItems="center"
                  flexDirection="column"
                  height={NAVIGATION_BOTTOM_TABS_HEIGHT}>
                  {getIcon(tab.name)}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </View>
  );
}
