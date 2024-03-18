import {disabledAttrHandler} from '/js/util.js';

const Mode = {
  INACTIVE: 'inactive',
  ACTIVE: 'active',
};

const ClassMethod = {
  ADD: 'add',
  REMOVE: 'remove',
};

const toggleClass = (mode, elements, classAttribute) => {
  const method = (mode === Mode.ACTIVE) ? ClassMethod.REMOVE : ClassMethod.ADD;
  elements.forEach((element) => element.classList[method](classAttribute));
};

const getInteractiveElements = (forms) => {
  return forms.reduce((acc, form) => {
    const fieldsets = Array.from(form.querySelectorAll('fieldset'));
    const selects = Array.from(form.querySelectorAll('form > select'));

    return acc.concat(fieldsets, selects);
  }, []);
};

const toggleInteractiveElements = (mode, forms) => {
  const state = mode === Mode.INACTIVE;
  const interactiveElements = getInteractiveElements(forms);
  disabledAttrHandler(state, interactiveElements);
};

export {Mode, toggleClass, toggleInteractiveElements};
