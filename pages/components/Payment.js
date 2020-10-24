import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, Button, TouchableOpacity } from 'react-native';
import Account from './Account';
import Cover from './Cover';

export default function Payment (props) {
  const {
    orderDetails,
    payInfo,
    navigation
  } = props;
  const [show, setShow] = useState(false);
  const merchantName = orderDetails ? orderDetails.merchantName : '';
  const onPress = (e) => {
    setShow(!show)
    // console.log(e)
    // navigation.navigate('home')
  }
  return (
    <View style={styles.paymentWrapper}>
      {/* 测试 cover */}
      { show && <Cover />  }
      <View style={styles.header} >
          <Image source={require('../../assets/payment/logo.png')} />
          <Text>先享后付 微花一下</Text>
      </View>
      {/* 公司详情页 */}
      <View style={ styles.pay}>
        <View style={styles.padyCompony}>
          <Text>付款给</Text>
          <Text>{ merchantName }</Text>
        </View>
        <View style={styles.account}>
          { payInfo.length > 1 && payInfo.map((item, index ) => {
            return (
              <Account 
                uniKey = { item.cnt}
                firstPay = { item.isFirstPay === 'Y'}
                payAmt = { item.payAmt }
                dueDate = { item.dueDate }
              />
            )
          })}
        </View>
        <View style={styles.totalAmout}>
          <Text style={styles.color999}>订单金额</Text>
          <View>
            <Text  style={styles.color999}>￥{orderDetails && orderDetails.orderAmount }</Text>
          </View>
        </View>
        {/* 优惠信息 */}
        <View style={styles.totalAmout}>
          <Text style={styles.color999}>优惠信息</Text>
          <View>
            <Text  style={styles.color999}>登入后查看</Text>
          </View>
        </View>
        {/* 订单信息 */}
        <View style={[styles.totalAmout,]}>
          <Text style={styles.color999}>订单信息</Text>
          <View>
            <Text  style={styles.color999}>{orderDetails && orderDetails.goodsName }</Text>
          </View>
        </View>
      </View>
      {/* 代扣协议 */}
      <View style={styles.flexStart}>
        <View >
          <Text>😯</Text>
        </View>
        <View>
          <Text style={styles.xieyi}>阅读并同意【微花一下】 代扣协议</Text>
        </View>
      </View>
      {/* 按钮 */}
      <TouchableOpacity
        style={styles.button}
        onPress={onPress}
      >
        {/* 这里后面需要计算或者访问接口拿到值展示 */}
        <Text style={styles.btnText}>
          支付首付款 ￥{orderDetails ? orderDetails.toPayAmount : ''}
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
  xieyi: {
    fontSize: 17,
    color: '#666666',
    textDecorationLine: 'underline'
  },
  totalAmout: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 20,
    marginTop: 16,
  },
  flexStart: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    width: 345,
    marginTop: 15
  },  
  color999: {
    color: '#999999',
    fontSize: 14
  },
  account: {
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE'
  },
  paymentWrapper: {
    position: 'relative',
    zIndex: 1,
    left: 0,
    right: 0,
    justifyContent: "space-around",
    alignItems: 'center'
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    // width: '88%',
    height: 114,
    // borderWidth: 1,
    margin: 3,
    // borderColor: '#000000',
    // backgroundColor: '#F7F7F7'
  },
  padyCompony: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderColor: '#EEEEEE',
    borderBottomWidth: 1,
    height: 52,
  },
  pay: {
    width: 345,
    height:427,
    borderRadius: 8,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: '#FFFFFF'
  }
})