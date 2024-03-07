const ErrorWrapperTemplate = {
  CLASS: 'api-error-container',
  Styles: {
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
    'font-size': `${28}px`,
    'line-height': 'normal',
    'font-weight': 500,
    color: 'black',
    'background-color': '#E52B50',
  },
};

const ErrorMessageTemplate = {
  CLASS: 'api-error-message',
  HEADER_CLASS: 'api-error-message_header',
  HeaderStyles: {
    'font-size': `${2}em`,
    'font-weight': 900,
  },
};

const DELETE_MESSAGE_TIMER = 15000; // * 15sec

const getAlertWrapperStyles = (WrapperStylesTemplate) => {
  return `
    position: ${WrapperStylesTemplate.position};
    top: ${WrapperStylesTemplate.top};
    left: ${WrapperStylesTemplate.left};
    z-index: ${WrapperStylesTemplate['z-index']};

    display: ${WrapperStylesTemplate.flex};
    justify-content: ${WrapperStylesTemplate['justify-content']};
    width: ${WrapperStylesTemplate.width};
    min-height: ${WrapperStylesTemplate['min-height']};
    padding: ${WrapperStylesTemplate.padding};
    text-align: ${WrapperStylesTemplate['text-align']};

    font-family: ${WrapperStylesTemplate['font-family']};
    font-size: ${WrapperStylesTemplate['font-size']};
    line-height: ${WrapperStylesTemplate['line-height']};
    font-weight: ${WrapperStylesTemplate['font-weight']};
    color: ${WrapperStylesTemplate.color};

    background-color: ${WrapperStylesTemplate['background-color']};
  `;
};

const getAlertHeaderStyles = (AlertHeaderTemplate) => {
  return `
    'font-size': ${AlertHeaderTemplate['font-size']};
    'font-weight': ${AlertHeaderTemplate['font-weight']};
  `
};

const getMessageWrapper = (Template) => {
  const {CLASS, Styles} = Template;
  const wrapper = document.createElement('div');
  wrapper.className = CLASS;
  wrapper.style.cssText = getAlertWrapperStyles(Styles);

  return wrapper;
}

// TODO Доделать перебор сообщения, чтобы создавалось 3 отдельных параграфа в контейнере

const getMessage = (messages, Template) => {
  const {CLASS, HEADER_CLASS, HeaderStyles} = Template;
  const paragraph = document.createElement('p');
  paragraph.className = CLASS;
  paragraph.style.cssText = getAlertHeaderStyles(HeaderStyles)
  paragraph.textContent = messages;

  return paragraph;
};

const renderErrorAlert = (messages) => {
  const container = document.querySelector('body');

  const errorWrapper = getMessageWrapper(ErrorWrapperTemplate);
  const errorMessage = getMessage(messages, ErrorMessageTemplate);

  errorWrapper.appendChild(errorMessage);
  container.insertAdjacentElement('afterbegin', errorWrapper);

  errorMessage.focus();

  setTimeout(() => {
    container.parentElement.removeChild(errorWrapper);
  }, DELETE_MESSAGE_TIMER);
}

export {renderErrorAlert}
