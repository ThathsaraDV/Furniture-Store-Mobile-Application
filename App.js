import React, {Component} from 'react';
import LoginScreen from './screens/LoginScreen';
import DashboardScreen from './screens/DashBoardScreen';
import ProductDetailScreen from './screens/ProductDetailScreen';
import SignUpScreen from './screens/SignUpScreen';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {Heading, NativeBaseProvider, Center, Spinner} from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LogBox} from 'react-native';

const Stack = createStackNavigator();

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSignedIn: false,
      isLoaded: false,
    };
    LogBox.ignoreLogs(['Reanimated 2']);
    this.getLoginData();
  }

  getLoginData = async () => {
    try {
      let i = await AsyncStorage.getItem('isLogged');
      let isLogged = i == 'true';
      // console.log(i + ' ' + isLogged);
      if (isLogged) {
        this.setState(prevState => ({
          isSignedIn: true,
        }));
      }
      console.log(this.state.isSignedIn);

      this.setState(prevState => ({
        isLoaded: true,
      }));
    } catch (e) {
      e.printStack();
    }

    // console.log('Done.');
  };

  render() {
    const isSignedIn = this.state.isSignedIn;
    const isLoaded = this.state.isLoaded;
    // const isSignedIn = false;
    // const isLoaded = true;

    if (isLoaded) {
      return (
        <NavigationContainer>
          <Stack.Navigator>
            {isSignedIn ? (
              <>
                <Stack.Screen
                  name="Dashboard"
                  options={{headerShown: false}}
                  component={DashboardScreen}
                />
                <Stack.Screen
                  name="ProductDetail"
                  options={{
                    headerShown: true,
                    headerStyle: {
                      backgroundColor: '#2196F3',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                      fontWeight: 'bold',
                    },
                    headerTitleAlign: 'center',
                  }}
                  component={ProductDetailScreen}
                />
                <Stack.Screen
                  name="Login"
                  options={{headerShown: false}}
                  component={LoginScreen}
                />
                <Stack.Screen
                  name="SignUp"
                  options={{headerShown: false}}
                  component={SignUpScreen}
                />
              </>
            ) : (
              <>
                <Stack.Screen
                  name="Login"
                  options={{headerShown: false}}
                  component={LoginScreen}
                />
                <Stack.Screen
                  name="Dashboard"
                  options={{headerShown: false}}
                  component={DashboardScreen}
                />
                <Stack.Screen
                  name="ProductDetail"
                  options={{
                    headerShown: true,
                    headerStyle: {
                      backgroundColor: '#2196F3',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                      fontWeight: 'bold',
                    },
                    headerTitleAlign: 'center',
                  }}
                  component={ProductDetailScreen}
                />
                <Stack.Screen
                  name="SignUp"
                  options={{headerShown: false}}
                  component={SignUpScreen}
                />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      );
    } else {
      return (
        <NativeBaseProvider>
          <Center flex={1}>
            <Spinner
              size="lg"
              color="indigo.500"
              accessibilityLabel="Loading"></Spinner>
            <Heading color="indigo.500">Loading</Heading>
          </Center>
        </NativeBaseProvider>
      );
    }
  }
}
