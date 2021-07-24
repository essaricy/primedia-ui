import { compose, applyMiddleware, createStore, combineReducers } from 'redux';
import thunk from "redux-thunk";

import headerReducer from '../../menu/reducers/HeaderReducer';
import dashboardReducer from '../../dashboard/reducers/DashboardReducer';
import searchReducer from '../../search/reducers/SearchReducer';
import watchReducer from '../../watch/reducers/WatchReducer';
import uploadReducer from '../../upload/reducers/UploadReducer';

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
    const serializedState = localStorage.getItem('state');
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
    localStorage.setItem('state', serializedState);
  } catch (e) {
    // Ignore write errors;
  }
};

const peristedState = loadState();
let store = createStore(
  combineReducers({
    header: headerReducer,
    dashboard: dashboardReducer,
    search: searchReducer,
    watch: watchReducer,
    upload: uploadReducer,
  }),
  peristedState,
  //{},
  applyEnhancers()
);

store.subscribe(() => {
  saveState(store.getState());
});
export default store;