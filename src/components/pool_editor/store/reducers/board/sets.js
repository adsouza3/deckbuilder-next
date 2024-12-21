
import { FETCH_SETS } from '@/components/pool_editor/store/actions/sets';

export default (state = {}, action) => {
  switch (action.type) {
  case FETCH_SETS:
    return action.sets;
  default:
    return state;
  }
};
