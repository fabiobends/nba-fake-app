import React, { Component } from 'react'
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  View,
  ScrollView,
  ActivityIndicator,
} from 'react-native'

import { connect } from 'react-redux';
import { getNews } from '../../store/actions/newsActions';
import Moment from 'moment';

class News extends Component {

  componentDidMount() {
    this.props.dispatch(getNews());
  }

  renderNews = (news) => (
    news.articles ?
      news.articles.map((article, i) => (
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Article', {
            ...article,
            imagePic: `http://picsum.photos/${i}00`,
          })}
          key={i}
        >
          <View style={styles.cardContainer}>
            <View>
              <Image
                style={{ height: 150, justifyContent: 'space-around' }}
                source={{ uri: `http://picsum.photos/${i}00` }}
                resizeMode={'cover'}
              />
              <View styte={styles.contentCard}>
                <Text style={styles.titleCard}>{article.title}</Text>
                <View style={styles.bottomCardContent}>
                  <Text style={styles.bottomCardTeam}>{article.team} - </Text>
                  <Text style={styles.bottomCardText}>Posted at: {Moment(article.date).format('d MMMM')}</Text>
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      ))
      :
      <ActivityIndicator />
  )

  render() {
    return (
      <ScrollView style={{ backgroundColor: '#f0f0f0' }}>
        {this.renderNews(this.props.News)}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: 'white',
    margin: 10,
    shadowColor: '#ddd',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    borderRadius: 2,
    elevation: 1
  },
  contentCard: {
    borderWidth: 1,
    borderColor: '#ddd'
  },
  titleCard: {
    fontFamily: 'Roboto-Bold',
    color: '#232323',
    fontSize: 16,
    padding: 10
  },
  bottomCardContent: {
    flex: 1,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#e6e6e6',
    padding: 10
  },
  bottomCardTeam: {
    fontFamily: 'Roboto-Bold',
    color: '#828282',
    fontSize: 12
  },
  bottomCardText: {
    fontFamily: 'Roboto-Light',
    color: '#828282',
    fontSize: 12
  }
})

const mapStateToProps = (state) => {
  console.log(state)
  return {
    News: state.News
  }
}

export default connect(mapStateToProps)(News);
