import {Mode, toggleClass, toggleInteractiveElements} from './render-page.js';
import {
  capacitySelect,
  housePriceInput,
  houseSyncPrice,
  houseTypeSelect,
  onSync,
  onValidPrice,
  onValidTitle,
  roomNumberSelect,
  setPriceInputAttr,
  syncRoomsCapacityHandler,
  timeinSelect,
  timeoutSelect,
  titleInput
} from '/js/form/index.js';

const EventMethod = {
  ADD: 'addEventListener',
  REMOVE: 'removeEventListener',
};

const page = document.querySelector('body');
const updateFormsEventListeners = (shouldAddEvent, elements) => {
  const method = shouldAddEvent ? EventMethod.ADD : EventMethod.REMOVE;
  titleInput[method]('input', onValidTitle);
  housePriceInput[method]('input', onValidPrice);
  houseTypeSelect[method]('change', houseSyncPrice);
  elements.forEach(element => element[method]('change', onSync));
};

const setSyncForm = () => {
  setPriceInputAttr();
  houseSyncPrice();
  syncRoomsCapacityHandler(roomNumberSelect, capacitySelect);
};

const renderUI = (mode, forms) => {
  if (typeof forms === 'object') {
    forms = Array.from(forms);
  }

  if (mode === Mode.ACTIVE) {
    // * when switching to active mode, we also want to call sync functions
    setSyncForm();
  }

  updateFormsEventListeners(
    mode === Mode.ACTIVE,
    [timeinSelect, timeoutSelect, roomNumberSelect, capacitySelect],
  );
  toggleClass(mode, forms);
  toggleInteractiveElements(mode, forms);
};

export {page, EventMethod, renderUI, setSyncForm};
export {Mode} from './render-page.js';
export {renderData} from './data.js'
export {renderErrorAlert} from './error.js';
export {renderSuccessModal, renderErrorModal} from './modal.js';
