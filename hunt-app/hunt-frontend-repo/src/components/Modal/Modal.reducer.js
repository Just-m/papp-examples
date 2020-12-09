import { createSelector } from 'reselect';

const initialState = {
  toggle: false,
  data: null,
};

export const ACTION_TOGGLE_MODAL = '[modal] Toggle modal';

export const actionToggleModal = (payload = { toggle: false, data: null }) => ({
  type: ACTION_TOGGLE_MODAL,
  payload,
});

export const modalSelector = createSelector(
  (state) => state.modal,
  (modal) => modal
);

export default (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TOGGLE_MODAL: {
      return {
        ...state,
        ...action.payload,
      };
    }
    default:
      return state;
  }
};
