import React, { useState, useEffect, useRef } from 'react';
import { Text, View, StyleSheet,Image, Button, TextInput, TouchableOpacity } from 'react-native';

export default function Login (props) {
  const {
    navigation
  } = props;
  const loginInput = useRef(null);
  const [ value, setValue ] = useState('');
  const [show, setShow ] = useState(false);
  const onChangeText = (text) => {
    const value = text.replace(/\D+/g, '');
    setValue(value);
  }
  const onPress = () => {
    if ( value.length === 11) {
      navigation.navigate('bankbanding', {
        loginTel: value
      })
    }
  }
  const handleBlur = (e) => {
    const reg = /^1[3456789]\d{9}$/;
    const flag = reg.test(value);
    if (flag){
      setShow(false);
    } else {
      setShow(true)
    }
  }
  useEffect(() => {
    loginInput.current.focus();
  }, [])
  return (
    <View style={styles.loginWrapper}>
      <View style={styles.imgBox}>
        <Image style={styles.img} source={require('../../assets/payment/logo.png')} />
        <Text style={styles.text}>先享后付 微花一下</Text>
      </View>
      <TextInput
         ref={loginInput}
         style={ styles.input}
         onChangeText={text => onChangeText(text)}
         value={value}
         keyboardType="numbers-and-punctuation"
         maxLength= {11}
         placeholder="请输入手机号"
         placeholderTextColor="#999999"
         onBlur={handleBlur}
      />
      { show && <Text>您输入的手机号不正确</Text>}
      {/* 按钮 */}
      <TouchableOpacity
        style={styles.button}
        onPress={onPress}
      >
        <Text style={styles.btnText}>
          登入/注册
        </Text>
      </TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({
  button: {
    width: 335,
    height: 47,
    borderRadius: 8,
    backgroundColor: '#FF5861',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  btnText: {
    color: '#FFFFFF',
    fontSize: 16
  },
  loginWrapper: {
    justifyContent: "center",
    alignItems: 'center'
  },
  imgBox: {
    height: 63,
    marginTop: 100
  },
  img: {
    width: 90,
    height: 30,
  },
  text: {
    color: '#000000',
    fontSize: 15
  },
  input: {
    width: 345,
    height: 50,
    color: '#000000',
    borderWidth: 1,
    fontSize: 18,
    borderColor: '#DCDCDC'
  }
})