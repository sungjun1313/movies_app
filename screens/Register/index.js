import {connect} from 'react-redux';
import Container from './container';
import {actionCreators as userActions} from '../../redux/modules/users';

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    createAccountAction: async (username, name, email, password1, password2, profile_image) => {
      return await dispatch(userActions.createAccountAction(username, name, email, password1, password2, profile_image));
    }
  };
};

export default connect(null, mapDispatchToProps)(Container);
