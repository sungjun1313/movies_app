import {connect} from 'react-redux';
import {actionCreators as userActions} from '../../redux/modules/users';
import Container from './container';

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    passwordResetAction: async (email) => {
      return await dispatch(userActions.passwordResetAction(email));
    }
  };
};

export default connect(null, mapDispatchToProps)(Container);
