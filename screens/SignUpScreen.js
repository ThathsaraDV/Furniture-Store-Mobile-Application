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

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibility1: false,
      visibility2: false,
      message: '',
      email: '',
      password: '',
      confirmPassword: '',
    };
  }

  handleClick1() {
    this.setState(prevState => ({
      visibility1: !prevState.visibility1,
    }));
  }

  handleClick2() {
    this.setState(prevState => ({
      visibility2: !prevState.visibility2,
    }));
  }

  navigateToLogin(message) {
    this.setState(prevState => ({
      message: message,
    }));

    if (this.state.message == 'Success') {
      this.props.navigation.replace('Login');
    } else {
      console.log('No User');
    }
  }

  fetchSaveInfo(email, password, confirmPassword) {
    let userID = 'U' + Math.floor(1000 + Math.random() * 9000);

    fetch('http://192.168.8.101:8080/abc/user', {
      method: 'POST',
      body: JSON.stringify({
        userID: userID,
        email: email,
        name: '',
        password: password,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then(response => response.json())
      .then(json => this.navigateToLogin(json.message));
  }

  signUp(email, password, confirmPassword) {
    if (password == confirmPassword) {
      this.fetchSaveInfo(email, password, confirmPassword);
    }
  }

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

  saveConfirmPassword(value) {
    this.setState(prevState => ({
      confirmPassword: value,
    }));
    // console.log(this.state.email);
  }

  render() {
    return (
      <NativeBaseProvider>
        <VStack alignItems="center" style={loginStyle.body}>
          <Center w="100%" h="30%" style={{backgroundColor: 'white'}}>
            <Heading
              size="2xl"
              mt={10}
              fontWeight="extrabold"
              style={loginStyle.headText}>
              Sign Up
            </Heading>
          </Center>
          <Center w="100%" h="40%" display="flex" justifyContent="space-evenly">
            <Input
              InputRightElement={
                <Icon
                  as={<MaterialCommunityIcons name="email" />}
                  size={5}
                  mr="2"
                  color="muted.400"
                />
              }
              w="75%"
              placeholder="Email"
              onChangeText={value => this.saveEmail(value)}
            />
            <Input
              type={this.state.visibility1 ? 'text' : 'password'}
              InputRightElement={
                <Icon
                  as={
                    <MaterialIcons
                      name={
                        this.state.visibility1 ? 'visibility' : 'visibility-off'
                      }
                    />
                  }
                  size={5}
                  mr="2"
                  color="muted.400"
                  onPress={this.handleClick1.bind(this)}
                />
              }
              w="75%"
              placeholder="Password"
              onChangeText={value => this.savePassword(value)}
            />
            <Input
              type={this.state.visibility2 ? 'text' : 'password'}
              InputRightElement={
                <Icon
                  as={
                    <MaterialIcons
                      name={
                        this.state.visibility2 ? 'visibility' : 'visibility-off'
                      }
                    />
                  }
                  size={5}
                  mr="2"
                  color="muted.400"
                  onPress={this.handleClick2.bind(this)}
                />
              }
              w="75%"
              placeholder="Confirm Password"
              onChangeText={value => this.saveConfirmPassword(value)}
            />
          </Center>
          <Center w="100%" h="30%" style={{backgroundColor: 'white'}}>
            <VStack
              w="100%"
              mb={5}
              maxWidth="200"
              style={{backgroundColor: 'grey'}}>
              <Button
                variant="subtle"
                onPress={() =>
                  this.signUp(
                    this.state.email,
                    this.state.password,
                    this.state.confirmPassword,
                  )
                }>
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
    backgroundColor: '#E1E2E7',
  },
  headText: {
    color: '#98042D',
  },
});
