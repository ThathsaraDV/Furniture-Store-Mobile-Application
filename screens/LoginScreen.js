import React, {Component} from 'react';
import {
  Center,
  Heading,
  VStack,
  Input,
  Icon,
  Button,
  NativeBaseProvider,
} from 'native-base';
import {StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {style} from 'styled-system';

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibility: false,
      userInfo: [],
      email: '',
      password: '',
    };
  }

  handleClick() {
    this.setState(prevState => ({
      visibility: !prevState.visibility,
    }));
  }

  setUserInfo(json) {
    this.setState(prevState => ({
      userInfo: json,
    }));

    if (this.state.userInfo != null) {
      // console.log(this.state.userInfo);
      if (this.state.password == this.state.userInfo.password) {
        // console.log('password correct');
        this.setLoggedIn();
        this.setUserUID(this.state.userInfo.userID);
        this.setUserEmail(this.state.userInfo.email);
        this.props.navigation.replace('Dashboard');
      }
    } else {
      console.log('No User');
    }
  }

  fetchUserInfo(email) {
    fetch('http://192.168.8.101:8080/abc/user?email=' + email, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then(response => response.json())
      .then(json => this.setUserInfo(json.data));
  }

  login(email, password) {
    this.fetchUserInfo(email);

    // this.getMyStringValue();
    // console.log(string);
    // this.removeValue();
    // this.setLoggedIn();
    //
  }

  setUserUID = async value => {
    try {
      await AsyncStorage.setItem('uid', value);
    } catch (e) {
      // save error
    }

    console.log('Done. user id');
  };

  setUserEmail = async value => {
    try {
      await AsyncStorage.setItem('email', value);
    } catch (e) {
      // save error
    }

    console.log('Done. user email');
  };

  setLoggedIn = async value => {
    try {
      await AsyncStorage.setItem('isLogged', 'true');
      console.log('Login Stored');
    } catch (e) {
      e.printStack();
    }
  };

  saveEmail(value) {
    this.setState(prevState => ({
      email: value,
    }));
    // console.log(this.state.email);
  }

  savePassword(value) {
    this.setState(prevState => ({
      password: value,
    }));
  }

  navigateToSignUp() {
    this.props.navigation.navigate('SignUp');
  }

  render() {
    return (
      <NativeBaseProvider>
        <VStack alignItems="center" style={loginStyle.body}>
          <Center w="100%" h="30%">
            <Heading
              size="2xl"
              mt={10}
              fontWeight="extrabold"
              style={loginStyle.headText}>
              ABC
            </Heading>
          </Center>
          <Center w="100%" h="40%">
            <Input
              InputRightElement={
                <Icon
                  as={<MaterialCommunityIcons name="email" />}
                  size={5}
                  mr="2"
                  color="#BBDEFB"
                />
              }
              w="75%"
              mb={10}
              variant="rounded"
              borderColor="#90CAF9"
              _focus={{
                borderColor: '#2196F3',
              }}
              borderWidth={3}
              placeholder="Email"
              onChangeText={value => this.saveEmail(value)}
            />
            <Input
              type={this.state.visibility ? 'text' : 'password'}
              InputRightElement={
                <Icon
                  as={
                    <MaterialIcons
                      name={
                        this.state.visibility ? 'visibility' : 'visibility-off'
                      }
                    />
                  }
                  size={5}
                  mr="2"
                  color="#BBDEFB"
                  onPress={this.handleClick.bind(this)}
                />
              }
              w="75%"
              mt={5}
              variant="rounded"
              borderColor="#90CAF9"
              borderWidth={3}
              _focus={{
                borderColor: '#2196F3',
              }}
              placeholder="Password"
              onChangeText={value => this.savePassword(value)}
            />
          </Center>
          <Center w="100%" h="30%" pb={10}>
            <VStack w="100%" mb={5} maxWidth="200">
              <Button
                style={loginStyle.button}
                _text={{
                  color: '#2196F3',
                  fontSize: 'xl',
                }}
                _hover={{
                  backgroundColor: '#00B4D8',
                  color: '#CAF0F8',
                }}
                svariant="subtle"
                onPress={() =>
                  this.login(this.state.email, this.state.password)
                }>
                Login
              </Button>
            </VStack>
            <VStack>
              <Button
                size="md"
                variant="ghost"
                _text={{
                  color: '#2196F3',
                }}
                onPress={() => this.navigateToSignUp()}>
                Sign Up
              </Button>
            </VStack>
          </Center>
        </VStack>
      </NativeBaseProvider>
    );
  }
}

const loginStyle = StyleSheet.create({
  body: {
    backgroundColor: '#faf9f9',
  },
  headText: {
    color: '#1976D2',
  },
  button: {
    backgroundColor: '#BBDEFB',
    borderRadius: 20,
    // height: 45,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
});
