import {connect} from 'react-redux';
import {toJs} from 'immutable'; // eslint-disable-line no-unused-vars
import RatingFormView from './RatingFormView';

export default connect(
  state => ({
    userId: state.getIn(['user', 'value', 'userId'])
  })
)(RatingFormView);
