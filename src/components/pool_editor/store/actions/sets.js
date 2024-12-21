import api from '@/lib/api';

export const FETCH_SETS = 'FETCH_SETS';
export const fetchSets = () => (dispatch, getState) => {
  const path = getState().present.editor.paths.sets;

  api.get(`${path}.json`).then((response) => {
    const sets = {};
    response.data.sets.forEach(set => sets[set.code] = set.name);
    dispatch({
      type: FETCH_SETS,
      sets
    });
  });
};