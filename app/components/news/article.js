import React, { Component } from 'react'
import { Text, StyleSheet, View, ScrollView, Image } from 'react-native'

import Moment from 'moment';

export default function Article({ route, navigate }) {

  const formatText = (text) => {
    let formatedText = text.replace(/<p>/g, '').replace(/<\/p>/g, '');
    return formatedText;
  }

  return (
    <ScrollView style={{ backgroundColor: "#f0f0f0" }}>
      <Image
        style={{ height: 250 }}
        source={{ uri: route.params.imagePic }}
        resizeMode={'cover'}
      />
      <View style={styles.articleContainer}>
        <View>
          <Text style={styles.articleTitle}>
            {route.params.title}
          </Text>
          <Text style={styles.articleData}>
            {route.params.team} - Posted at: {Moment(route.params.date).format('d MMMM')}
          </Text>
        </View>
        <View style={styles.articleContent}>
          <Text style={styles.articleText}>
            {formatText(route.params.content)}
          </Text>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  articleContainer: {
    padding: 10
  },
  articleTitle: {
    fontFamily: 'Roboto-Bold',
    color: '#323232',
    fontSize: 23,
  },
  articleData: {
    fontFamily: 'Roboto-Light',
    color: '#828282',
    fontSize: 12
  },
  articleContent: {
    marginTop: 30
  },
  articleText: {
    fontFamily: 'Roboto-Light',
    lineHeight: 20,
    fontSize: 14
  }
})
