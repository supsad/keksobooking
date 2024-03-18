import {EventMethod, page} from './index.js';
import {isEscEvent} from '/js/util.js';

const MAP_LAYERS_ZINDEX = 1000;

const successTemplate = document.querySelector('#success').content;
const success = successTemplate.querySelector('.success');

const updateModalEventListeners = (shouldAddEvent) => {
  const method = shouldAddEvent ? EventMethod.ADD : EventMethod.REMOVE;
  document[method]('click', hideSuccessModalHandler, {once: true});
  document[method]('keydown', hideSuccessModalHandler, {once: true});
};

const hideSuccessModal = (modal) => {
  modal.classList.add('visually-hidden');
  updateModalEventListeners(false);
};

const hideSuccessModalHandler = (evt) => {
  evt.preventDefault();

  const success = document.querySelector('#success-modal');
  switch (evt.type) {
    case 'click':
      if (page.contains(evt.target)) {
        hideSuccessModal(success);
      }
      break;

    case 'keydown':
      if (isEscEvent(evt)) {
        hideSuccessModal(success);
      }
      break;
  }
};

const successModalHandler = (modal) => {
  modal.classList.remove('visually-hidden');
  updateModalEventListeners(true, modal);
};

const getSuccessMessage = () => {
  const newSuccess = success.cloneNode(true);
  newSuccess.id = 'success-modal';

  // * More than map layers
  newSuccess.style.zIndex = String(MAP_LAYERS_ZINDEX + 1);

  return newSuccess;
};

const renderSuccessModal = (container) => {
  const successModal = getSuccessMessage();
  container.insertAdjacentElement('beforeend', successModal);
  successModalHandler(successModal);
};

export {renderSuccessModal};
