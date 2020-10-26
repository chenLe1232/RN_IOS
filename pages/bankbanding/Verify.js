import React, { useState, useEffect, useRef } from 'react';
import { Text, View, StyleSheet,Image, Button, TextInput, TouchableOpacity } from 'react-native';
import PhoneCode from '../components/VerifyCode';

const Verify = ( props ) => {
  const {

  } = props;
  const [count, setCount ] = useState(10);
  useEffect(() => {
    const timer = setInterval(() => {
      setCount( count - 1)
    }, 1000);
    return () => clearInterval(timer)
  }, [count]);
  const onPressLearnMore = () => {
    setCount(10)
  }
  return (
    <View style={styles.verifyWrapper}>
      <View style={styles.verifyContent}>
        <View style={styles.iconClose}>
          <Text>X</Text>
        </View>
        {/* 核验验证码区域 */}
        <View style={styles.header}>
          <Text style={styles.codeText}>验证码已发送132****1234</Text>
          <View style={ styles.textRight}>
            {
              count <= 0 ?
              <TouchableOpacity
                onPress={onPressLearnMore}
                // style={ sty}
              >
                <Text style={styles.timeRed}>重新获取</Text>
              </TouchableOpacity>
              :
              <View style={styles.reload}>
                <Text style={styles.timeRed}>{count}s</Text>
                <Text style={styles.codeText}>重新获取1</Text>
              </View>
            }
          </View>
        </View>
    
        <PhoneCode onChangeCode={ () => {}}/>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  timeRed: {
    color: '#FF5861',
    fontSize: 15
  },
  reload: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  textRight: {
    marginLeft: 15,
    height: 21
  },
  verifyWrapper: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0, 0.6)',
  },
  verifyContent: {
    width: 306,
    height: 173,
    borderRadius: 8,
    backgroundColor: '#ffffff',
    position: 'relative',
    top: 0,
    left: 0,
    borderWidth: 1,
    borderColor: 'blue',
    overflow:'hidden'
  },
  iconClose: {
    width: 16,
    height: 16,
    marginTop: 12,
    marginLeft: 12,
    // borderWidth: 1,
    // borderColor: 'red'
  },
  header: {
    // width: 268,
    height: 21,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 33
  },
  codeText: {
    fontSize: 15,
    color: '#3F3F3F',
    // borderWidth: 1,
    // borderColor: 'red'
  }
})

export default Verify;