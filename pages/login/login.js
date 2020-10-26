import React, { useState, useEffect, useRef } from 'react';
import { Text, View, StyleSheet,Image, Button, TextInput, TouchableOpacity, AsyncStorage } from 'react-native';
import { BASEURL } from '../../utils/CONSTS';
import { MOBILE_EXIST } from '../../utils/API';

export default function Login (props) {
  const {
    navigation
  } = props;
  const loginInput = useRef(null);
  const [ value, setValue ] = useState('');
  const [ userInfo, setUserInfo ] = useState({
    phoneExit: false,
    token: ''
  });
  const [show, setShow ] = useState({
    errText: false,
    ableConfirm: false,
  });
  const onChangeText = (text) => {
    const value = text.replace(/\D+/g, '');
    const reg = /^1[3456789]\d{9}$/;
    if ( value.length === 11) {
      const phoneStatus = reg.test(value);
      setShow({
        ableConfirm: phoneStatus,
        errText: !phoneStatus
      });
    } else {
      setShow({
        ableConfirm: false,
        errText: false
      })
    }
    setValue(value);
  }
  const onPress = () => {
    if ( show.ableConfirm ) {
      // 判断用户是否已注册
      const phoneExitsUrl = BASEURL + MOBILE_EXIST;
      fetch(phoneExitsUrl, {
        method: 'POST',
        body: JSON.stringify({
          mobile: Number(value)
        })
      })
        .then(res => res.json())
        .then( res => {
          if ( res.code === 200) {
            const { exist, token } = res.data;
            if ( exist ) {
              // 用户已存在, 打开发送验证码组件
              setUserInfo({
                ...userInfo,
                phoneExit: exist
              })
            } else {
              // 跳转到绑定银行卡页面 并且把当前获取的token存入 storage里面; 每次都保存最新的token信息
              AsyncStorage.setItem('AUTH_TOKEN', token, error => {
                 if ( !error) {
                  //  如果正常存储 然后跳转到绑卡界面
                  navigation.navigate('bankbanding', {
                    loginTel: value
                  });
                 };
              });
            }
          }
        })
        .catch( error => {
          console.log(error, 'from login.js')
        });
    }
  }
  const handleBlur = (e) => {
    const reg = /^1[3456789]\d{9}$/;
    const flag = reg.test(value);
    // 失焦 如果手机号输入正确
    if ( flag) {
      setShow({
        errText: false,
        ableConfirm: true,
      })
    } else {
      setShow({
        errText: true,
        ableConfirm: false
      })
    };
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
      { show.errText && <Text>您输入的手机号不正确</Text>}
      {/* 按钮 */}
      <TouchableOpacity
        style={[styles.button, show.ableConfirm && styles.ableConfirmBtn]}
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
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  ableConfirmBtn: {
    backgroundColor: '#FF5861',
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