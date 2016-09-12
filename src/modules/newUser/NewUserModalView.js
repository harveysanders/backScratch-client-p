import React, {PropTypes} from 'react';
import {
  View,
  TouchableHighlight,
  Text,
  Modal
} from 'react-native';
import {
  Form,
  Separator,
  InputField,
  PickerField
} from 'react-native-form-generator';
import * as NavigationStateActions from '../navigation/NavigationState';
import styles from '../../styles';

const NewUserModalView = React.createClass({
  propTypes: {
    userId: PropTypes.number,
    user: PropTypes.object
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
  setModalVisible(visible) {
    this.setState({modalVisible: visible});
    this.props.dispatch(NavigationStateActions.switchTab(1));
  },
  render() {
    return (
      <View style={{marginTop: 22}}>
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {console.log('Modal has been closed.')}}
          >
         <View style={{marginTop: 22}}>
          <View>
            <Form ref='SignUpForm' onFocus={this.handleFormFocus} >
              <Text>{this.props.user.name}</Text>
              
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
            }}>
              <Text style={styles.linkButton}>Sign Up</Text>
            </TouchableHighlight>

          </View>
         </View>
        </Modal>
      </View>
    );
  }
});

export default NewUserModalView;
