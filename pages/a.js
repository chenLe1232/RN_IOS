import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Image, Button, TextInput } from 'react-native';
import  * as Device from 'expo-device';
import * as Updates from 'expo-updates';
import Carme from './components/Carme';
import Car from './components/b';

export default function Page1({ navigation }) {

  const [value, onChangeText] = React.useState();
  return (
    <View>
      <Car navigation={navigation}/>
      {/* <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
      onChangeText={text => onChangeText(text)}
      value={value}
      autoCompleteType='postal-code'
      keyboardType='numbers-and-punctuation'
      /> */}
      {/* <Carme /> */}
      {/* <Button title="调回首页" onPress={() => { navigation.navigate('Homea')}} /> */}
    </View>
  )
}