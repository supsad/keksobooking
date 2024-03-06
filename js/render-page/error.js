const ErrorWrapperTemplate = {
  CLASS: 'api-error-container',
  STYLES: {
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
};

const MESSAGE_CLASS = 'api-error-message';
const DELETE_MESSAGE_TIMER = 15000; // * 15sec

const getAlertStyles = (WrapperTemplate) => {
  return `
    position: ${WrapperTemplate.WRAPPER_STYLE.position};
    top: ${WrapperTemplate.WRAPPER_STYLE.top};
    left: ${WrapperTemplate.WRAPPER_STYLE.left};
    z-index: ${WrapperTemplate.WRAPPER_STYLE['z-index']};

    display: ${WrapperTemplate.WRAPPER_STYLE.flex};
    justify-content: ${WrapperTemplate.WRAPPER_STYLE['justify-content']};
    width: ${WrapperTemplate.WRAPPER_STYLE.width};
    min-height: ${WrapperTemplate.WRAPPER_STYLE['min-height']};
    padding: ${WrapperTemplate.WRAPPER_STYLE.padding};
    text-align: ${WrapperTemplate.WRAPPER_STYLE['text-align']};

    font-family: ${WrapperTemplate.WRAPPER_STYLE['font-family']};
    font-size: ${WrapperTemplate.WRAPPER_STYLE['font-size']};
    line-height: ${WrapperTemplate.WRAPPER_STYLE['line-height']};
    font-weight: ${WrapperTemplate.WRAPPER_STYLE['font-weight']};
    color: ${WrapperTemplate.WRAPPER_STYLE.color};

    background-color: ${WrapperTemplate.WRAPPER_STYLE['background-color']};
  `;
};

const getMessageWrapper = (template) => {
  const wrapper = document.createElement('div');
  wrapper.className = template.CLASS;
  wrapper.style.cssText = getAlertStyles(template);

  return wrapper;
}

const getMessage = (message, blockClass) => {
  const paragraph = document.createElement('p');
  paragraph.className = blockClass;
  paragraph.textContent = message;

  return paragraph;
};

const renderErrorAlert = (message) => {
  const container = document.querySelector('body');

  const errorWrapper = getMessageWrapper(ErrorWrapperTemplate);
  const errorMessage = getMessage(message, MESSAGE_CLASS);

  errorWrapper.appendChild(errorMessage);
  container.insertAdjacentElement('afterbegin', errorWrapper);

  errorMessage.focus();

  setTimeout(() => {
    container.parentElement.removeChild(errorWrapper);
  }, DELETE_MESSAGE_TIMER);
}

export {renderErrorAlert}
