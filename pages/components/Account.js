import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';

export default function Account (props) {
  const {
    isFirstPay,
    payAmt,
    dueDate,
    uniKey
  } = props.item;
  const firstPay = isFirstPay === 'Y';
  return (
    <View style={styles.acnWrapper} key={uniKey}>
      <View>
        { firstPay ? 
          <Text style={[styles.firstPay, styles.margin2]}>首付款</Text> 
          :
           <View style={[styles.flex0, styles.margin2]}>
             <Text style={styles.font14}>1/3尾款</Text>
             <Text style={styles.lixi}>0利息</Text>
           </View>
        }
        <View style={styles.flex0}>
          <Text style={styles.noFirst}>{dueDate}</Text>
          <Text style={styles.noFirst}>{ firstPay ? '今天' : '自动扣款'}</Text>
        </View>
      </View>
      <View>
        <Text style={ firstPay ?  styles.firstPay : styles.font14}>￥ { payAmt } </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
 
  acnWrapper: {
    flexDirection: 'row',
    justifyContent: "space-around",
    alignItems: "center",
    height: 61,
    fontSize: 14,
    color: '#999999',
    // borderWidth: 1,
    // borderColor: 'red'
  },
  noFirst: {
    color: '#999999',
    fontSize: 11,
  },
  firstPay: {
    color: '#000000',
  },
  flex0: {
    width: 114,
    height: 20,
    lineHeight: 20,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    color: '#999999',
    alignItems: 'center'
  },
  lixi: {
    color: '#FF5861',
    width: 41,
    marginLeft: 6,
    fontSize: 10,
    borderRadius:2,
    borderWidth: 1,
    height: 14,
    lineHeight: 14,
    borderColor: 'rgba(255, 88, 97, 0.3)',
    justifyContent: "center",
    alignItems: 'center',
    // flexDirection: 'row'
    textAlign: 'center'
  },
  font14: {
    fontSize: 14,
    color: '#999999'
  },
  margin2: {
    marginBottom: 2,
  }
})