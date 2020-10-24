import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';

export default function Cover (props) {

  return (
    <View style={styles.wrapper}>
      <Text>cover</Text>
    </View>
  )
}
const styles = StyleSheet.create({
  wrapper: {
    width: 375,
    height: 500,
    backgroundColor: 'red',
    zIndex: 19,
    position: 'absolute',
    top: 0,
    left: 0
  }
})