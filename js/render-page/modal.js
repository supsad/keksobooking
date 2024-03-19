import {EventMethod, page} from './index.js';
import {isEscEvent} from '/js/util.js';
import {MAP_LAYERS_ZINDEX} from '/js/map/index.js';

const successTemplate = document.querySelector('#success').content;
const success = successTemplate.querySelector('.success');

const updateModalEventListeners = (shouldAddEvent) => {
  const method = shouldAddEvent ? EventMethod.ADD : EventMethod.REMOVE;
  document[method]('click', onCloseSuccessModal, {once: true});
  document[method]('keydown', onCloseSuccessModal, {once: true});
};

const hideModal = (modal) => {
  modal.classList.add('visually-hidden');
  updateModalEventListeners(false);
};

const onCloseSuccessModal = (evt) => {
  evt.preventDefault();

  const success = document.querySelector('#success-modal');
  switch (evt.type) {
    case 'click':
      if (page.contains(evt.target)) {
        hideModal(success);
      }
      break;

    case 'keydown':
      if (isEscEvent(evt)) {
        hideModal(success);
      }
      break;
  }
};

const modalHandler = (modal) => {
  modal.classList.remove('visually-hidden');
  updateModalEventListeners(true, modal);
};

const getModalMessage = (modal, id) => {
  const newSuccess = modal.cloneNode(true);
  newSuccess.id = id;

  // * More than map layers
  newSuccess.style.zIndex = String(MAP_LAYERS_ZINDEX + 1);

  return newSuccess;
};

const renderSuccessModal = (container) => {
  const successModal = getModalMessage(success, 'success-modal');
  container.insertAdjacentElement('beforeend', successModal);
  modalHandler(successModal);
};

export {renderSuccessModal};
