import { SET_CARD_DEPENDENCIES } from '@/components/pool_editor/store/actions/board';

export default (state = {}, action) => {
  switch (action.type) {
  case SET_CARD_DEPENDENCIES:
    return action.cardDependencies;
  default:
    return state;
  }
};