import {disabledAttrHandler} from '../util.js';
import {houseType, onSync, syncValue, timeinSelect, timeoutSelect} from '../form/index.js';

const Mode = {
  INACTIVE: 'inactive',
  ACTIVE: 'active',
};

const EventMethod = {
  ADD: 'addEventListener',
  REMOVE: 'removeEventListener',
};

const ClassMethod = {
  ADD: 'add',
  REMOVE: 'remove',
};

const updateEventListeners = (shouldAddEvent, elements) => {
  const method = shouldAddEvent ? EventMethod.ADD : EventMethod.REMOVE;
  houseType[method]('change', syncValue);
  elements.forEach(element => element[method]('change', onSync));
};

const toggleClass = (mode, forms) => {
  const method = (mode === Mode.ACTIVE) ? ClassMethod.REMOVE : ClassMethod.ADD;
  forms.forEach((form) => form.classList[method]('ad-form--disabled'));
};

const getInteractiveElements = (forms) => {
  return forms.reduce((acc, form) => {
    const fieldsets = Array.from(form.querySelectorAll('fieldset'));
    const selects = Array.from(form.querySelectorAll('select'));

    return acc.concat(fieldsets, selects);
  }, []);
};

const toggleInteractiveElements = (mode, forms) => {
  const state = mode === Mode.INACTIVE;
  const interactiveElements = getInteractiveElements(forms);
  disabledAttrHandler(state, interactiveElements);
};

const renderInteractiveElements = (mode, forms) => {
  updateEventListeners(
    mode === Mode.ACTIVE,
    [timeinSelect, timeoutSelect],
  );
  toggleClass(mode, forms);
  toggleInteractiveElements(mode, forms);

  if (mode === Mode.ACTIVE) {
    // * when switching to active mode, we also want to call syncValue
    syncValue();
  }
};

export {renderInteractiveElements};
