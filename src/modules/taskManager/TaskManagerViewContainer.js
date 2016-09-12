import {connect} from 'react-redux';
import {toJs} from 'immutable'; // eslint-disable-line no-unused-vars
import TaskManagerView from './TaskManagerView';

export default connect(
  state => ({
    loading: state.getIn(['taskManager', 'loading']),
    user: state.getIn(['user', 'value']).toJS(),
    assignedTasks: state.getIn(['taskManager', 'assignedTasks'])
  })
)(TaskManagerView);
