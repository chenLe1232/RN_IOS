import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
// import { BarCodeScanner } from 'expo-barcode-scanner';
import { BASEURL } from '../../utils/CONSTS';
import { PAYMENTS } from '../../utils/API';
import Payment from './Payment';
import cloneDeep from 'lodash/cloneDeep';
// import {fetch} from '../../utils/fetch';

export default function Page2({ navigation }) {
  const [orderDetails, SetOrder ] = useState('');
  const [payInfo, setPayINfo ] = useState([]);
  useEffect(() => {
    const fetchData =  () => {
      const params = {
        orderId: 'O2639845667664560131',
        from: 'h5'
      }
      fetch(`${BASEURL}${PAYMENTS}`, {
        method: 'POST',
        body: JSON.stringify(params)
      })
      .then( res => res.json())
      .then(res => {
        // 目前未做异常处理  *** carline 2020-10-24
        // console.log(res.data.detail,'***** from res')
        const { detail } = res.data;
        const infos = cloneDeep(detail).restPayInfo;
        infos.unshift(detail.firstPayInfo);
        setPayINfo(infos);
        SetOrder(res.data.detail)
      })
      .catch(err => {
        console.log(err, 'from catch')
      })
    }
    fetchData()
  }, [])

  return (
    <View>
      <Payment 
        orderDetails={orderDetails} 
        payInfo={payInfo}
        navigation = {navigation}
      />
    </View>
  );
}