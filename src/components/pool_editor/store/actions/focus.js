export const FOCUS_CARD = 'FOCUS_CARD';
export const focusCard = card => (dispatch, getState) => {
  if (!getState().present.focus) {
    dispatch({
      type: FOCUS_CARD,
      card
    });
  }
};

export const CLEAR_FOCUSED_CARD = 'CLEAR_FOCUSED_CARD';
export const clearFocusedCard = () => (dispatch, getState) => {
  if (getState().present.focus) {
    dispatch({
      type: CLEAR_FOCUSED_CARD
    });
  }
};