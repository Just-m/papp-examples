import React from 'react';
import ErrorBoundary from '@components/ErrorBoundary';
import ReactGA from 'react-ga';
import anime from 'animejs/lib/anime.es.js';
import SDK from 'papp-sdk';
import { useDispatch, useSelector } from 'react-redux';
import { preloadSelector } from '@selector/preload';
import { compose } from 'recompose';
import $ from 'jquery';
import withPreloadSpin from './Spin.enhancePreload';
import {
  actionChangeReward,
  actionInitSpin,
  actionSaveTxToLocal,
  actionSetData,
  actionSetError,
  actionSetPendingTx,
  actionSpinSwheel,
  paymentInfosSelector,
  spinDataSelector,
  spinSelector,
} from './Spin.reducer';
import { delay, getDefaultFailRandd, getRadTurn } from './Spin.utils';

const enhance = (WrappedComp) => (props) => {
  const { publicKey, paymentAddress } = useSelector(preloadSelector);
  const spin = useSelector(spinSelector);
  const spinData = useSelector(spinDataSelector);
  const { nanoAmount, paymentInfos } = useSelector(paymentInfosSelector);
  const { pendingTx } = spin;
  const dispatch = useDispatch();
  const initData = () => {
    try {
      const defaultRandd = getDefaultFailRandd();
      $('#wheel').css({
        '-webkit-transform': `rotate(${defaultRandd}turn)`,
        '-moz-transform': `rotate(${defaultRandd}turn)`,
        '-ms-transform': `rotate(${defaultRandd}turn)`,
        '-o-transform': `rotate(${defaultRandd}turn)`,
        transform: `rotate(${defaultRandd}turn)`,
      });
      dispatch(actionInitSpin());
    } catch (error) {}
  };
  const startSpin = async () => {
    ReactGA.event({
      category: 'QUEST',
      action: 'spin_wheel', //// open_question scan_code // spin_wheel
    });
    if (!spinData?.finish) {
      return;
    }
    let pendingTxId;
    try {
      const toAddress = spin?.address;
      const errorSpinTimes = spin?.errorSpinTimes;
      if (!!errorSpinTimes) {
        return;
      }
      if (!toAddress) {
        throw new Error(`Can not get address!`);
      }
      pendingTxId = await SDK.requestSingleSendTx(
        toAddress,
        nanoAmount,
        publicKey,
        paymentInfos
      );
      if (pendingTxId) {
        await dispatch(actionSetPendingTx(pendingTxId));
      }
    } catch (error) {
      dispatch(actionSetError(error?.message || error));
    }
  };

  const handleRequestTxsChange = async (data, pendingTx) => {
    const dt = data[pendingTx];
    const wheel = $('#wheel');
    let error = '';
    try {
      if (dt?.error) {
        throw new Error(dt?.error);
      }
      if (!dt?.tx) {
        throw new Error(`Can not create tx with pending id ${pendingTx}`);
      }
      const tx = dt?.tx;
      wheel.css({
        '-webkit-animation': 'rotating 0.25s linear infinite',
        '-moz-animation': 'rotating 0.25s linear infinite',
        '-ms-animation': 'rotating 0.25s linear infinite',
        '-o-animation': 'rotating 0.25s linear infinite',
        animation: 'rotating 0.25s linear infinite',
      });
      const { rewards, messageError } = await dispatch(actionSpinSwheel(tx));
      if (!rewards) {
        throw new Error(messageError);
      }
      for (let i = 0; i < rewards.length; i++) {
        await delay(500);
        wheel.css({
          '-webkit-animation': 'rotating 1s ease-out',
          '-moz-animation': 'rotating 1s ease-out',
          '-ms-animation': 'rotating 1s ease-out',
          '-o-animation': 'rotating 1s ease-out',
          animation: 'rotating 1s ease-out',
        });
        const rewardItem = rewards[i];
        const randd = getRadTurn(rewardItem.reward);
        anime({
          targets: '#wheel',
          rotate: `${randd}turn`,
          duration: 1500,
          loop: false,
        });
        await dispatch(
          actionChangeReward({
            reward: rewardItem.reward,
            rewardName: getDefaultFailRandd(),
          })
        );
        await delay(3000);
        wheel.css({
          '-webkit-animation': 'rotating 0.25s linear infinite',
          '-moz-animation': 'rotating 0.25s linear infinite',
          '-ms-animation': 'rotating 0.25s linear infinite',
          '-o-animation': 'rotating 0.25s linear infinite',
          animation: 'rotating 0.25s linear infinite',
        });
      }
      await dispatch(actionInitSpin());
    } catch (e) {
      error = e?.message || JSON.stringify(e);
      await dispatch(actionSetError(error));
      await delay(1000);
    } finally {
      wheel.css({
        '-webkit-animation': '',
        animation: '',
        '-moz-transform': '',
        '-ms-transform': '',
        '-o-transform': '',
      });
    }
  };

  React.useEffect(() => {
    SDK.onRequestTxsChange(async (data) => {
      await dispatch(actionSetData(data));
      const dt = data[pendingTx];
      const tx = dt?.tx;
      if (!!tx) {
        const payload = {
          id: tx?.txId,
          txId: tx?.txId,
          createdAt: new Date().getTime(),
          reward: 0,
          status: 3,
          publicKey,
          paymentAddress,
          paymentInfos,
          nanoAmount,
        };
        await dispatch(actionSaveTxToLocal(payload));
      }
      await delay(500);
      handleRequestTxsChange(data, pendingTx);
    });
  }, [pendingTx]);
  React.useEffect(() => {
    initData();
  }, []);
  return (
    <ErrorBoundary>
      <WrappedComp
        {...{
          ...props,
          startSpin,
        }}
      />
    </ErrorBoundary>
  );
};

export default compose(withPreloadSpin, enhance);
