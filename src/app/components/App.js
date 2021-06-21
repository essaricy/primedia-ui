import React from 'react';
import { BrowserRouter, Route } from "react-router-dom";

import Home from './Home';
import Header from '../../menu/components/Header';
import Search from '../../search/components/Search';
import Upload from '../../upload/components/Upload';

import history from '../config/history'

export default function App() {
  return (
    <React.Fragment>
      <BrowserRouter history={history}>
        <Header />
        <Route exact path="/" component={Home} />
        <Route path="/search" render={(props) => <Search {...props}/> } />
        <Route path="/upload" component={Upload} />
      </BrowserRouter>
    </React.Fragment>
  );
}
