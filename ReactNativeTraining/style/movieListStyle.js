module.exports = require('react-native').StyleSheet.create(
{
  loading: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  moviePoster: {
    paddingRight: 5,
  },
  movieRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    paddingBottom: 5,
    paddingTop: 5,
  },
  movieDetails: {
    flex: 1,
    paddingRight: 10,
  },
  movieRatings: {
    flex: 1,
    flexDirection: 'column',
    paddingRight: 40,
  },
  criticsRating: {
    flex: 1,
    flexDirection: 'row',
    paddingBottom: 5,
  },
  audienceRating: {
    flex: 1,
    flexDirection: 'row',
    paddingBottom: 5,
  },
  title: {
    fontSize: 15,
    marginBottom: 2,
    textAlign: 'left',
    fontWeight: 'bold',
  },
  year: {
    fontSize: 12,
    textAlign: 'left',
  },
  thumbnail: {
    width: 53,
    height: 81,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  listView: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF',
  },
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC',
    marginVertical: 10,
  },
});