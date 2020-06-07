import React, { Component } from 'react'
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator
} from 'react-native'

import { connect } from 'react-redux';
import { getGames } from '../../store/actions/gamesActions';
import Moment from 'moment';

class Games extends Component {

  componentDidMount() {
    this.props.dispatch(getGames());
  }

  renderGames = (list) => (
    list.games ?
      list.games.map((game, i) => (
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('GamesArticle', {
            ...game,
          })}
          key={i}
        >
          <View style={styles.gamesContainer}>
            <View style={styles.gamesBox}>
              <Image
                source={{ uri: `https://picsum.photos/8${i}` }}
                style={{ width: 80, height: 80 }}
                resizeMode={'contain'}
              />
              <Text style={styles.teamRecord}>{game.awayData.wins} - {game.awayData.loss}</Text>
            </View>
            <View style={styles.gamesBox}>
              <Text style={styles.gameTime}>{game.time}</Text>
              <Text>{Moment(game.date).format('d MMMM')}</Text>
            </View>
            <View style={styles.gamesBox}>
              <Image
                source={{ uri: `https://picsum.photos/7${i}` }}
                style={{ width: 80, height: 80 }}
                resizeMode={'contain'}
              />
              <Text style={styles.teamRecord}>{game.localData.wins} - {game.localData.loss}</Text>
            </View>
          </View>
        </TouchableOpacity>
      ))
      : <ActivityIndicator />
  )

  render() {
    return (
      <ScrollView style={{ backgroundColor: "#f0f0f0" }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            flexWrap: 'nowrap'
          }}
        >
          {this.renderGames(this.props.Games)}
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  gamesContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    backgroundColor: 'white',
    shadowColor: '#ddd',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    borderRadius: 2,
    elevation: 1
  },
  gamesBox: {
    width: "33.33%",
    height: 100,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  teamRecord: {
    fontFamily: 'Roboto-Light',
    fontSize: 12
  },
  gameTime: {
    fontFamily: 'Roboto-Bold',
    fontSize: 15
  }
})

const mapStateToProps = (state) => {
  return {
    Games: state.Games
  }
}
export default connect(mapStateToProps)(Games);
