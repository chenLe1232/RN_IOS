import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet,Image, Button, TextInput, TouchableOpacity } from 'react-native';

export default function Bankbanding (props) {
  const { 
    route,
    navigation
  } = props;
  return (
    <View>
      <Text>Bankbanding</Text>
      <Text>{JSON.stringify(route.params.loginTel)}</Text>
    </View>
  )
}