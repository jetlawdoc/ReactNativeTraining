/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {
  AppRegistry,
  Component,
  Image,
  ListView,
  StyleSheet,
  Text,
  Alert,
  TouchableHighlight,
  TouchableNativeFeedback,
  Platform,
  View,
} from 'react-native';

import StarRating from 'react-native-star-rating';
import Icon from 'react-native-vector-icons/Ionicons';
import {Actions} from 'react-native-router-flux';

const styles = require('../style/movieListStyle.js');

var REQUEST_URL = 'https://raw.githubusercontent.com/jetlawdoc/ReactNativeTraining/master/MoviesExample.json';

class MovieList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
      starCount: 0,
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData.movies),
          loaded: true,
        });
      })
      .done();
  }

  onStarRatingPress(rating) {
    this.setState({
      starCount: rating
    });
  }

  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderMovie}
        style={styles.listView}
        renderSeparator={(sectionID, rowID) => <View key={`${sectionID}-${rowID}`} style={styles.separator} />}
      />
    );
  }

  renderLoadingView() {
    return (
      <View style={styles.loading}>
        <Text>
          Loading movies...
        </Text>
      </View>
    );
  }

  renderMovie(movie) {
    var TouchableElement = TouchableHighlight;
    if (Platform.OS === 'android') {
      TouchableElement = TouchableNativeFeedback;
    }
    return (
      <View>
        <TouchableElement
          onPress={()=>Actions.movie_screen({movie:movie})}>
          <View style={styles.movieRow}>
            <View style={styles.moviePoster}>
              <Image
                source={{uri: movie.posters.thumbnail}}
                style={styles.thumbnail}
              />
            </View>
            <View style={styles.movieDetails}>
              <Text style={styles.title}>{movie.title}</Text>
              <Text style={styles.year}>{movie.year}</Text>
            </View>
            <View style={styles.movieRatings}>
              <View style={styles.criticsRating}>
                <Text style={styles.year}>Critics Rating: </Text>
                <StarRating
                  disabled={true}
                  maxStars={5}
                  rating={(movie.ratings.critics_score*5)/100}
                  starColor={'red'}
                  starSize={15}
                  selectedStar={(rating) => this.onStarRatingPress(rating)}
                />
              </View>
              <View style={styles.audienceRating}>
                <Text style={styles.year}>Audience Rating: </Text>
                <StarRating
                  disabled={true}
                  maxStars={5}
                  rating={(movie.ratings.audience_score*5)/100}
                  starColor={'red'}
                  starSize={15}
                  selectedStar={(rating) => this.onStarRatingPress(rating)}
                />
              </View>
            </View>
          </View>
        </TouchableElement>
      </View>
    );
  }
}

module.exports = MovieList;
