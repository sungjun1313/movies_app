import {connect} from 'react-redux';
import AppContainer from './presenter';

const mapStateToProps = (state, ownProps) => {
  const {users: {isLogin}} = state;
  return {
    isLogin
  };
};

export default connect(mapStateToProps)(AppContainer);
