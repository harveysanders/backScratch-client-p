import React, {PropTypes} from 'react';
import {
  View,
  TouchableHighlight,
  Text,
  Modal
} from 'react-native';
import {
  Form,
  InputField
} from 'react-native-form-generator';
import * as NavigationStateActions from '../navigation/NavigationState';
import * as UserStateActions from '../user/UserState';
import styles from '../../styles';

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
      email: this.props.user.email,
      profileImgSrc: this.props.user.picture,
      city: 'New Orleans', //this.refs.signUpForm.values.zip
      state: 'LA'
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
      <View style={{backgroundColor: '#FFFFFF'}}>
        <Modal
          style={{backgroundColor: '#FFFFFF'}}
          animationType={"slide"}
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {console.log('Modal has been closed.');}}
          >
         <View style={{marginTop: 22}}>
            <Form ref='signUpForm' onFocus={this.handleFormFocus} >
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
                multiline={true}
                ref='zip'
                placeholder='So we can find tasks near you.'
              />
            </Form>

            <TouchableHighlight accessible={true} style={styles.button} onPress={() => {
              this.setModalVisible(!this.state.modalVisible);
              this.sumbitForm();
            }}>
              <Text style={styles.linkButton}>Sign Up</Text>
            </TouchableHighlight>
         </View>
        </Modal>
      </View>
    );
  }
});

export default NewUserModalView;
