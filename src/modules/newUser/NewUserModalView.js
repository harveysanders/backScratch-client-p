import React, {PropTypes} from 'react';
import {
  View,
  TouchableHighlight,
  Text,
  Image,
  Modal,
  ScrollView
} from 'react-native';
import {
  Form,
  InputField
} from 'react-native-form-generator';
import * as NavigationStateActions from '../navigation/NavigationState';
import * as UserStateActions from '../user/UserState';
import styles from '../../styles';
import colors from '../../styles/colors';

const NewUserModalView = React.createClass({
  propTypes: {
    userId: PropTypes.number,
    user: PropTypes.object,
    dispatch: PropTypes.func.isRequired
  },
  getInitialState() {
    return {
      modalVisible: false
    };
  },
  componentDidMount() {
    let isNewUser = !(this.props.userId >= 0);
    console.log('newuser?:', isNewUser);

    if (isNewUser) {
      this.setState({
        modalVisible: true
      });
    }
  },
  sumbitForm() {

    const newUser = {
      firstName: this.refs.signUpForm.values.firstName,
      lastName: this.refs.signUpForm.values.lastName,
      username: this.refs.signUpForm.values.username,
      bio: this.refs.signUpForm.values.bio,
      zip: this.refs.signUpForm.values.zip,
      email: this.props.user.email,
      profileImgSrc: this.props.user.picture
    };
    console.log(newUser);
    this.props.dispatch(UserStateActions.post(newUser));
  },
  setModalVisible(visible) {
    this.setState({modalVisible: visible});
    this.props.dispatch(NavigationStateActions.switchTab(1));
  },
  render() {
    return (
      <View style={styles.container}>
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {console.log('Modal has been closed.');}}
          >

          <Text style={styles.profileTitleText}>Set up your Profile</Text>

         <View>
            <Form ref='signUpForm' onFocus={this.handleFormFocus} style={{marginTop: 15}}>
              <InputField
                label='First Name'
                ref='firstName'
                placeholder='First Name'
              />
              <InputField
                label='Last Name'
                ref='lastName'
                placeholder='Last Name'
              />
              <InputField
                label='Username'
                ref='username'
                placeholder='What should we call you?'
              />
              <InputField
                label='Bio'
                multiline={true}
                ref='bio'
                placeholder='Tell us about yourself.'
              />
              <InputField
                label='Zip Code'
                ref='zip'
                placeholder='To find tasks near you'
              />
            </Form>

            <TouchableHighlight accessible={true} style={styles.button} onPress={() => {
              this.setModalVisible(!this.state.modalVisible);
              this.sumbitForm();
            }}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableHighlight>
         </View>
            <View style={{flex: 2, bottom: 0, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.primaryColor}}>
              <Image source={require('../../styles/icons/logo.png')}/>
              <Text style={styles.buttonText}>backScratch</Text>
            </View>
        </Modal>
      </View>
    );
  }
});

export default NewUserModalView;
