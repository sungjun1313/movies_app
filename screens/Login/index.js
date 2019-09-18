import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as userActions } from "../../redux/modules/users";

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    loginAction: async (username, password) => {
      return await dispatch(userActions.loginAction(username, password));
    },
  };
};

export default connect(null, mapDispatchToProps)(Container);
