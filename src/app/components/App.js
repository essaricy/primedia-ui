import React from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import { Provider } from 'react-redux';

import Home from './Home';
import Header from '../../menu/components/Header';
import SearchContainer from '../../search/components/Search';
import Upload from '../../upload/components/Upload';

import history from '../config/history'
import store from '../config/store'

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter history={history}>
        <Header />
        <Route exact path="/" component={Home} />
        <Route path="/search" component={SearchContainer} />
        <Route path="/upload" component={Upload} />
      </BrowserRouter>
    </Provider>
  );
}
