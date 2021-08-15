import React from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import { Provider } from 'react-redux';

import HeaderContainer from '../../header/components/Header';
import DashboardContainer from '../../dashboard/components/Dashboard';
import SearchResultsContainer from '../../search/components/SearchResults';
import WatchContainer from '../../watch/components/Watch';
import UploadContainer from '../../upload/components/Upload';
import UploadHistoryContainer from '../../upload/components/UploadHistory';

import history from '../config/history';
import store from '../config/store';

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter history={history}>
        <HeaderContainer  />
        <Route exact path="/" component={DashboardContainer} />
        <Route path="/search" component={SearchResultsContainer} />
        <Route path="/watch" component={WatchContainer} />
        <Route path="/upload" component={UploadContainer} />
        <Route path="/upload-history" component={UploadHistoryContainer} />
      </BrowserRouter>
    </Provider>
  );
}
