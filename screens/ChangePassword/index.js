import {connect} from 'react-redux';
import {actionCreators as userActions} from '../../redux/modules/users';
import Container from './container';

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    changePasswordAction: async (old_password, new_password1, new_password2) => {
      return await dispatch(userActions.changePasswordAction(old_password, new_password1, new_password2));
    }
  };
};

export default connect(null, mapDispatchToProps)(Container);
