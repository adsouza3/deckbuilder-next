import api from 'lib/api';
import { toast } from 'react-toastify';

export const savePool = (cards, poolName, googleId, built) => (dispatch, getState) => {
  const { present } = getState();
  const path = present.editor.paths.createPool;
  api.post(`${path}.json`, {
    primaryCards: cards,
    name: poolName,
    googleId,
    built
  }).then(() => {
    toast.success('Pool saved successfully.');
  }).catch(() => toast.error('Failed to save pool.'));
};

export const SET_POOLS = 'SET_POOLS';
export const setPools = (pools, googleId) => {
  return {
    type: SET_POOLS,
    googleId,
    pools
  };
};

export const getPools = (googleId, built) => (dispatch, getState) => {
  const { present } = getState();
  const path = present.editor.paths.getPools;
  api.get(`${path}.json`, {
    params: {
      googleId,
      built
    }
  }).then(({ data: { pools } }) => {
    dispatch(setPools(pools, googleId));
  }).catch(() => toast.error('Failed to load pool'));
};
