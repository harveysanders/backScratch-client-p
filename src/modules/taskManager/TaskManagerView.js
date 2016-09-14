import React, {PropTypes} from 'react';
import _ from 'underscore';
import * as TaskManagerState from './TaskManagerState';
import * as NavigationState from '../../modules/navigation/NavigationState';
import {
  TouchableOpacity,
  Text,
  View,
  ListView,
  ActivityIndicator
} from 'react-native';
import ListItemWithIcon from '../../components/ListItemWithIcon';
import styles from '../../styles';

const TaskManagerView = React.createClass({
  propTypes: {
    assignedTasks: PropTypes.array,
    requestedTasks: PropTypes.array,
    userCoins: PropTypes.number,
    userId: PropTypes.number,
    loading: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired
  },
  getInitialState() {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      }),
      showAssignedTasks: true
    };
  },
  componentDidMount() {
    this.props.dispatch(TaskManagerState.assignedTasks(this.props.userId));
  },
  componentWillReceiveProps(nextProps) {
    const taskType = this.state.showAssignedTasks ? 'assignedTasks' : 'requestedTasks';
    if (nextProps[taskType] !== this.props[taskType]) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this._getListViewData(nextProps[taskType]))
      });
    }
  },
  _getListViewData(tasks) { // swap this out for halpers function later
    const dispatch = this.props.dispatch;
    if (!tasks.length) {
      return [];
    }
    return tasks.map((item) => _.extend(
      item.task.properties,
      {
        taskId: item.task._id, // taskId isn't included in properties
        dispatch
      }
    ));
  },
  showAssigned() {
    this.props.dispatch(TaskManagerState.assignedTasks(this.props.userId));
    this.setState({showAssignedTasks: true});
  },
  showRequested() {
    this.setState({showAssignedTasks: false});
    this.props.dispatch(TaskManagerState.requestedTasks(this.props.userId));
  },
  navToForm() {
    this.props.dispatch(NavigationState.pushRoute({
      key: 'NewTask',
      title: 'Create a new task'
    }));
  },
  renderLoadingView() {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size='large' color='#BDBDBD' style={styles.loadCircle}/>
        <Text style={styles.loadText}>Loading Tasks...</Text>
      </View>
    );
  },
  renderListView() {
    return (
      <View style={styles.container}>

        <TouchableOpacity onPress={this.navToForm} accessible={true} style={styles.button}>
          <Text style={styles.buttonText}>
            Create a task
          </Text>
        </TouchableOpacity>

        <Text style={styles.coinText}>
          Coins left: {this.props.userCoins}
        </Text>

        <View style={styles.detailSeperator} />

          <View style={styles.rowButtonSection}>
            <TouchableOpacity
              style={ this.state.showAssignedTasks
                ? styles.rowButtonSelected
                : styles.rowButton
              }
              onPress={this.showAssigned}
            >
              <Text style={styles.rowButtonText}>
                Assigned Tasks
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={ !this.state.showAssignedTasks
                ? styles.rowButtonSelected
                : styles.rowButton
              }
              onPress={this.showRequested}
            >
              <Text style={styles.rowButtonText}>
                Requested Tasks
              </Text>
            </TouchableOpacity>
          </View>

        <ListView
          dataSource={this.state.dataSource}
          renderRow={ListItemWithIcon}
        />

      </View>
    );
  },
  render() {
    return this.props.loading
      ? this.renderLoadingView()
      : this.renderListView();
  }
});

export default TaskManagerView;
