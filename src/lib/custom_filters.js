import { getQuickJS, getQuickJSSync, shouldInterruptAfterDeadline } from 'quickjs-emscripten';

const FUNC_NAME = 'foo';

let intialized = false;
export const initialize = async () => {
  await getQuickJS();
  intialized = true;
};

export const filterByCustom = (cards, func) => {
  if (!func || !intialized) {
    return cards;
  }

  const qjs = getQuickJSSync();
  const vm = qjs.createVm();
  const MAX_EXECUTION_TIME_MS = 500;
  vm.setInterruptHandler(shouldInterruptAfterDeadline(Date.now() + MAX_EXECUTION_TIME_MS));
  // vm.setMemoryLimit(1024 * 1024 /* BYTES */);

  const logHandle = vm.newFunction('log', (...args) => {
    args.forEach(x => console.log(vm.dump(x)));
  });
  const consoleHandle = vm.newObject();
  vm.setProp(consoleHandle, 'log', logHandle);
  vm.setProp(vm.global, 'console', consoleHandle);

  const callLine = card => `${FUNC_NAME}(${JSON.stringify(card)})`;

  let filteredCards = cards;
  try {
    const funcHandle = vm.unwrapResult(vm.evalCode(`const ${FUNC_NAME} = ${func};`));
    funcHandle.dispose();

    filteredCards = cards.filter((card) => {
      const resHandle = vm.unwrapResult(vm.evalCode(`${callLine(card)};`));
      const result = vm.dump(resHandle);
      resHandle.dispose();
      return result;
    });
  } catch (e) {
    filteredCards = cards;
  }

  consoleHandle.dispose();
  logHandle.dispose();
  vm.dispose();

  return filteredCards;
};