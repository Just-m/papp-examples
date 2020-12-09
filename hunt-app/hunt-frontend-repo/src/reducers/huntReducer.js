import { huntSelector } from '@selector/hunt';
import { tokenSelector } from '@selector/login';
import { createTreasureScan } from '@services/treasureService';
import { preloadSelector } from '@selector/preload';
import ReactGA from 'react-ga';

const ACTION_SET_QRCODE = `[hunt] Set qrcode`;
const ACTION_CREATE_TREASURE_SCAN_FETCHING = `[hunt] Create treasure scan fetching`;
const ACTION_CREATE_TREASURE_SCAN_FETCHED = `[hunt] Create treasure scan fetched`;

export const actionSetQrCode = (payload) => ({
  type: ACTION_SET_QRCODE,
  payload,
});

export const actionCreateTreasureScanFetching = () => ({
  type: ACTION_CREATE_TREASURE_SCAN_FETCHING,
});

export const actionCreateTreasureScanFetched = (payload) => ({
  type: ACTION_CREATE_TREASURE_SCAN_FETCHED,
  payload,
});

export const actionCreateTreasureScan = (recaptchaToken) => async (
  dispatch,
  getState
) => {
  const state = getState();
  const preloadState = preloadSelector(state);
  const { deviceId } = preloadState;
  const { isFetching, qrcode } = huntSelector(state);
  const token = tokenSelector(state);
  let result = null;
  let statusIndex = 0;
  if (isFetching || !qrcode || !token || !recaptchaToken || !deviceId) {
    return;
  }
  try {
    await dispatch(actionCreateTreasureScanFetching());
    const huntTreasureItem = {
      treasureItemCode: qrcode,
      'g-recaptcha-response': recaptchaToken,
      deviceID: deviceId,
    };
    result = await createTreasureScan(token, huntTreasureItem, recaptchaToken);
    if (result.Data === '') {
      statusIndex = 4;
    } else {
      if (result.Data.indexHunted < result.Slot) {
        statusIndex = 1;
        ReactGA.event({
          category: 'QUEST',
          action: 'open_question', //// open_question scan_code // spin_wheel
        });
      }
      if (result.Data.indexHunted === result.Slot) {
        statusIndex = 2;
        ReactGA.event({
          category: 'QUEST',
          action: 'open_question', //// open_question scan_code // spin_wheel
        });
      }
    }
  } catch (error) {
    throw error;
  } finally {
    await dispatch(
      actionCreateTreasureScanFetched({
        data: result,
        winstatus: statusIndex,
      })
    );
  }
};

const initialState = {
  qrcode: '',
  data: {
    winstatus: 0,
    data: [],
  },
  isFetching: false,
  isFetched: false,
};

const huntReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_SET_QRCODE: {
      return {
        ...state,
        qrcode: action.payload,
      };
    }
    case ACTION_CREATE_TREASURE_SCAN_FETCHING: {
      return {
        ...state,
        isFetching: true,
      };
    }
    case ACTION_CREATE_TREASURE_SCAN_FETCHED: {
      return {
        ...state,
        isFetching: false,
        isFetched: true,
        data: {
          ...action.payload,
        },
      };
    }
    default:
      return state;
  }
};

export default huntReducer;
