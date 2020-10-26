import React, { useState, useEffect, useRef } from 'react';
import { Text, View, StyleSheet,Image, Button, TextInput, TouchableOpacity } from 'react-native';

export default function Bankbanding (props) {
  const { 
    route,
    navigation
  } = props;
  const telReg = /^(\d{3})(\d{4})(\d{4})$/;
  const hasTel = route.params ? route.params.loginTel.replace(telReg, '$1 $2 $3') : '';
  // 使用form
  const [form, setValues ] = useState({
    name: '',
    idCard: '',
    bankCard: '',
    tel: hasTel,
  });
  //  使用对象维护输入框检查展示状态
  const [formStatus, setFormStatus ] = useState({
    showName: false,
    showIdCard: false,
    showBankCard: false,
    showTel : false
  });
  // 是否可以提交的状态
  const [ableConfirm, setAbleConfirm ] = useState({
    nameConfirm: false,
    idCardConfirm: false,
    bankCardConfirm: false,
    telConfirm: hasTel ? true : false,
  })
  // 是否展示绑卡成功
  const [toast, setToast] = useState(false);
  // ref
  const nameRef = useRef(null);
  const idCardRef = useRef(null);
  const bankCardRef = useRef(null);
  const telRef = useRef(null);
  const onChangeName = (text) => {
    const nameLength = text.length;
    if ( nameLength > 1) {

    }
    setValues({
      ...form,
      name: text
    });
    // 维护blur后重新输入的状态
    setFormStatus({
      ...formStatus,
      showName: false
    })
  } 
  const onChangeIdCard = (text) => {
    const reg = /(....)(?=.)/g;
    const checkReg = /^[1-9][0-9]{5}([1][9][0-9]{2}|[2][0][0|1][0-9])([0][1-9]|[1][0|1|2])([0][1-9]|[1|2][0-9]|[3][0|1])[0-9]{3}([0-9]|[X])$/;
    const checkStatus = checkReg.test(text.replace(/\D+/g, ''));
    setAbleConfirm({
      ...ableConfirm,
      idCardConfirm: checkStatus
    });
    setValues({
      ...form,
      idCard: text.replace(/\D+/g, '').replace(reg, '$1 ')
    });
    // 维护blur后重新输入的状态
    setFormStatus({
      ...formStatus,
      showIdCard: false
    })
  }
  const onChangeBankCard = (text) => {
    // 正则大法香
    const reg = /(....)(?=.)/g;
    const checkReg = /^[0-9]{16,19}$/;
    const checkStatus = checkReg.test(text.replace(/\D+/g, ''));
    setAbleConfirm({
      ...ableConfirm,
      bankCardConfirm: checkStatus
    })
    setValues({
      ...form,
      bankCard: text.replace(/\D+/g, '').replace(reg, '$1 ')
    });
    // 维护blur后重新输入的状态
    setFormStatus({
      ...formStatus,
      showBankCard: false
    })
  }
  const onChangeTel = (text) => {
    const reg = /(....)(?=.)/g;
    setValues({
      ...form,
      // tel: text.replace(/\D+/g, '').replace(reg, '$1 ')
      tel: text.replace(/\D+/g, '')
    });
    // 维护blur后重新输入的状态
    setFormStatus({
      ...formStatus,
      showTel: false
    })
  }
  const inputNameBlur = () => {
    const reg = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/;
    const nameStatus = reg.test(form.name);
    if (!nameStatus){
      // 姓名不合法
      setFormStatus({
        ...formStatus,
        showName: true
      });
      // 处理特殊情况 重置false
      setAbleConfirm({
        ...ableConfirm,
        nameConfirm: false,
      });
    } else {
      setFormStatus({
        ...formStatus,
        showName: false
      });
      // 可提交状态
      setAbleConfirm({
        ...ableConfirm,
        nameConfirm: true,
      });
      // idCardRef.current.focus();
    }
  }
  const idCardBlur = () => {
    const reg = /^[1-9][0-9]{5}([1][9][0-9]{2}|[2][0][0|1][0-9])([0][1-9]|[1][0|1|2])([0][1-9]|[1|2][0-9]|[3][0|1])[0-9]{3}([0-9]|[X])$/;
    const trimReg = /\s+/g;
    const matchReg = /^(\d{6})(\d{8})(\d{4})$/g;
    // 将身份证展示的空格去掉后再做判断
    const idCardStatus = reg.test(form.idCard.replace(trimReg, ''));
    if ( !idCardStatus ) {
      // 身份证不合法
      setFormStatus({
        ...formStatus,
        showIdCard: true
      });
      setAbleConfirm({
        ...ableConfirm,
        idCardConfirm: false,
      });
    } else {
      setFormStatus({
        ...formStatus,
        showIdCard: false
      });
      setAbleConfirm({
        ...ableConfirm,
        idCardConfirm: true,
      });
      // 身份证输入正确展示空格
      // const okayIdCard = form.idCard.replace(matchReg, '$1 $2 $3');
      // setValues({
      //   ...form,
      //   idCard: okayIdCard
      // })
      // 自动聚焦到下一栏
      bankCardRef.current.focus();
    }
  }
  const bankCardBlur = () => {
    const reg = /^[0-9]{16,19}$/;
    // 获取银行卡 去掉当前空格
    const bankCard = form.bankCard.replace(/\D+/g, '');
    const bankCardStatus = reg.test(bankCard);
    if ( !bankCardStatus ) {
      // 银行卡输入不合法
      setFormStatus({
        ...formStatus,
        showBankCard: true
      });
      setAbleConfirm({
        ...ableConfirm,
        bankCardConfirm: false,
      });
    } else {
      // 银行卡合法
      setFormStatus({
        ...formStatus,
        showIdCard: false
      });
      setAbleConfirm({
        ...ableConfirm,
        bankCardConfirm: true,
      });
      // 银行卡输入正确自动聚焦到下一栏
      telRef.current.focus();
    }
  }
  const telBlur = () => {
    const reg = /^1[3456789]\d{9}$/;
    const telStatus = reg.test(form.tel.replace(/\D+/g, ''));
    if ( !telStatus ) {
      setFormStatus({
        ...formStatus,
        showTel: true
      });
      setAbleConfirm({
        ...ableConfirm,
        telConfirm: false,
      });
    } else {
      const okayTel = form.tel.replace(telReg, '$1 $2 $3');
      setAbleConfirm({
        ...ableConfirm,
        telConfirm: true,
      });
      setValues({
        ...form,
        tel: okayTel
      })
      setFormStatus({
        ...formStatus,
        showTel: false
      });
    }

  }
  const onBtnPress = () => {
    const { nameConfirm, idCardConfirm, bankCardConfirm, telConfirm } = ableConfirm;
    const ableBtnStatus = nameConfirm && idCardConfirm && bankCardConfirm && telConfirm;
    if ( ableBtnStatus ) {
      // navigation.navigate('home')
      setToast(true);
    }
  }
  // 组件挂在聚焦姓名输入
  useEffect(() => {
    nameRef.current.focus();
  }, []);
  return (
    <View style={styles.cardWrapper}>
      {/* 绑卡成功 */}
      {/* <View style={[styles.sucToastWrapper,  styles.block]}>
        <View style={[styles.sucBindCarda]}>
          <Text style={styles.sucText}>绑卡成功</Text>
        </View>
      </View> */}
      <View style={styles.img}>
        <Image style={styles.img} source={require('../../assets/bindCard/bind.png')} />
      </View>
      {/* 姓名 */}
      <View>
        <TextInput
          ref={nameRef}
          style={[styles.input, styles.img]}
          onChangeText={text => onChangeName(text)}
          value={form.name}
          keyboardType="email-address"
          maxLength= {8}
          placeholder="请输入姓名"
          placeholderTextColor="#999999"
          onBlur={inputNameBlur}
        />
        { formStatus.showName && <Text style={styles.errEnter}>姓名格式错误，请检查</Text>}
      </View>
      {/* 身份证 */}
      <View>
        <TextInput
          ref={idCardRef}
          style={[styles.input, styles.img]}
          onChangeText={text => onChangeIdCard(text)}
          value={form.idCard}
          keyboardType="numbers-and-punctuation"
          maxLength= {22}
          placeholder="请输入身份证号"
          placeholderTextColor="#999999"
          onBlur={idCardBlur}
        />
        { formStatus.showIdCard && <Text style={styles.errEnter}>身份证格式错误，请检查</Text>}
      </View>
      {/* 银行卡 */}
      <View>
        <TextInput
          ref={bankCardRef}
          style={[styles.input, styles.img]}
          onChangeText={text => onChangeBankCard(text)}
          value={form.bankCard}
          keyboardType="numbers-and-punctuation"
          maxLength= {23}
          placeholder="请输入银行卡号"
          placeholderTextColor="#999999"
          onBlur={bankCardBlur}
        />
        { formStatus.showBankCard && <Text style={styles.errEnter}>银行卡格式错误，请检查</Text>}
      </View>
      {/* 手机号 */}
      <View>
        <TextInput
          ref={telRef}
          style={[styles.input, styles.img]}
          onChangeText={text => onChangeTel(text)}
          value={form.tel}
          keyboardType="numbers-and-punctuation"
          maxLength= {13}
          placeholder="请输入手机号"
          placeholderTextColor="#999999"
          onBlur={telBlur}
        />
        { formStatus.showTel && <Text style={styles.errEnter}>手机号格式错误，请检查</Text>}
      </View>
      {/* 阅读协议 */}
      <View>
        <Text>阅读相关协议</Text>
      </View>
      {/* 提交按钮 */}
      <TouchableOpacity
        style={[styles.button,  ableConfirm.nameConfirm && ableConfirm.telConfirm && ableConfirm.bankCardConfirm && ableConfirm.idCardConfirm && styles.ableConfirm]}
        onPress={onBtnPress}
      >
        {/* 这里后面需要计算或者访问接口拿到值展示 */}
        <Text style={styles.btnText}>
          立即提交
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  sucToastWrapper: {
    width: '100%',
    // flex: 1,
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    opacity: 1,
    zIndex: 98,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    // display: 'flex'
  },
  sucBindCarda: {
    position: 'relative',
    top: 82,
    left: 40,
    width: 300,
    height: 47,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    zIndex: 99,
    borderRadius: 8,
  },
  block: {
    // display: 'flex'
  },
  sucText: {
    color: '#FFFFFF',
    fontSize: 15
  },
  ableConfirm: {
    backgroundColor: '#FF5861'
  },
  button: {
    width: 335,
    height: 47,
    borderRadius: 8,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  btnText: {
    color: '#FFFFFF',
    fontSize: 16
  },
  img: {
    width: 345,
    height: 55,
  },
  cardWrapper: {
    width: '100%',
    height: '100%',
    paddingTop: 10,
    // justifyContent: "center",
    alignItems: "center",
    position: 'relative',
    top: 0,
    left: 0,
  },
  input: {
    color: '#000000',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE'
  },
  errEnter: {
    fontSize: 12,
    color: '#E55959'
  }
})