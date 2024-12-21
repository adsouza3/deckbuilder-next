export const OPEN_CONTEXT_MENU = 'OPEN_CONTEXT_MENU';
export const openContextMenu = (stackId, card, x, y) => {
  return {
    type: OPEN_CONTEXT_MENU,
    stackId,
    card,
    x,
    y
  };
};

export const CLOSE_CONTEXT_MENU = 'CLOSE_CONTEXT_MENU';
export const closeContextMenu = () => {
  return {
    type: CLOSE_CONTEXT_MENU
  };
};