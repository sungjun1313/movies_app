import {connect} from 'react-redux';
import {actionCreators as userActions} from '../../redux/modules/users';
import Container from './container';

const mapStateToProps = (state, onwProps) => {
  const {users: {profile}} = state;
  return {
    profile
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    changeProfileAction: async (name, email, profile_image, delete_image) =>{
      return await dispatch(userActions.changeProfileAction(name, email, profile_image, delete_image));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Container);
