import React from 'react';
import { LocaleProvider } from 'antd-mobile';
import { Route, Switch } from 'react-router-dom';
import HuntApp from '@routes/map';
import History from '@routes/history';
import Spin from '@routes/spin';
import ScanQR from '@routes/scan';
import Header from './Header';
import withApp from './App.enhance';
import { Info, ClaimNode, ClaimVPN } from '@routes/spin/Spin';

const App = (props) => {
  const { currentLocale, isCompatible } = props;
  return (
    <LocaleProvider locale={currentLocale}>
      {isCompatible ? (
        <div className='flex-container'>
          <Header />
          <Switch>
            <Route path='/' exact={true} component={HuntApp} title='Map' />
            <Route path='/scan' exact={true} component={ScanQR} title='Scan' />
            <Route path='/spin' exact={true} component={Spin} title='Spin' />
            <Route path='/history' component={History} title='History' />
            <Route path='/spin/info' component={Info} title='Info Spin' />
            <Route
              path='/spin/claim-node'
              component={ClaimNode}
              title='Claim Node'
            />
            <Route
              path='/spin/claim-vpn'
              component={ClaimVPN}
              title='Claim VPN'
            />
          </Switch>
        </div>
      ) : (
        <div className='flex-container'>
          <h2 className='h2-body' style={{ textAlign: 'center' }}>
            This Hunt App work only in Incognito App.
          </h2>
        </div>
      )}
    </LocaleProvider>
  );
};

export default withApp(App);
