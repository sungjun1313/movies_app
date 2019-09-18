import { applyMiddleware, createStore } from "redux";
import { persistStore, persistCombineReducers } from "redux-persist";
//import storage from "redux-persist/lib/storage";
import {AsyncStorage} from 'react-native';
import thunk from "redux-thunk";
import users from "./modules/users";
import movies from "./modules/movies";

const middlewares = [thunk];

/*
//redux-persist V5
const persistConfig = {
  key: "root",//root
  storage
};
*/

//redux-persist V6
//yarn add @react-native-community/async-storage
const persistConfig = {
  key: "root",
  storage: AsyncStorage
}

const reducer = persistCombineReducers(persistConfig, {
  users,
  movies
});

const configureStore = () => {
  let store = createStore(reducer, applyMiddleware(...middlewares));
  let persistor = persistStore(store);
  return { store, persistor };
};

export default configureStore;
