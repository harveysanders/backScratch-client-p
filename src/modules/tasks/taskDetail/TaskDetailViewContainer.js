import {toJS} from 'immutable'; // eslint-disable-line no-unused-vars
import {connect} from 'react-redux';
import TaskDetailView from './TaskDetailView';

export default connect(
  state => ({
    task: state.getIn(['tasks', 'currentTask', 'value']).toJS(),
    loading: state.getIn(['tasks', 'currentTask', 'loading']),
    modalVisible: state.getIn(['ratingForm','ratingModalVisible']),
    userId: state.getIn(['user', 'value', 'userId']),
    userProfilePhoto: state.getIn(['auth', 'currentUser', 'picture'])
  })
)(TaskDetailView);
