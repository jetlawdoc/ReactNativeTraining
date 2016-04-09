
import React, {
  Image,
  ScrollView,
  StyleSheet,
  BackAndroid,
  Text,
  InteractionManager,
  View,
} from 'react-native';
import {Actions} from 'react-native-router-flux'
import StarRating from 'react-native-star-rating';
import Icon from 'react-native-vector-icons/Ionicons';

const styles = require('../style/movieDetailsStyle.js');

var _navigator;
BackAndroid.addEventListener('hardwareBackPress', () => {
    console.log("Back!");
    Actions.pop;
    return true;
});

class MovieScreen extends React.Component {
  constructor(props, context) {
  super(props, context);
    this.state = {
      starCount: 0,
      loaded: true
    };
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({loaded: false});
    });
  }

  onStarRatingPress(rating) {
    this.setState({
      starCount: rating
    });
  }

  render() {
    if (this.state.loaded) {
      console.log("Loading Movie Screen...");
      return this.renderLoadingView();
    }
    console.log("Rendering Movie Screen...");
    return (
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.mainSection}>
          <Image
              source={{uri: this.props.movie.posters.thumbnail}}
              style={styles.thumbnail}
          />
          <View style={styles.rightPane}>
            <Text style={styles.movieTitle}>{this.props.movie.title}</Text>
            <Text>{this.props.movie.year}</Text>
            <View style={styles.mpaaWrapper}>
              <Text style={styles.mpaaText}>
                {this.props.movie.mpaa_rating}
              </Text>
            </View>
            <Rating ratings={this.props.movie.ratings} />
          </View>
        </View>
        <View style={styles.separator} />
        <Text>
          {this.props.movie.synopsis}
        </Text>
        <View style={styles.separator} />
        <Cast actors={this.props.movie.abridged_cast} />
      </ScrollView>
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
}

var Cast = React.createClass({
  render: function() {
    if (!this.props.actors) {
      return null;
    }

    return (
      <View>
        <Text style={styles.castTitle}>Actors</Text>
        {this.props.actors.map(actor =>
          <Text key={actor.name} style={styles.castActor}>
            &bull; {actor.name}
          </Text>
        )}
      </View>
    );
  },
});

var Rating = React.createClass({
    render: function() {
      return (
        <View style={styles.movieRatings}>
          <View style={styles.criticsRating}>
            <Text style={styles.year}>Critics Rating: </Text>
            <StarRating
              disabled={true}
              maxStars={5}
              rating={(this.props.ratings.critics_score*5)/100}
              starColor={'red'}
              starSize={25}
              selectedStar={(rating) => this.onStarRatingPress(rating)}
            />
          </View>
          <View style={styles.audienceRating}>
            <Text style={styles.year}>Audience Rating: </Text>
            <StarRating
              disabled={true}
              maxStars={5}
              rating={(this.props.ratings.audience_score*5)/100}
              starColor={'red'}
              starSize={25}
              selectedStar={(rating) => this.onStarRatingPress(rating)}
            />
          </View>
        </View>
      );
  },
});

module.exports = MovieScreen;
