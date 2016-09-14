import _ from 'underscore';
import Calendar from 'react-native-calendar';
import React, {PropTypes} from 'react';
import {
  ScrollView,
  TouchableOpacity,
  Text
} from 'react-native';
import {
  Form,
  Separator,
  InputField,
  PickerField
} from 'react-native-form-generator';
import * as NavigationStateActions from '../../navigation/NavigationState';
import * as TaskFormState from './TaskFormState';
import styles from '../../../styles';
import colors from '../../../styles/colors';

const TaskFormView = React.createClass({
  propTypes: {
    dispatch: PropTypes.func.isRequired,
    userId: PropTypes.number
  },

  getInitialState() {
    return {
      deadlineDate: ''
    };
  },

  handleFormFocus() {
    // phone keyboard pop up on focus
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
        requestorId: this.props.userId
      });
      this.props.dispatch(TaskFormState.post(formData));
      this.props.dispatch(NavigationStateActions.popRoute());
      this.props.dispatch(NavigationStateActions.switchTab(1));
    }
  },

  render() {

    return (
      <ScrollView style={{backgroundColor: colors.lightPrimaryColor}}>
        <Form ref='taskForm'
          onFocus={this.handleFormFocus}
          style={{marginTop: 30, backgroundColor: colors.lightPrimaryColor}}
        >
          <InputField
            ref='taskName'
            placeholder='Task Name'
            helpText='Give your task a short but informative name,  such as "Need help mowing my lawn."'
          />
          <InputField
            style={{color: colors.black}}
            multiline={true}
            ref='desc'
            placeholder='Task Description'
            helpText={'Add a short descripition of what the task will entail. Be straightforward so other users can see if they can help!'}
          />
          <PickerField
            ref='type'
            label='Task Category'
            options={{
              '': '',
              'Handyman': 'Handyman',
              'Errands': 'Errands',
              'Domestic': 'Domestic',
              'Physical Labor': 'Physical Labor',
              'Informative': 'Informative',
              'Miscellaneous': 'Miscellaneous'
            }}
            helpText='Pick the Category that your task best falls under.'
          />
          <PickerField
            ref='difficulty'
            label='Task Difficulty'
            options={{
              '': '',
              '1': '1',
              '2': '2',
              '3': '3'
            }}
            helpText='Gauge how difficult it will be to complete this task. The more difficult the task the more coins will be offered to the other user.'
          />
          <Separator />
          <InputField
            ref='address'
            multiline={true}
            placeholder='Task Address'
            helpText='Input the location of where the task will be completed.'
          />
          <Calendar
            ref='deadlineDate'
            scrollEnabled={true}
            dayHeadings={['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']}
            weekStart={0}
            customStyle={{currentDayCircle: {backgroundColor: '#536DFE'}}}
            onDateSelect={(date) => {this.setState({deadlineDate: date});}}
         />
        </Form>
        <TouchableOpacity onPress={this.submitTask} accessible={true} style={styles.button}>
          <Text style={styles.buttonText}>
            Create a task
          </Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
});

export default TaskFormView;
