import React, { Component } from 'react'
import { Text, StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native'

import Input from '../../utils/forms/input';
import validationRules from '../../utils/forms/validationRules';

import { connect } from 'react-redux';
import { signIn, signUp } from '../../store/actions/userActions';
import { bindActionCreators } from 'redux';

import { setTokens, getTokens } from "../../utils/misc";

class AuthForm extends Component {

  state = {
    type: 'Login',
    action: 'Login',
    actionMode: 'I want to register',
    hasErrors: false,
    forms: {
      email: {
        value: '',
        valid: false,
        type: 'text-input',
        placeholder: 'Enter your e-mail',
        rules: {
          isRequired: true,
          isEmail: true,
        }
      },
      password: {
        value: '',
        valid: false,
        type: 'text-input',
        placeholder: 'Enter your password',
        rules: {
          isRequired: true,
          minLength: 6,
        }
      },
      confirmPassword: {
        value: '',
        valid: false,
        type: 'text-input',
        placeholder: 'Confirm your password',
        rules: {
          confirmPass: 'password'
        }
      }
    }
  }

  componentDidMount = () => {
    getTokens((value) => {
      // console.log(value)
    })
  }

  inputText = (type, value) => {

    let tempForms = this.state.forms;
    tempForms[type].value = value;

    let rules = tempForms[type].rules;
    let valid = validationRules(rules, value, tempForms);
    tempForms[type].valid = valid;

    this.setState({
      forms: tempForms
    })
  }

  manageAccess = () => {
    if (!this.props.User.auth.uid) {
      this.setState({ hasErrors: true })
    } else {
      setTokens(this.props.User.auth, () => {
        this.setState({ hasErrors: false })
      });
      this.props.goNext();
    }
  }

  submitForm = () => {

    let isValid = true;
    let formValid = {};
    const tempForms = this.state.forms;

    for (let key in tempForms) {
      if (this.state.action === 'Login') {
        // Login
        if (key !== 'confirmPassword') {
          isValid = isValid && tempForms[key].valid;
          formValid[key] = tempForms[key].value;
        }
      } else {
        // Register
        isValid = isValid && tempForms[key].valid;
        formValid[key] = tempForms[key].value;
      }
    }

    if (isValid) {
      if (this.state.type === 'Login') {
        this.props.signIn(formValid).then(() => {
          this.manageAccess();
        });
      } else {
        this.props.signUp(formValid).then(() => {
          this.manageAccess();
        });
      }
    } else {
      this.setState({
        hasErrors: true
      })
    }
  }

  confirmPassComponent = () => (
    this.state.type != 'Login' &&
    <Input
      type={this.state.forms.confirmPassword.type}
      value={this.state.forms.confirmPassword.value}
      placeholder={this.state.forms.confirmPassword.placeholder}
      onChangeText={value => this.inputText('confirmPassword', value)}
      secureTextEntry
    />
  )

  hasErrorsInfo = () => (
    this.state.hasErrors &&
    <View style={styles.errorContainer}>
      <Text style={styles.errorLabel}>It has errors</Text>
    </View>
  )

  changeMode = () => {

    let type = this.state.type;
    let action = this.state.action;
    let actionMode = this.state.actionMode;

    this.setState({
      type: type == 'Login' ? 'Register' : 'Login',
      action: action == 'Login' ? 'Register' : 'Login',
      actionMode: actionMode == 'I want to login' ? 'I want to register' : 'I want to login'
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Input
          type={this.state.forms.email.type}
          value={this.state.forms.email.value}
          placeholder={this.state.forms.email.placeholder}
          onChangeText={value => this.inputText('email', value)}
          keyboardType={'email-address'}
        />
        <Input
          type={this.state.forms.password.type}
          value={this.state.forms.password.value}
          placeholder={this.state.forms.password.placeholder}
          onChangeText={value => this.inputText('password', value)}
          secureTextEntry
        />
        {this.confirmPassComponent()}
        {this.hasErrorsInfo()}
        <View style={{ marginTop: 30 }}>
          <TouchableOpacity activeOpacity={0.5}>
            <Text
              style={styles.buttons}
              onPress={this.submitForm}
            >{this.state.action}</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.5}>
            <Text
              style={styles.buttons}
              onPress={this.changeMode}
            >{this.state.actionMode}</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.5}>
            <Text
              style={styles.buttons}
              onPress={this.props.goNext}
            >I'll do it later</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%'
  },
  errorContainer: {
    backgroundColor: '#f44336',
    marginBottom: 10,
    marginTop: 30,
    padding: 5
  },
  errorLabel: {
    textAlignVertical: 'center',
    textAlign: 'center',
    color: 'white'
  },
  buttons: {
    color: '#4499ff',
    fontSize: 20,
    padding: 10,
    textAlign: 'center',
  }

});

function mapStateToProps(state) {
  // console.log(state)
  return {
    User: state.User
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ signIn, signUp }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(AuthForm);