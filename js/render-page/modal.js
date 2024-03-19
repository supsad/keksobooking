import {EventMethod, page} from './index.js';
import {isEscEvent} from '/js/util.js';
import {MAP_LAYERS_ZINDEX} from '/js/map/index.js';

/*
! I tried to write utility functions to update listeners,
! but it failed every time because new functions were returned to the listeners,
! which prevented them from being removed from the DOM.
! if, switch, class, separate functions, callbacks,
! ES6 syntax for the listener to add additional arguments other than event -
! the constructions did not give the desired result.
! So I wrote everything LITERALLY
 */

const successTemplate = document.querySelector('#success').content;
const successBlock = successTemplate.querySelector('.success');
const errorTemplate = document.querySelector('#error').content;
const errorBlock = errorTemplate.querySelector('.error');

// * The listener hangs himself once, because there is no button inside, nothing that can interrupt his action
const setSuccessEventListeners = (method) => {
  document[method]('click', onCloseSuccessModal, {once: true});
  document[method]('keydown', onCloseSuccessModal, {once: true});
};

// ? The parameter is finally removed, because when you click on the reload button, the listener is reset
const setErrorEventListeners = (method) => {
  document[method]('click', onCloseErrorModal);
  document[method]('keydown', onCloseErrorModal, {once: true});
};

const hideSuccessModal = (modal) => {
  modal.classList.add('visually-hidden');
  setSuccessEventListeners(EventMethod.REMOVE);
};

const onCloseSuccessModal = (evt) => {
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

const hideErrorModal = (modal) => {
  modal.classList.add('visually-hidden');
  setErrorEventListeners(EventMethod.REMOVE);
};

const onCloseErrorModal = (evt) => {
  evt.preventDefault();

  const error = document.querySelector('#error-modal');
  const errorReloadPageButton = error.querySelector('.error__button');
  switch (evt.type) {
    case 'click':
      if (page.contains(evt.target) && evt.target !== errorReloadPageButton) {
        hideErrorModal(error);
      }
      break;

    case 'keydown':
      if (isEscEvent(evt)) {
        hideErrorModal(error);
      }
      break;
  }
};

const modalHandler = (modal, modalType, shouldAddEvent) => {
  const method = shouldAddEvent ? EventMethod.ADD : EventMethod.REMOVE;

  modal.classList.remove('visually-hidden');
  modalType === 'success'
    ? setSuccessEventListeners(method)
    : setErrorEventListeners(method)
      ;
};

const getModalMessage = (modalBlock, id) => {
  const newModal = modalBlock.cloneNode(true);
  newModal.id = id;

  // * More than map layers
  newModal.style.zIndex = String(MAP_LAYERS_ZINDEX + 1);

  return newModal;
};

const renderSuccessModal = (container) => {
  const successModal = getModalMessage(successBlock, 'success-modal');
  container.insertAdjacentElement('beforeend', successModal);
  modalHandler(successModal, 'success', true);
};

const renderErrorModal = (container) => {
  const errorModal = getModalMessage(errorBlock, 'error-modal');
  container.insertAdjacentElement('beforeend', errorModal);
  modalHandler(errorModal, 'error', true);
};

export {renderSuccessModal, renderErrorModal};
