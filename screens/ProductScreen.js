import React, {Component} from 'react';
import {StyleSheet, Image} from 'react-native';
import {
  NativeBaseProvider,
  Flex,
  Center,
  VStack,
  Select,
  CheckIcon,
  Box,
  FlatList,
  Text,
  Icon,
} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {color} from 'react-native-reanimated';

export default class ProductScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: 'C001',
      data: [],
      categories: [],
    };
    this.getAllCategories();
  }

  componentDidMount() {
    this.getAllProductsByCategory('C001');
  }

  setCategory(category) {
    this.setState(prevState => ({
      category: category,
    }));
  }

  setData(data) {
    let newData = data;
    for (let i = 0; i < data.length; i++) {
      const element = data[i];
      let mainImg = element.mainImg;
      let paths = mainImg.split('/');
      // let newMain = "require(' " + mainImg + " ')";
      let newMain =
        "require('../assets/" +
        paths[3] +
        '/' +
        paths[4] +
        '/' +
        paths[5] +
        "')";
      // console.log(paths);
      // console.log(newMain);
      newData[i].mainImg = newMain;
    }
    this.setState(prevState => ({
      data: newData,
    }));
  }

  getAllProductsByCategory(category) {
    this.setCategory(category);
    fetch('http://192.168.8.101:8080/abc/product?id=' + category, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then(response => response.json())
      .then(json => this.setData(json.data));
  }

  getAllCategories() {
    fetch('http://192.168.8.101:8080/abc/category', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then(response => response.json())
      .then(json => this.setCategories(json.data));
  }

  setCategories(categories) {
    this.setState(prevState => ({
      categories: categories,
    }));
  }

  navigateToProductDetail(item) {
    let spec = item.specs;
    let newSpecs = [];

    if (!(spec == '')) {
      let specSplit = spec.split('_');
      for (let i = 0; i < specSplit.length; i++) {
        let item = specSplit[i].split('$');
        let jItem = {
          id: 'spec' + i,
          name: item[0],
          price: item[1],
        };
        newSpecs.push(jItem);
      }
    } else {
      newSpecs = null;
    }

    // console.log(item);

    let dimen = item.dimensions;
    let newDimen = [];
    // console.log(dimen);
    if (!(dimen == '')) {
      let dimenSplit = dimen.split('_');
      // console.log(dimenSplit);
      for (let k = 0; k < dimenSplit.length; k++) {
        let element = dimenSplit[k];
        // console.log(element);
        let dItem = {
          id: 'dim' + k,
          name: element,
        };
        newDimen.push(dItem);
      }
      // console.log(newDimen);
    } else {
      newDimen = null;
      // console.log('empty');
    }

    let warr = item.warranty;
    let newWarr = [];
    if (!(warr == '')) {
      let warrSplit = warr.split('_');
      for (let j = 0; j < warrSplit.length; j++) {
        let element = warrSplit[j];
        let wItem = {
          id: 'warr' + j,
          name: element,
        };
        newWarr.push(wItem);
      }
    } else {
      newWarr = null;
      // console.log('empty');
    }

    this.props.navigation.navigate('ProductDetail', {
      item,
      newSpecs,
      newDimen,
      newWarr,
    });
  }

  render() {
    return (
      <NativeBaseProvider>
        <Flex direction="column" backgroundColor="#faf9f9">
          <Center w="100%" h="10%" backgroundColor="#faf9f9">
            <Select
              selectedValue={this.state.category}
              w="75%"
              borderColor="#90CAF9"
              borderWidth={3}
              borderRadius={10}
              color="#2196F3"
              dropdownIcon={
                <Icon
                  as={<AntDesign name="caretdown" />}
                  size={5}
                  mr="2"
                  color="#BBDEFB"
                />
              }
              mx={{
                base: 0,
                md: 'auto',
              }}
              onValueChange={nextValue =>
                this.getAllProductsByCategory(nextValue)
              }
              _selectedItem={{
                bg: '#90CAF9',
                endIcon: <CheckIcon size={4} />,
              }}
              accessibilityLabel="Select a position for Menu">
              {this.state.categories.map(item => (
                <Select.Item
                  key={item.categoryID}
                  label={item.categoryName.toUpperCase()}
                  value={item.categoryID}
                />
              ))}
              {/* <Select.Item label="BEDS" value="C001" />
              <Select.Item label="CHAIRS" value="C002" />
              <Select.Item label="TABLES" value="C003" />
              <Select.Item label="SOFAS" value="C004" />
              <Select.Item label="OFFICE TABLES" value="C005" />
              <Select.Item label="DINNING TABLES" value="C006" />
              <Select.Item label="OFFICE CHAIRS" value="C007" /> */}
            </Select>
          </Center>
          <Box h="90%" w="100%" backgroundColor="#faf9f9" mt={4}>
            <FlatList
              w="100%"
              numColumns={2}
              data={this.state.data}
              renderItem={({item}) => (
                <TouchableWithoutFeedback
                  onPress={() => this.navigateToProductDetail(item)}>
                  <Flex
                    w={180}
                    h={215}
                    mx={2}
                    my={2}
                    direction="column"
                    style={style.product}>
                    <Box w={180} h={150}>
                      <Image
                        style={style.img}
                        source={require('../assets/C001/P001/P001_C001_1.jpg')}
                      />
                    </Box>
                    <Center w={180} h={65} style={{backgroundColor: '#ffffff'}}>
                      <Text>{item.name}</Text>
                      <Text>{item.code}</Text>
                      <Text>{item.price}</Text>
                    </Center>
                  </Flex>
                </TouchableWithoutFeedback>
              )}
              keyExtractor={item => item.productID}
            />
          </Box>
        </Flex>
      </NativeBaseProvider>
    );
  }
}
const style = StyleSheet.create({
  stack: {
    backgroundColor: 'blue',
  },
  center: {
    backgroundColor: 'green',
  },
  img: {
    width: '100%',
    height: '100%',
  },
  product: {
    // borderWidth: 1,
    // borderColor: '#BBDEFB',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
});

{
  /* <Flex w={180} h={210} direction="column">
              <Box w="100%" h="70%">
                <Image
                  style={{width: 180, height: 250}}
                  source={{uri: '../assets/regentbed.jpg'}}
                />
              </Box>
              <Center w="100%" h="30%" style={{backgroundColor: 'grey'}}>
                <Text>Chelsea Bed – 78″ x 72″</Text>
                <Text>( SBCE7872 )</Text>
                <Text>Rs. 101,775</Text>
              </Center>
            </Flex> */
}

{
  /* <Box w="60%" h={200} backgroundColor="cyan.400">
              <Image
                style={{width: 200, height: 200}}
                source={require('../assets/regentbed.jpg')}
              />
            </Box> */
}
