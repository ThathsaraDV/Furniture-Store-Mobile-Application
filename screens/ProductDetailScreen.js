import React, {Component} from 'react';
import {Image, StyleSheet} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import {
  Flex,
  NativeBaseProvider,
  ScrollView,
  Text,
  Box,
  Center,
  Button,
  Icon,
  CircleIcon,
} from 'native-base';

let img = '';

export default class ProductDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.props.navigation.setOptions({
      title: props.route.params.item.name,
    });

    // console.log(props.route.params.item);
    // console.log('');
    // console.log(props.route.params.newSpecs);
    this.state = {
      spec: props.route.params.newSpecs,
      dimen: props.route.params.newDimen,
      warr: props.route.params.newWarr,
      item: props.route.params.item,
    };
    // this.getSpecs();
  }

  componentDidMount() {
    // console.log(this.state.item);
    // console.log(this.state.specs);
    // this.getSpecs();
    // console.log(this.state.dimen);
    // console.log(this.state.warr);
  }

  getDimensionView() {
    if (this.state.dimen == null) {
      return;
    } else {
      return (
        <>
          <Box>
            <Text pl={4} fontSize="lg" color="#2196F3">
              Dimensions
            </Text>
          </Box>
          <Box mt={3}>
            {this.state.dimen.map(item => (
              <Box
                ml={8}
                mb={2}
                h={5}
                key={item.id}
                display="flex"
                flexDirection="row"
                alignItems="center">
                <Icon
                  as={<Entypo name="dot-single" />}
                  size={8}
                  ml="2"
                  color="blue.500"
                />
                <Text>{item.name}</Text>
              </Box>
            ))}
          </Box>
        </>
      );
    }
  }

  getWarrantyViews() {
    if (this.state.warr == null) {
      return;
    } else {
      return (
        <>
          <Box>
            <Text pl={4} fontSize="lg" color="#2196F3">
              Warranty
            </Text>
          </Box>
          <Box mt={3}>
            {this.state.warr.map(item => (
              <Box
                ml={8}
                mb={2}
                h={5}
                key={item.id}
                display="flex"
                flexDirection="row"
                alignItems="center">
                {/* <CircleIcon size="2" mr={2} mt={0.9} /> */}
                <Icon
                  as={<Entypo name="dot-single" />}
                  size={8}
                  ml="2"
                  color="blue.500"
                />
                <Text>{item.name}</Text>
              </Box>
            ))}
          </Box>
        </>
      );
    }
  }

  getSpecificationViews() {
    if (this.state.spec == null) {
      return;
    } else {
      return (
        <>
          <Box>
            <Text pl={4} fontSize="lg" color="#2196F3">
              Specifications
            </Text>
          </Box>
          <Box mt={3}>
            {this.state.spec.map(item => (
              <Box
                ml={8}
                mb={2}
                h={5}
                key={item.id}
                display="flex"
                flexDirection="row"
                alignItems="center">
                {/* <CircleIcon size="2" mr={2} mt={0.9} /> */}
                <Icon
                  as={<Entypo name="dot-single" />}
                  size={8}
                  ml="2"
                  color="blue.500"
                />
                <Text>{item.name}</Text>
                <Text ml={3} bold color="#07aea4">
                  {item.price}
                </Text>
              </Box>
            ))}
          </Box>
        </>
      );
    }
  }

  render() {
    console.log(this.state.item.mainImg);
    return (
      <NativeBaseProvider>
        <ScrollView>
          <Flex flexDirection="column">
            <Box display="flex" alignItems="center" mt={4}>
              <Center w="80%" h={250} backgroundColor="emerald.800">
                {/* <Image
                  style={style.img}
                  source={require(this.state.item.mainImg)}
                  alt="Alternate Text"></Image> */}
                <Image
                  style={style.img}
                  source={require('../assets/C004/P006/P006_C004_1.jpg')}
                />
              </Center>
            </Box>
            <Box>
              <Center mt={4}>
                <Text fontSize="lg" color="#2196F3">
                  {this.state.item.name}
                </Text>
                <Text color="#2196F3">{this.state.item.code}</Text>
                <Text fontSize="2xl" mt={2} bold color="#07aea4">
                  {this.state.item.price}
                </Text>
              </Center>
              <Center w="100%" p={2}>
                <Text textAlign="justify" fontSize="md">
                  {this.state.item.description}
                </Text>
              </Center>
            </Box>
            {this.getSpecificationViews()}
            {this.getDimensionView()}
            {this.getWarrantyViews()}
          </Flex>
        </ScrollView>
      </NativeBaseProvider>
    );
  }
}

const style = StyleSheet.create({
  img: {
    width: '100%',
    height: '100%',
  },
});
