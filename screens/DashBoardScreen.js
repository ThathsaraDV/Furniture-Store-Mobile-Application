import React, {Component} from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {Center, NativeBaseProvider} from 'native-base';
import ProductScreen from './ProductScreen';
import AccountScreen from './AccountScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Drawer = createDrawerNavigator();

export default class DashboardScreen extends Component {
  userSignOut(props) {
    this.removeValue();
    this.removeObject();
    props.navigation.replace('Login');
  }

  removeValue = async () => {
    try {
      await AsyncStorage.removeItem('isLogged');
    } catch (e) {
      e.printStack();
    }

    console.log('Done.');
  };

  removeObject = async () => {
    try {
      await AsyncStorage.removeItem('user');
    } catch (e) {
      e.printStack();
    }

    console.log('Done.');
  };

  render() {
    return (
      <NativeBaseProvider>
        <Drawer.Navigator
          drawerContent={props => {
            return (
              <DrawerContentScrollView {...props}>
                <DrawerItemList {...props} />
                <DrawerItem
                  style={{
                    marginTop: 600,
                    backgroundColor: '#ffccd5',
                    borderWidth: 2,
                    borderColor: '#ff758f',

                    // position: 'relative',
                    // bottom: 0,
                    // zIndex: 3,
                  }}
                  label="Logout"
                  labelStyle={{
                    color: '#ff758f',
                  }}
                  onPress={() => this.userSignOut(props)}
                />
              </DrawerContentScrollView>
            );
          }}>
          <Drawer.Screen
            name="Products"
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
            component={ProductScreen}
          />
          <Drawer.Screen
            name="Account"
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
            component={AccountScreen}
          />
        </Drawer.Navigator>
      </NativeBaseProvider>
    );
  }
}
