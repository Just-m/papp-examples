import { getAddress } from '@services/spinServices';
import { createSelector } from 'reselect';
import { tokenSelector } from '@selector/login';
import { getSpinBoard, spinTheWheel } from '@services/spinServices';
import { FEE_PRV_PER_TX } from './Spin.utils';
import { persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { preloadSelector } from '@selector/preload';

export const ACTION_FETCHING = '[spin] Fetching data';
export const ACTION_FETCHED = '[spin] Fetched data';
export const ACTION_START_SPIN = '[spin] Start spin';
export const ACTION_END_SPIN = '[spin] End spin';
export const ACTION_INIT_SPIN = '[spin] Init spin';
export const ACTION_SAVE_TX_TO_LOCAL = '[spin] Save tx to local';
export const ACTION_REMOVE_TX_FROM_LOCAL = '[spin] Remove tx from local';
export const ACTION_REMOVE_ALL_TX = '[spin] Remove all tx from local';
export const ACTION_SET_PENDING_TX = '[spin] Set pending tx';
export const ACTION_SET_DATA = '[spin] Set data tx';
export const ACTION_SET_ERROR = '[spin] Set error tx';
export const ACTION_CHANGE_TIMES_SPIN = '[spin] Changes times spin';
export const ACTION_SET_ERROR_SPIN_TIMES = '[spin] Set error spin times';
export const ACTION_CHANGE_REWARD = '[spin] Change reward';

const initialState = {
  isFetching: true,
  isFetched: false,
  address: '',
  feePRV: 0,
  board: {},
  times: 1,
  spinData: {
    fetching: false,
    finish: true,
    rewards: [],
    reward: -1,
    rewardName: '',
  },
  pendingTx: '',
  data: {},
  error: '',
  txs: [],
  errorSpinTimes: '',
};

export const spinSelector = createSelector(
  (state) => state.spin,
  (spin) => spin
);

export const txsSpinSelector = createSelector(
  spinSelector,
  preloadSelector,
  (spin, preload) => {
    const { paymentAddress, publicKey } = preload;
    const txs = spin?.txs || [];
    return (
      txs.filter(
        (tx) =>
          tx?.paymentAddress === paymentAddress && tx?.publicKey === publicKey
      ) || []
    );
  }
);

export const spinDataSelector = createSelector(
  spinSelector,
  (spin) => spin?.spinData || {}
);

export const totalSpinFeePRVSelector = createSelector(spinSelector, (spin) => {
  const feePRV = spin?.feePRV || FEE_PRV_PER_TX;
  const times = spin?.times || 1;
  const originalFee = feePRV * times;
  const formatFee = originalFee / 1e9;
  const formatedFee = String(formatFee);
  return formatedFee;
});

export const paymentInfosSelector = createSelector(spinSelector, (spin) => {
  const toAddress = spin?.address;
  const feePRV = spin?.feePRV || FEE_PRV_PER_TX;
  const totalFeePRV = feePRV * spin?.times;
  const nanoAmount = Number(spin?.times);
  const paymentInfos = [
    {
      paymentAddressStr: toAddress,
      amount: totalFeePRV,
    },
  ];
  return {
    nanoAmount,
    paymentInfos,
  };
});

export const actionSetPendingTx = (payload) => ({
  type: ACTION_SET_PENDING_TX,
  payload,
});

export const actionSetData = (payload) => ({
  type: ACTION_SET_DATA,
  payload,
});

export const actionSetError = (payload) => ({
  type: ACTION_SET_ERROR,
  payload,
});

export const actionInitSpin = () => ({
  type: ACTION_INIT_SPIN,
});

const actionFetching = () => ({
  type: ACTION_FETCHING,
});

const actionFetched = (payload) => ({
  type: ACTION_FETCHED,
  payload,
});

export const actionStartSpin = (payload) => ({
  type: ACTION_START_SPIN,
  payload,
});

export const actionEndSpin = (payload) => ({
  type: ACTION_END_SPIN,
  payload,
});

export const actionFetchSpinData = () => async (dispatch, getState) => {
  let address = '';
  let board = {};
  let feePRV = FEE_PRV_PER_TX;
  try {
    const state = getState();
    const token = tokenSelector(state);
    dispatch(actionFetching());
    const [_address, _board] = await Promise.all([
      await getAddress(token),
      await getSpinBoard(token),
    ]);
    address = _address?.Address;
    board = _board;
    feePRV = _address?.Fee || feePRV;
  } catch (error) {
    throw error;
  } finally {
    dispatch(actionFetched({ address, board, feePRV }));
  }
};

export const actionSpinSwheel = (tx) => async (dispatch, getState) => {
  let result = {
    data: {},
    messageError: '',
  };
  const state = getState();
  const token = tokenSelector(state);
  const spin = spinSelector(state).spinData;
  let messageError = '';
  if (spin.fetching) {
    return;
  }
  try {
    await dispatch(actionStartSpin({}));
    const dt = await spinTheWheel(token, tx);
    const rewards = dt?.Rewards || [];
    if (!rewards) {
      messageError = dt?.Message;
    }
    result = {
      rewards,
      messageError,
      dt,
    };
  } catch (error) {
    throw error;
  } finally {
    await dispatch(actionEndSpin(result));
  }
  return result;
};

export const actionSaveTxToLocal = (payload) => ({
  type: ACTION_SAVE_TX_TO_LOCAL,
  payload,
});

export const actionRemoveTxFromToLocal = (payload) => ({
  type: ACTION_REMOVE_TX_FROM_LOCAL,
  payload,
});

export const actionRemoveAllTxs = () => ({
  type: ACTION_REMOVE_ALL_TX,
});

export const actionChangeTimesSpin = (payload) => ({
  type: ACTION_CHANGE_TIMES_SPIN,
  payload,
});

export const actionSetErrorSpinTimes = (payload) => ({
  type: ACTION_SET_ERROR_SPIN_TIMES,
  payload,
});

export const actionChangeReward = (payload) => ({
  type: ACTION_CHANGE_REWARD,
  payload,
});

const spinReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_CHANGE_REWARD: {
      const { reward, rewardName } = action.payload;
      return {
        ...state,
        spinData: { ...state.spinData, reward, rewardName },
      };
    }
    case ACTION_SET_ERROR_SPIN_TIMES: {
      return {
        ...state,
        errorSpinTimes: action.payload,
      };
    }
    case ACTION_CHANGE_TIMES_SPIN: {
      return {
        ...state,
        times: action.payload,
        errorSpinTimes: '',
      };
    }
    case ACTION_FETCHING: {
      return {
        ...state,
        isFetching: true,
      };
    }
    case ACTION_FETCHED: {
      return {
        ...state,
        isFetching: false,
        isFetched: true,
        ...action.payload,
      };
    }
    case ACTION_START_SPIN: {
      return {
        ...state,
        spinData: {
          ...state.spinData,
          finish: false,
          fetching: true,
        },
      };
    }
    case ACTION_END_SPIN: {
      const { rewards, dt } = action.payload;
      const data = state.data;
      const pendingTx = state.pendingTx;
      const _tx = data[pendingTx]?.tx;
      return {
        ...state,
        spinData: {
          ...state.spinData,
          rewards,
          finish: true,
          fetching: false,
        },
        txs: state.txs.filter((tx) => tx?.txId !== _tx?.txId),
        dt,
      };
    }
    case ACTION_INIT_SPIN: {
      return {
        ...state,
        spinData: { ...initialState.spinData },
        pendingTx: initialState.pendingTx,
        error: initialState.error,
        data: initialState.data,
        times: 1,
        errorSpinTimes: '',
      };
    }
    case ACTION_SAVE_TX_TO_LOCAL: {
      const tx = action.payload;
      return {
        ...state,
        txs: [...state.txs, tx],
      };
    }
    case ACTION_REMOVE_TX_FROM_LOCAL: {
      const { txId } = action.payload;
      const oldTxs = state.txs;
      const txs = oldTxs.filter((tx) => tx?.txId !== txId);
      return {
        ...state,
        txs: [...txs],
      };
    }
    case ACTION_REMOVE_ALL_TX: {
      return {
        ...state,
        txs: [],
      };
    }
    case ACTION_SET_PENDING_TX: {
      return {
        ...state,
        pendingTx: action.payload,
      };
    }
    case ACTION_SET_DATA: {
      return {
        ...state,
        data: action.payload,
      };
    }
    case ACTION_SET_ERROR: {
      return {
        ...state,
        error: action.payload,
      };
    }
    default:
      return state;
  }
};

const persistConfig = {
  key: 'spin',
  storage,
  whitelist: ['txs'],
  stateReconciler: autoMergeLevel2,
};

export default persistReducer(persistConfig, spinReducer);
