export const ACTION_PREALOADED_APP = `[preload] Preloaded app`;
export const ACTION_SET_PAYMENT_ADDRESS = `[preload] Set payment address`;
export const ACTION_SET_PUBLIC_KEY = `[preload] Set public key`;
export const ACTION_SET_DEVICE_ID = `[preload] Set device id`;

export const actionPreloadedApp = () => ({
  type: ACTION_PREALOADED_APP,
});

export const actionSetPaymentAddress = (payload) => ({
  type: ACTION_SET_PAYMENT_ADDRESS,
  payload,
});

export const actionSetPublicKey = (payload) => ({
  type: ACTION_SET_PUBLIC_KEY,
  payload,
});

export const actionSetDeviceId = (payload) => ({
  type: ACTION_SET_DEVICE_ID,
  payload,
});

const initialState = {
  preloaded: false,
  paymentAddress: '',
  publicKey: '',
  deviceId: '',
};

const preloadedReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_SET_PAYMENT_ADDRESS: {
      return {
        ...state,
        paymentAddress: action.payload,
      };
    }
    case ACTION_SET_PUBLIC_KEY: {
      return {
        ...state,
        publicKey: action.payload,
      };
    }
    case ACTION_PREALOADED_APP: {
      return { ...state, preloaded: true };
    }
    case ACTION_SET_DEVICE_ID: {
      return { ...state, deviceId: action.payload };
    }
    default:
      return state;
  }
};

export default preloadedReducer;
