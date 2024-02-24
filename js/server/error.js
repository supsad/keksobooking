const ErrorBlock = {
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
  MESSAGE: 'Произошла ошибка! Загрузка данных для карты прервалась! Попробуйте перезагрузить страницу!',
  'DELETE_MESSAGE_TIMER': 15000, // * 15sec
};

const renderErrorMessage = (container) => {
  const errorWrapper = document.createElement('div');
  errorWrapper.className = ErrorBlock.CLASS_WRAPPER;
  errorWrapper.style.cssText = `
    position: ${ErrorBlock.WRAPPER_STYLE.position};
    top: ${ErrorBlock.WRAPPER_STYLE.top};
    left: ${ErrorBlock.WRAPPER_STYLE.left};
    z-index: ${ErrorBlock.WRAPPER_STYLE['z-index']};

    display: ${ErrorBlock.WRAPPER_STYLE.flex};
    justify-content: ${ErrorBlock.WRAPPER_STYLE['justify-content']};
    width: ${ErrorBlock.WRAPPER_STYLE.width};
    min-height: ${ErrorBlock.WRAPPER_STYLE['min-height']};
    padding: ${ErrorBlock.WRAPPER_STYLE.padding};
    text-align: ${ErrorBlock.WRAPPER_STYLE['text-align']};

    font-family: ${ErrorBlock.WRAPPER_STYLE['font-family']};
    font-size: ${ErrorBlock.WRAPPER_STYLE['font-size']};
    line-height: ${ErrorBlock.WRAPPER_STYLE['line-height']};
    font-weight: ${ErrorBlock.WRAPPER_STYLE['font-weight']};
    color: ${ErrorBlock.WRAPPER_STYLE.color};

    background-color: ${ErrorBlock.WRAPPER_STYLE['background-color']};
  `;

  const errorMessage = document.createElement('p');
  errorMessage.className = ErrorBlock.CLASS_MESSAGE;
  errorMessage.textContent = ErrorBlock.MESSAGE;

  errorWrapper.appendChild(errorMessage);
  container.insertAdjacentElement('beforebegin', errorWrapper);

  errorMessage.focus();

  setTimeout(() => {
    container.parentElement.removeChild(errorWrapper);
  }, ErrorBlock.DELETE_MESSAGE_TIMER);
}

export {renderErrorMessage}
