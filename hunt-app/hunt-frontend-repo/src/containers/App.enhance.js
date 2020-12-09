import React from 'react';
import ErrorBoundary from '@components/ErrorBoundary';
import { ENVS } from '@configs';
import SDK from 'papp-sdk';
import enUS from 'antd-mobile/lib/locale-provider/en_US';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import preloadSrc from '@assets/icons/preload.png';
import { loginUserAction } from '@actions/authenticationActions';
import { isPreloadedAppSelector, preloadSelector } from '@selector/preload';
import withLayout from '@components/Layout';
import {
  actionPreloadedApp,
  actionSetPaymentAddress,
  actionSetPublicKey,
  actionSetDeviceId,
} from '@reducers/preloadReducer';
import Modal from '@components/Modal';
import { tokenSelector } from '@selector';
import { createGlobalStyle } from 'styled-components';
import { FONT_SIZES, COLORS } from '@utils/styles';

const { SUPPORTED_TOKEN } = SDK;

const GlobalStyle = createGlobalStyle`
   * {
    font-size: 16px;
    line-height: 21px;
    font-weight: 100;
    font-family: 'SF-Pro-Display';
  }
  .text {
        font-size: ${FONT_SIZES.regular}px;
        line-height: ${FONT_SIZES.regular + 5}px;
        color: #000;
        font-family: 'SF-Pro-Display';
    }
  .regular-text{
      font-size: ${FONT_SIZES.regular}px;
      line-height: ${FONT_SIZES.regular + 5}px;
      font-weight: 100;
  }

  .medium-text{
      font-size: ${FONT_SIZES.medium}px;
      line-height: ${FONT_SIZES.medium + 5}px;
      font-weight: 200;
      color: ${COLORS.colorGreyBold};
  }

  .bold-text {
      font-size: ${FONT_SIZES.medium}px;
      line-height: ${FONT_SIZES.medium + 5}px;
      font-weight: 300;
      color: ${COLORS.black};
  }

  .ellipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 100%;
  }
  br {
    margin-bottom: 20px;
  }
`;

const Preload = React.memo((props) => {
  return (
    <div className='flex-container' {...props}>
      <div className='preload-container'>
        <img src={preloadSrc} alt='Hunt app' className='preload-img' />
      </div>
    </div>
  );
});

const enhance = (WrappedComp) => (props) => {
  const token = useSelector(tokenSelector);
  const dispatch = useDispatch();
  const [locale, setLocale] = React.useState('English');
  const [isCompatible, setCompatible] = React.useState(false);
  const preloadState = useSelector(preloadSelector);
  const { paymentAddress, deviceId, publicKey } = preloadState;
  const preloaded = useSelector(isPreloadedAppSelector);
  const languages = [
    {
      value: 'English',
      label: 'English',
      language: enUS,
    },
  ];

  const handlePreloadApp = async () => {
    try {
      const isCompatible = ENVS.isDev ? true : await SDK.checkSDKCompatible();
      const currentLocale = languages.find((item) => item.value === locale)
        .language;
      setCompatible(isCompatible);
      setLocale(currentLocale);
      if (isCompatible) {
        let tokenIds = [];
        Object.entries(SUPPORTED_TOKEN).map(([symbol, tokenId]) =>
          tokenIds.push(tokenId)
        );
        tokenIds.push(ENVS.REACT_APP_TOKEN_VOTE_ID);
        SDK.setListSupportTokenById(tokenIds);
        SDK.changePrivacyTokenById(ENVS.REACT_APP_TOKEN_VOTE_ID);
        SDK.onPaymentAddressChange((paymentAddress) => {
          if (paymentAddress) {
            dispatch(actionSetPaymentAddress(paymentAddress));
          }
        });
        SDK.onPublicKeyChange((publicKey) => {
          if (publicKey) {
            dispatch(actionSetPublicKey(publicKey));
          }
        });
        SDK.getDeviceId((deviceId) => {
          dispatch(actionSetDeviceId(deviceId));
        });
      }
    } catch (error) {
      console.log('error', error);
    } finally {
      dispatch(actionPreloadedApp());
    }
  };

  React.useEffect(() => {
    try {
      if (!!paymentAddress && !!deviceId) {
        const data = {
          Address: paymentAddress,
          Password: paymentAddress,
          Publickey: publicKey,
          // DeviceID: deviceId,
        };
        dispatch(loginUserAction(data));
      }
    } catch (error) {
      throw error;
    }
  }, [paymentAddress, deviceId, publicKey]);
  React.useEffect(() => {
    handlePreloadApp();
  }, []);

  if (!preloaded || !token) {
    return <Preload />;
  }
  return (
    <ErrorBoundary>
      <GlobalStyle />
      <WrappedComp
        {...{ ...props, currentLocale: locale, isCompatible, preloaded }}
      />
      <Modal />
    </ErrorBoundary>
  );
};

export default compose(withRouter, withLayout, enhance);
