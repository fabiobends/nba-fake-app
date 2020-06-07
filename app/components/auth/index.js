import React, { Component } from 'react'
import { Text, StyleSheet, View, Button, ActivityIndicator } from 'react-native'
// OTHER COMPONENTS
import Logo from './authLogo';
import AuthForm from './authForm';

import { connect } from 'react-redux';
import { autoSignIn } from '../../store/actions/userActions';
import { bindActionCreators } from 'redux';

import { setTokens, getTokens } from "../../utils/misc";

class Auth extends Component {

  state = {
    loading: true
  }

  goNext = () => {
    this.props.navigation.navigate('App')
  }

  componentDidMount = () => {
    // console.log('this.props.User');
    // console.log(this.props.User)

    getTokens(value => {

      if (value[0][1] === null) {
        this.setState({ loading: false });
      } else {
        this.props.autoSignIn(value[1][1]).then(() => {
          if (!this.props.User.uid) {
            this.setState({ loading: false })
          } else {
            // setTokens(this.props.User.auth, () => {
              this.goNext();
            // })
          }
        });
        this.goNext();
      }
    })
  }

  render() {
    return (
      <View style={styles.container} >
        <Logo />
        {this.state.loading ?
          <ActivityIndicator animating={this.state.loading} /> :
          <AuthForm
            goNext={this.goNext}
          />
        }
      </View >
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3b5998',
    paddingHorizontal: 50,
    paddingVertical: 30
    //'#3b5998'   '#cd2020' 
  }
})

function mapStateToProps(state) {
  // console.log(state)
  return {
    User: state.User
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ autoSignIn }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(Auth);