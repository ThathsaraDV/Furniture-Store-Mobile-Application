import React, {Component} from 'react';
import {
  NativeBaseProvider,
  Box,
  Center,
  Avatar,
  Text,
  Button,
} from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class AccountScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatar: '',
      email: '',
      uid: '',
    };
    this.getUserDetails();
  }

  componentDidMount() {
    // console.log(this.state.userInfo);
    // let text = this.state.userInfo.email;
    // console.log(text);
  }

  getUserDetails = async () => {
    let uid;
    let email;
    try {
      uid = await AsyncStorage.getItem('uid');
      email = await AsyncStorage.getItem('email');
    } catch (e) {
      e.printStack();
    }

    this.setState(prevState => ({
      uid: uid,
    }));

    this.setState(prevState => ({
      email: email,
    }));

    this.setInfo();
  };

  setInfo() {
    let email = this.state.email;
    let avatar = email.charAt(0).toUpperCase();
    this.setState(prevState => ({
      avatar: avatar,
    }));
  }

  render() {
    return (
      <NativeBaseProvider>
        <Box flex={1} backgroundColor="#faf9f9">
          <Center flex={1}>
            <Avatar
              display="flex"
              alignItems="center"
              justifyContent="center"
              bg="green.500"
              size="2xl"
              _text={{
                fontSize: '7xl',
                fontWeight: 'medium',
                color: 'warmGray.50',
              }}>
              {this.state.avatar}
            </Avatar>
          </Center>
          <Box flex={2}>
            <Center>
              <Text fontSize="lg">UID : {this.state.uid}</Text>
              <Text fontSize="lg">Email : {this.state.email}</Text>
            </Center>
          </Box>
        </Box>
      </NativeBaseProvider>
    );
  }
}
