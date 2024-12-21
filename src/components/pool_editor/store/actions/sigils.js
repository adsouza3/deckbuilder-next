import api from '@/lib/api';
import { getCurrentState } from '@/lib/state_helper';

export const ADD_SIGILS = 'ADD_SIGILS';
export const addSigils = (faction, amount = 1) => (dispatch, getState) => {
  const { sigils } = getCurrentState(getState().present);
  const count = sigils[faction].count + amount;

  dispatch({
    type: ADD_SIGILS,
    faction,
    count,
    undoable: true
  });
};

export const SUB_SIGILS = 'SUB_SIGILS';
export const subSigils = (faction, amount = 1) => (dispatch, getState) => {
  const { sigils } = getCurrentState(getState().present);
  const count = sigils[faction].count - amount;

  if (count >= 0) {
    dispatch({
      type: SUB_SIGILS,
      faction,
      count,
      undoable: true
    });
  }
};