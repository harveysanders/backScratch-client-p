import {connect} from 'react-redux';
import NewUserModalView from './NewUserModalView';

export default connect(
  state => ({
    userName: state.getIn(['auth', 'currentUser', 'name']),
    userId: state.getIn(['user', 'value', 'userId']),
    user: state.getIn(['auth', 'currentUser']).toJS()
  })
)(NewUserModalView);
