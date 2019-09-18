//import
import {API_URL, FB_APP_ID} from '../../constants';
import {AsyncStorage} from 'react-native';
import {Notification} from 'expo';
import * as Permissions from 'expo-permissions';

//Actions
const SAVE_TOKEN = 'SAVE_TOKEN';
const LOGOUT = 'LOGOUT';
const SET_PROFILE = 'SET_PROFILE';
const SET_NOTIFICATIONS = 'SET_NOTIFICATIONS';

//Action creators
function saveToken(token){
  return {
    type: SAVE_TOKEN,
    token
  };
};

function logout(){
  return {
    type: LOGOUT
  };
};

function setProfile(profile){
  return {
    type: SET_PROFILE,
    profile
  };
};

function setNotifications(notifications){
  return {
    type: SET_NOTIFICATIONS,
    notifications
  };
};

//API Action
function loginAction(username, password){
  return async (dispatch) => {
    try{
      const url =`${API_URL}/rest-auth/login/`;

      const result = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username,
          password
        })
      });
      const resultJson = await result.json();
      console.log(resultJson);
      if(resultJson.user && resultJson.token){
        dispatch(saveToken(resultJson.token));
        dispatch(setProfile(resultJson.user));
        return 'success';
      }
      return resultJson;
    }catch(err){
      return err;
    }
  }
};

function logoutAction(){
  return (dispatch, getState) => {
    const {users: {token}} = getState();
    const url =`${API_URL}/rest-auth/logout/`;
    fetch(url, {
      method: "POST",
      headers: {
        "Authorization": `JWT ${token}`
      }
    })
    .then(response => {
      console.log(response);
      dispatch(logout());
    })
    .catch(err => console.log(err));
  }
}

//알림 필터링
function getNotifications(){
  return (dispatch, getState) => {
    const {users: {token}} = getState();
    fetch(`${API_URL}/notifications/`, {
      headers: {
        "Authorization": `JWT ${token}`
      }
    })
    .then(response => {
      if(response.status === 401){
        dispatch(logout());
      }else{
        return response.json();
      }
    })
    .then(json => dispatch(setNotifications(json)))
    .catch(err => console.log(err));
  }
}

/*
registerPushAction method로 처음 시작할 때 실행하여 django에서 push token을 보내서 저장 -> 해당 User instance의 token 속성에 저장
어떠한 action을 취했을 때 django에서 push token을 이용하여 push
#python requests 모듈을 사용 설치 필요, python json 모듈을 사용 기본적으로 포함되어 있음
#pip install requests
import requests
import json
url = "https://exp.host/--/api/v2/push/send"
data = {
  "to": creator.push_token,#받는 유저의 push token
  "sound": "default",
  "body": f'Somebody commented on your movies',
  "badge": 1
}
headers = {
  "Content-type": "application/json",
  "Accept": "application/json",
  "Accept-Encoding": "gzip, deflate"
}
response = requests.post(url, data=json.dumps(data), headers=headers)
print(response.json())#response.request, response.status_code, response.raise_for_status(), response.json(), response.url, response.text
*/
function registerPushAction(){
  return async (dispatch, getState) => {
    const {users: {token}} = getState();
    const {status: existingStatus} = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let final = existingStatus;

    if(existingStatus !== 'granted'){
      const {status} = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      final = status;
    }

    let pushToken = await Notifications.getExpoPushTokenAsync();
    console.log(pushToken);
    //API 구현해야됨
    const url =`${API_URL}/users/push/`
    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `JWT ${token}`
      },
      body: JSON.stringify({
        token: pushToken
      })
    });
  };
}

function passwordResetAction(email){
  return async (dispatch) => {
    const url = `${API_URL}/rest-auth/password/reset/`;
    try{
      const result = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email
          })
        });

      //const resultJson = await result.json();
      if(result.ok){
        return 'success';
      }else{
        return result.json();
      }
    }catch(err){
      return err;
    }
  }
}

//웹을 이용해서 구현
function passwordResetConfirmAction(new_password1, new_password2, uid, token){
  return async (dispatch) => {
    const url = `${API_URL}/rest-auth/password/reset/confirm/`;
    try{
      const result = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            new_password1,
            new_password2,
            uid,
            token
          })
        });
      //const resultJson = await result.json();
      if(result.ok){
        return 'success';
      }else{
        return result.json();
      }
    }catch(err){
      return err;
    }
  }
}

function createAccountAction(username, name, email, password1, password2, profile_image){
  return async (dispatch) => {
    const url = `${API_URL}/rest-auth/registration/`;
    //const url = checkEnvReturnUrl('/users/register/');
    /*
    for(var pair of data.entries()){
      console.log(pair[0]+', '+pair[1]);
    }
    */
    try{

      const fd = new FormData();

      fd.append("username", username);
      fd.append("name", name);
      fd.append("email", email);
      fd.append("password1", password1);
      fd.append("password2", password2);
      if(profile_image){
        if(typeof profile_image === 'object'){
          fd.append("profile_image", profile_image);
        }
      }

      const result = await fetch(url, {
          method: "POST",
          headers: {

          },
          body: fd
        });

      const resultJson = await result.json();
      console.log(resultJson);
      if(resultJson.token){
        dispatch(saveToken(resultJson.token));
        dispatch(setProfile(resultJson.user));
        return 'success';
      }
      return resultJson;
    }catch(err){
      return err;
    }
  }
}

function getProfileAction(){
  return async (dispatch, getState) => {
    const {users:{token}} = getState();
    const url = `${API_URL}/rest-auth/user/`;
    try{
      const result = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `JWT ${token}`
          }
        });

      if(result.status === 401){
        dispatch(logout());
      }

      const resultJson = await result.json();
      console.log(resultJson);
      if(resultJson.username){
        dispatch(setProfile(resultJson));
        return 'success';
      }
      return resultJson;
    }catch(err){
      return err;
    }

  }

}

function changeProfileAction(name, email, profile_image, delete_image){
  return async (dispatch, getState) => {
    const {users: {token}} = getState();
    const url = `${API_URL}/users/change/`;
    try{
        const fd = new FormData();
        fd.append("name", name);
        fd.append("email", email);
        if(delete_image === 'y'){
          fd.append("profile_image", "");
        }else if(profile_image){
          if(typeof profile_image === 'object'){
            fd.append("profile_image", profile_image);
          }

        }


        const result = await fetch(url, {
            method: "PUT",
            headers: {
              "Authorization": `JWT ${token}`
            },
            body: fd
          });
        console.log(result);

        if(result.status === 401){
          dispatch(logout());
        }

        //const resultJson = await result.json();
        if(result.ok){
          return 'success';
        }else{
          return result.json();
        }

    }catch(err){
      return err;
    }

  }
}

function changePasswordAction(old_password, new_password1, new_password2){
  return async (dispatch, getState) => {
    const {users: {token}} = getState();
    const url = `${API_URL}/rest-auth/password/change/`;

    try{
      const result = await fetch(url, {
        method: "POST",
        headers: {
          "Authorization": `JWT ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          old_password,
          new_password1,
          new_password2
        })
      });

      if(result.status === 401){
        dispatch(logout());
      }

      if(result.ok){
        return 'success';
      }
      return result.json();
    }catch(err){
      return err;
    }
  }
}

//initial state
const initialState = {
  isLogin: false,
  token: '',
  profile: null
};

function reducer(state=initialState, action){
  switch(action.type){
    case SAVE_TOKEN:
      return applySetToken(state, action);
    case SET_PROFILE:
      return applySetProfile(state, action);
    case LOGOUT:
      return applyLogout(state, action);
    case SET_NOTIFICATIONS:
      return applySetNotifications(state, action);
    default:
      return state;
  }
}

//Reducer Functions
function applySetToken(state, action){
  const {token} = action;
  return {
    ...state,
    isLogin: true,
    token: token
  };
};

function applyLogout(state, action){
  AsyncStorage.clear();
  return {
    ...state,
    isLogin: false,
    profile: null,
    token: ''
  };
};

function applySetProfile(state, action){
  const {profile} = action;
  return {
    ...state,
    profile: profile
  };
};

function applySetNotifications(state, action){
  const {notifications} = action;
  return {
    ...state,
    notifications
  };
};

//Exports
const actionCreators = {
  loginAction,
  logoutAction,
  logout,
  registerPushAction,
  getNotifications,
  passwordResetAction,
  passwordResetConfirmAction,
  createAccountAction,
  getProfileAction,
  changeProfileAction,
  changePasswordAction,
};

export {actionCreators};
export default reducer;
