import React, { Component } from 'react'
import { Text, StyleSheet, View, ActivityIndicator, ScrollView, Button } from 'react-native'
import Icon from 'react-native-vector-icons/dist/Ionicons';
import Youtube from 'react-native-youtube';
import { setTokens, getTokens } from "../../utils/misc";
import { connect } from 'react-redux';
import { autoSignIn } from '../../store/actions/userActions';

class Article extends Component {

  state = {
    loading: false,
    isAuth: true
  }

  componentDidMount = () => {
    const User = this.props.User;
    getTokens((value) => {
      if (value[0][1] === null) {
        this.manageState(true, false);
      } else {
        this.props.dispatch(autoSignIn(value[1][1]))
          .then(() => {
            if (!User.auth.token) {
              this.manageState(false, false)
            } else {
              this.manageState(false, true)
            }
          });
      }
    })
  }

  manageState = (loading, isAuth) => {
    this.setState({
      loading,
      isAuth
    })
  }

  render() {

    const params = this.props.route.params;
    const { navigate } = this.props.navigation;

    return (
      this.state.loading ?

        < View style={styles.loading} >
          <ActivityIndicator />
        </View >
        :
        <ScrollView style={{ backgroundColor: '#f0f0f0' }}>
          {this.state.isAuth ?
            <Youtube
              apiKey='AIzaSyCSHliET0iBkSGXVAETPLel0CNhdSE6Z1Y'
              videoId='JV2c0eMzwO8'
              play
              style={{ width: '100%', height: 250, backgroundColor: '#000' }}
            />
            :
            <View style={styles.notAuth}>
              <Icon name='md-sad' size={80} color={"#d5d5d5"} />
              <Text style={styles.notAuthText}>
                Sorry, you need to be logged to see the content
            </Text>
              <Button
                title={'Login/Register'}
                onPress={() => navigate('Auth', {})}
              />
            </View>
          }
        </ScrollView>

    )
  }
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  notAuth: {
    flex: 1,
    margin: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  notAuthText: {
    fontFamily: "Roboto-Bold"
  }
})

function mapStateToProps(state) {
  return {
    User: state.User
  }
}

export default connect(mapStateToProps)(Article);