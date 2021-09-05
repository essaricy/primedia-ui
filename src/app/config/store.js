import { compose, applyMiddleware, createStore, combineReducers } from 'redux';
import thunk from "redux-thunk";

import activityReducer from '../../activity/reducers/ActivityReducer';
import dashboardReducer from '../../dashboard/reducers/DashboardReducer';
import headerReducer from '../../header/reducers/HeaderReducer';
import searchReducer from '../../search/reducers/SearchReducer';
import uploadReducer from '../../upload/reducers/UploadReducer';
import uploadHistoryReducer from '../../upload/reducers/UploadHistoryReducer';
import watchReducer from '../../watch/reducers/WatchReducer';

function applyEnhancers() {
  // Setup devtools only during staging
  const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

  let enhancers =
    devTools == null
      ? compose(applyMiddleware(thunk))
      : compose(applyMiddleware(thunk), devTools);
  return enhancers;
}

const loadState = () => {
  try {
    const serializedState = sessionStorage.getItem('state');
    if(serializedState === null) {
      return {};
    }
    return JSON.parse(serializedState);
  } catch (e) {
    return {};
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    sessionStorage.setItem('state', serializedState);
  } catch (e) {
    // Ignore write errors;
  }
};

const peristedState = loadState();
let store = createStore(
  combineReducers({
    activity: activityReducer,
    dashboard: dashboardReducer,
    header: headerReducer,
    search: searchReducer,
    upload: uploadReducer,
    uploadHistory: uploadHistoryReducer,
    watch: watchReducer,
  }),
  peristedState,
  applyEnhancers()
);
store.subscribe(() => saveState(store.getState()));

export default store;
