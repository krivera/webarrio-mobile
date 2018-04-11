import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import thunk from 'redux-thunk';
import createSecureStore from "redux-persist-expo-securestore";

import reducers from './reducers';
import hardSet from 'redux-persist/es/stateReconciler/hardSet';

const storage = createSecureStore();
const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: hardSet
}

export default () => {
  const persistedReducer = persistReducer(persistConfig, reducers);
  const store = createStore(
    persistedReducer,
    undefined,
    applyMiddleware(thunk)
  );

  const persistor = persistStore(store);

  return { store, persistor };
}
