import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import Button from './pages/components/Button';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Page from './pages/a';

function Home(props) {
  const { navigation } = props;
  const [a, setA] = useState('hello')
  let  params =  {
    name: "乐臣",
    idNum: "362531199510020017",
    cardNo: "6212261502003725847",
    mobile: "13367946276",
    serialNo: "",
  };
  // const baseUrl = 'https://develop--api-buyer.myweihua.com//user/login/mobile/code-verify';
  // fetch(baseUrl).then(res => res.json()).then(res => {
  //   if(res && res.msg){
  //     setA(res.msg)
  //   }
  // });
  // a ='fjaewljflw'
  return (
    <View style={styles.container}>
      <View style={styles.headText}>
        <Text style={styles.title}>微花一下</Text>
        <Text style={styles.h3}>微花一下，随心购物</Text>
        <Text style={styles.h2}>好物抢先享，购物更便捷</Text>
      </View>
      <Image style={styles.img} source={require('./assets/img_01.png')} />
      <Button 
        name='立即「微花一下」' 
        backgroundColor='#FF5861'
        onPress={() => {
          setA('按钮按了一下我呀');
          navigation.navigate('page1')
        }} />
      {/* <StatusBar style="auto" /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop:72,
    // width: 100,
    // height: 100,
    // flex: 1,
    // backgroundColor: 'pink',
    // marginLeft: 200,
    // marginTop: 100,
    // flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'center',
  },
  headText: {
    width: '100%',
    // backgroundColor: 'red',
    alignItems: 'center',
  },
  title: {
    width: 72,
    height: 25,
    fontSize: 18,
    color: '#000000',
    lineHeight: 25,
    // backgroundColor: 'green'
  },
  h3: {
    fontSize: 24,
    marginTop: 91,
    marginBottom: 4,
  },
  h2: {
    fontSize: 14,
    color: '#999999'
  },
  img: {
    marginTop: 29.5,
    // borderWidth: 2,
    // borderColor: 'red'
  }
});
const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="home" 
          component={Home} 
          options={{
            title: '主页'
          }}
        />
        <Stack.Screen 
          name="page1" 
          component={Page} 
          options={{
            title: '页面2'
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
