import React, {Component} from "react";
import {Text, StyleSheet, TouchableHighlight, TouchableOpacity, View} from "react-native";

export default class Button extends Component {
    state = {
        status: 1,
        disabled:false,
    };
    /*customPressHandler(){
        //不建议这样定义方法
        alert('你按下了按钮');
    }*/
    customPressHandler = () => {
        //自定义的方法，请使用属性来定义,这里自定的把this绑定到这个方法上
        alert('你按下了按钮' + this.state.status);
    };
    onPress = ()=>{
        const {onPress } =this.props;
        onPress ? onPress():"";
    };
    enable=()=>{
        this.setState({
          disabled:false,
      })
    };
    disabled =()=>{
        this.setState({
            disabled:true,
        })
    };
    render(){
        const {name, backgroundColor} = this.props;
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center',marginTop:54}}>
                <TouchableOpacity
                    disabled={this.state.disabled}
                    style={[styles.button,
                        {backgroundColor:backgroundColor?backgroundColor:'green'},
                        this.state.disabled && styles.disabled]}
                    onPress={this.onPress}>
                    <Text style={styles.buttonText}>{name ? name:"确定"}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        width: 335,
        height: 47,
        borderRadius: 8,
        backgroundColor: '#FF5861',
        justifyContent: 'center',
        overflow: 'hidden'
    },
    buttonText: {
        textAlign: 'center'
    },
    disabled:{
        backgroundColor:'gray',
    },
});