import React, {PropTypes} from 'react';
import _ from 'underscore';
import {
  View,
  TouchableOpacity,
  Text,
  Modal
} from 'react-native';
import {
  Form,
  Separator,
  InputField,
  PickerField
} from 'react-native-form-generator';
import styles from '../../../styles';

const RatingFormModal = React.createClass({
  propTypes: {
    userId: PropTypes.number,
    dispatch: PropTypes.func.isRequired
  },
  getInitialState() {
    return {
      modalVisible: true
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
  },
  submitTask() {

    let isFormValid = this.refs.taskForm.values.taskName &&
           this.refs.taskForm.values.desc &&
           this.refs.taskForm.values.type &&
           this.refs.taskForm.values.difficulty &&
           this.refs.taskForm.values.address;

    if (isFormValid) {
      let formData = this.refs.taskForm.values;
      formData = _.extend(formData, {
        deadlineDate: this.state.deadlineDate,
        userID: this.props.userId
      });
      // this.props.dispatch(TaskFormState.post(formData));
      // this.props.dispatch(NavigationStateActions.switchTab(1));
    }
  },
  render() {
    return (
      <View>
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {console.log('Modal has been closed.');}}
          >
         <View>
          <View style={styles.formContainer}>
            <Text style={styles.formTextTitle}>Task Name</Text>
            <Text style={styles.formTextSubTitle}>Completed!</Text>

            <View style={styles.detailSeperator} />

            <Form ref='taskForm'
              onFocus={this.handleFormFocus}
            >
              <PickerField
                ref='rating'
                label='User Rating'
                options={{
                  '': '',
                  1: '1',
                  2: '2',
                  3: '3',
                  4: '4',
                  5: '5'
                }}
                helpText='Rate the other user. 5 being the best!'
              />
              <Separator />
              <InputField
                multiline={true}
                ref='comments'
                placeholder='Comments'
                helpText={'Include comments about your experience with the other user. We will save these comments for quality assurance purposes.'}
              />
            </Form>

            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                this.setModalVisible(!this.state.modalVisible);
              }}>
              <Text>Hide Modal</Text>
            </TouchableOpacity>

          </View>
         </View>
        </Modal>
      </View>
    );
  }
});

export default RatingFormModal;
