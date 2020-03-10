import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import MainScreen from './modules/main/screen/MainScreen';
import ProcessingScreen from './modules/processing/screen/ProcessingScreen';

const forFade = ({ current, closing }) => ({
  cardStyle: {
    opacity: current.progress,
  },
});

const RootStack = createStackNavigator(
  {
    MainScreen: {
      screen: MainScreen,
    },
    ProcessingScreen: {
      screen: ProcessingScreen,
      navigationOptions: {
        cardStyleInterpolator: forFade,
      },
    },
  },
  {
    initialRouteName: 'MainScreen',
    headerMode: 'none',
    mode: 'card',
    navigationOptions: {
      gestureEnabled: false,
      cardOverlayEnabled: true,
    },
  },
);

const Navigation = createAppContainer(RootStack);

export default Navigation;
