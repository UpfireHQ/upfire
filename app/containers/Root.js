// @flow
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import Routes from '../Routes';
import LanguageProvider from './LanguageProvider';
import { translationMessages } from '../translations/i18n';

import 'amcharts3/amcharts/amcharts';
import 'amcharts3/amcharts/gauge';
import 'amcharts3/amcharts/serial';
import 'amcharts3/amcharts/pie';
import 'amcharts3/amcharts/themes/black';

export default class Root extends Component {
  render() {
    const {store, history} = this.props;
    return (
      <Provider store={store}>
        <LanguageProvider messages={translationMessages}>
          <ConnectedRouter history={history}>
            <Routes/>
          </ConnectedRouter>
        </LanguageProvider>
      </Provider>
    );
  }
}
