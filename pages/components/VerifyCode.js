import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, TextInput, Text,  View, Image, Button, TouchableOpacity, Platform, PixelRatio, Dimensions } from 'react-native';
import { padEnd } from 'lodash';

const isIos = Platform.OS === 'ios';
const SW = Dimensions.get('window').width;

function getRealDP(designPx) {
    return PixelRatio.roundToNearestPixel(designPx / 3);
}
const VerifyCode = (props) => {
  const {
    onChangeCode,
    codeLenth = 6,
  } = props;
  const inputRef = useRef(null);
  const [code, setCode ] = useState('');
  const onTouchInput = () => {
    const isFocused = inputRef.current.isFocused();
    if ( !isFocused ) {
      inputRef.current.focus();
    }
  }
  // 渲染code
  const renderVerifyCode = ( code ) => {
    const codeArray = padEnd(code, codeLenth, ' ').split('');
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={onTouchInput}
        style={styles.verifyTextContainer}
      >
        {codeArray.map((digit, index) => (
          <View
              key={index}
              style={digit === ' ' ? styles.textInputItem : styles.textInputItemIn}
          >
              <Text style={styles.verifyText}>{digit}</Text>
          </View>
        ))}
      </TouchableOpacity>
    )
  }
  return (
    <View style={styles.verifyContainer}>
      {renderVerifyCode(code)}
      <TextInput
        ref={inputRef}
        autoFocus={true}
        maxLength={6}
        style={styles.textInput}
        keyboardType={'numeric'}
        onChangeText = { (text) => {
          const currentCode = text.toString().replace(/\D+/g, '');
          setCode(currentCode);
          onChangeCode(currentCode);
        }}
        value ={code}
      />
    </View>
  )
};

const styles = StyleSheet.create({
    // textInput样式
    textInput: {
      height: isIos ? 0 : getRealDP(1),
      width: SW,
      position: 'absolute',
      bottom: 0,
      left: 0
    },
    // 验证码输入框总容器
    verifyContainer: {
      // marginTop: 100,
      width: 300,
        // width: SW,
        // height: getRealDP(150),
      height:40,
      // borderColor: 'yellow',
      // borderWidth: 1
    },
    // 验证码带下划线输入格
    textInputItem: {
      // width: getRealDP(120),
      width: 38,
      // borderWidth: 3,
      borderWidth: getRealDP(4),
      alignItems: 'center',
      justifyContent: 'center',
      borderColor: '#888888'
    },
    textInputItemIn: {
      // width: getRealDP(120),
      width: 38,
      // borderWidth: 3,
      borderWidth: getRealDP(4),
      alignItems: 'center',
      justifyContent: 'center',
      borderColor: '#4ea8de'
    },
    // 输入验证码样式
    verifyText: {
      fontSize: 20,
      color: '#000000'
    },
    // 验证码文本框容器
    verifyTextContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      // backgroundColor: 'pink'
      // width: SW,
      // height: getRealDP(150),
      // paddingHorizontal: getRealDP(74),
      // position: 'absolute',
      // left: 0,
      // top: 0
    }
})

export default VerifyCode;