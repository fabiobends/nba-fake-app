import React from 'react'
import { StyleSheet, Text, View, TextInput } from 'react-native'

const Input = (props) => {

  let template = null;

  switch (props.type) {
    case 'text-input':
      template = (
        <TextInput
          {...props}
          placeholderTextColor={'#cecece'}
          autoCapitalize={'none'}
          style={[styles.inputStyle, props.overrideStyle]}
        />
      )
      break;
    default:
      return template
  }

  return template
}

export default Input;

const styles = StyleSheet.create({
  inputStyle: {
    borderBottomColor: '#cecece',
    borderBottomWidth: 1,
    fontSize: 16,
    padding: 5,
    marginTop: 10
  }
});
