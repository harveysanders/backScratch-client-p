import React, {PropTypes} from 'react';
import _ from 'underscore';
import {
  View,
  TouchableOpacity,
  Text
} from 'react-native';
import {
  Form,
  Separator,
  InputField,
  PickerField
} from 'react-native-form-generator';
import styles from '../../../styles';
import * as RatingFormStateActions from './RatingFormState';
import * as NavigationStateActions from '../../navigation/NavigationState';

const RatingFormView = React.createClass({
  propTypes: {
    userId: PropTypes.number.isRequired,
    taskId: PropTypes.number.isRequired,
    userIsRequestor: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired
  },
  submitTask() {
    let isFormValid = true; // fix this!!

    // let isFormValid = this.refs.taskForm.values.taskName &&
    //        this.refs.taskForm.values.desc &&
    //        this.refs.taskForm.values.type &&
    //        this.refs.taskForm.values.difficulty &&
    //        this.refs.taskForm.values.address;

    if (isFormValid) {
      let formData = this.refs.taskForm.values;
      formData = _.extend(formData, {
        Id: this.props.userId
      });
      console.log(formData);
      this.props.dispatch(RatingFormStateActions.setModalVisible(false));
      this.props.dispatch(RatingFormStateActions.rateTask(
        this.props.taskId,
        formData,
        this.props.userIsRequestor
      ));
      this.props.dispatch(NavigationStateActions.switchTab(1));
    }
  },
  render() {
    return (
      <View style={styles.formContainer}>
        <Text style={styles.formTextTitle}>Task Completed!</Text>
        <Text style={styles.formTextSubTitle}>Please fill out the rating form</Text>

        <View style={styles.detailSeperator} />

        <Form ref='taskForm'
          onFocus={this.handleFormFocus}
        >
          <PickerField
            ref='Rating'
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
            ref='Comment'
            placeholder='Comments'
            helpText={'Include comments about your experience with the other user. We will save these comments for quality assurance purposes.'}
          />
        </Form>

        <TouchableOpacity
          style={styles.button}
          onPress={this.submitTask}
        >
          <Text style={styles.buttonText}>
            Submit
          </Text>
        </TouchableOpacity>

      </View>
    );
  }
});

export default RatingFormView;
