import {connect} from 'react-redux';
import {toJs} from 'immutable'; // eslint-disable-line no-unused-vars
import TaskManagerView from './TaskManagerView';

export default connect(
  state => ({
    loading: state.getIn(['taskManager', 'loading']),
    userId: state.getIn(['user', 'value', 'userId']),
    userCoins: state.getIn(['user', 'value', 'coins']),
    assignedTasks: state.getIn(['taskManager', 'assignedTasks']),
    requestedTasks: state.getIn(['taskManager', 'requestedTasks'])
  })
)(TaskManagerView);
