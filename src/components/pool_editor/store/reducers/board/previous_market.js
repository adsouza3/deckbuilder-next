
import { GET_CARDS_FROM_EXPORT } from '@/components/pool_editor/store/actions/board';

export default (state = [], action) => {
  switch (action.type) {
  case GET_CARDS_FROM_EXPORT:
    return action.previousMarket;
  default:
    return state;
  }
};
