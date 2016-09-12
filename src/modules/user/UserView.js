import * as UserState from './UserState';
// import * as NavigationState from '../../modules/navigation/NavigationState';
import React, {PropTypes} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  View,
  ScrollView
} from 'react-native';
import colors from '../../styles/colors';

const UserView = React.createClass({
  propTypes: {
    userName: PropTypes.string,
    userId: PropTypes.number,
    userProfilePhoto: PropTypes.string,
    coins: PropTypes.number,
    rating: PropTypes.number,
    completedTasks: PropTypes.array,
    assignedTasks: PropTypes.array,
    bio: PropTypes.string,
    // tasksCompleted: PropTypes.number,
    loading: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired
  },
  reset() {
    this.props.dispatch(UserState.reset());
  },
  renderUserInfo() {
    if (!this.props.userName) {
      return (
        <View>
          <Text style={styles.linkButton}>
            Please log in to see your profile.
          </Text>
        </View>
      );
    }

    return (
      <View style={styles.userContainer}>

        <View style={styles.userTitleContainer}>
          <Text style={styles.usernameText}>
            {this.props.userName}
          </Text>
          <Image
            style={styles.userProfilePhoto}
            source={{
              uri: this.props.userProfilePhoto,
              width: 80,
              height: 80
            }}
          />
        </View>

        <Text style={styles.ratingText}>Rating: {this.props.rating}</Text>

        <View style={styles.detailSeperator}/>

        <View style={styles.scoreContainer}>
          <Text style={styles.scoreText}>Coins: {this.props.coins}</Text>
          <Text style={styles.scoreText}>Completed Tasks: #</Text>
        </View>

        <Text>Bio: {this.props.bio}</Text>

        <Text style={styles.recentTaskText}>Recent Tasks</Text>

      </View>
    );
  },
  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={{backgroundColor: '#FFFFFF', flex: 1}}>
          <View style={styles.container}>
            {this.renderUserInfo()}

            <TouchableOpacity onPress={this.reset}>
              <Text style={styles.linkButton}>
                Button 1
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
});

const circle = {
  borderWidth: 0,
  borderRadius: 40,
  width: 80,
  height: 80
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFFFFF'
  },
  userTitleContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    margin: 15,
    padding: 15,
    backgroundColor: colors.primaryColor,
    shadowColor: colors.black,
    shadowOpacity: .5,
    shadowOffset: {height: 5}
  },
  scoreContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#FFFFFF'
  },
  scoreText: {
    fontSize: 20,
    margin: 10
  },
  formText: {
    fontSize: 30
  },
  userContainer: {
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF'
  },
  userProfilePhoto: {
    ...circle,
    alignSelf: 'center',
    marginLeft: 20
  },
  counterButton: {
    ...circle,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20
  },
  counter: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center'
  },
  welcome: {
    textAlign: 'center',
    color: 'black',
    marginBottom: 5,
    padding: 5
  },
  ratingText: {
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 10
  },
  recentTaskText: {
    textAlign: 'center',
    fontSize: 25,
    marginBottom: 10
  },
  usernameText: {
    textAlign: 'center',
    fontSize: 25,
    color: colors.white
  },
  detailSeperator: {
    width: 350,
    height: 1,
    backgroundColor: colors.divider
  }
});

export default UserView;
