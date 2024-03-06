const ErrorBlockTemplate = {
  'CLASS_WRAPPER': 'api-error-container',
  'WRAPPER_STYLE': {
    position: 'sticky',
    top: 0,
    left: 0,
    'z-index': 9999,
    display: 'flex',
    'justify-content': 'center',
    width: `${100}%`,
    'min-height': `${95}px`,
    padding: `${15}px ${30}px`,
    'text-align': 'center',
    'font-family': '"Roboto", "Arial", sans-serif',
    'font-size': `${30}px`,
    'line-height': `${30}px`,
    'font-weight': 700,
    color: 'black',
    'background-color': '#E52B50',
  },
  'CLASS_MESSAGE': 'api-error-message',
  'DELETE_MESSAGE_TIMER': 15000, // * 15sec
};

const getAlertStyles = (ErrorTemplate) => {
  return `
    position: ${ErrorTemplate.WRAPPER_STYLE.position};
    top: ${ErrorTemplate.WRAPPER_STYLE.top};
    left: ${ErrorTemplate.WRAPPER_STYLE.left};
    z-index: ${ErrorTemplate.WRAPPER_STYLE['z-index']};

    display: ${ErrorTemplate.WRAPPER_STYLE.flex};
    justify-content: ${ErrorTemplate.WRAPPER_STYLE['justify-content']};
    width: ${ErrorTemplate.WRAPPER_STYLE.width};
    min-height: ${ErrorTemplate.WRAPPER_STYLE['min-height']};
    padding: ${ErrorTemplate.WRAPPER_STYLE.padding};
    text-align: ${ErrorTemplate.WRAPPER_STYLE['text-align']};

    font-family: ${ErrorTemplate.WRAPPER_STYLE['font-family']};
    font-size: ${ErrorTemplate.WRAPPER_STYLE['font-size']};
    line-height: ${ErrorTemplate.WRAPPER_STYLE['line-height']};
    font-weight: ${ErrorTemplate.WRAPPER_STYLE['font-weight']};
    color: ${ErrorTemplate.WRAPPER_STYLE.color};

    background-color: ${ErrorTemplate.WRAPPER_STYLE['background-color']};
  `;
};

const renderErrorAlert = (message) => {
  const container = document.querySelector('body');

  const errorWrapper = document.createElement('div');
  errorWrapper.className = ErrorBlockTemplate.CLASS_WRAPPER;
  errorWrapper.style.cssText = getAlertStyles(ErrorBlockTemplate);

  const errorMessage = document.createElement('p');
  errorMessage.className = ErrorBlockTemplate.CLASS_MESSAGE;
  errorMessage.textContent = message;

  errorWrapper.appendChild(errorMessage);
  container.insertAdjacentElement('afterbegin', errorWrapper);

  errorMessage.focus();

  setTimeout(() => {
    container.parentElement.removeChild(errorWrapper);
  }, ErrorBlockTemplate.DELETE_MESSAGE_TIMER);
}

export {renderErrorAlert}
