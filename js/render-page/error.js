const ErrorWrapperTemplate = {
  CLASS: 'api-error-container',
  Styles: {
    position: 'fixed',
    top: `${50}%`,
    left: `${50}%`,
    'z-index': 9999,
    display: 'block',
    width: `${70}%`,
    'min-height': `${95}px`,
    padding: `${30}px ${30}px`,
    'text-align': 'center',
    'font-family': '"Roboto", "Arial", sans-serif',
    'font-size': `${28}px`,
    'line-height': 'normal',
    'font-weight': 500,
    color: 'black',
    'background-color': '#E52B50',
    transform: `translate(${-50}%, ${-50}%)`,
  },
};

const ErrorMessageTemplate = {
  CLASS: 'api-error-message',
  HEADER_CLASS: 'api-error-message_header',
  HeaderStyles: {
    'margin-top': 0,
    'font-size': `${1.6}em`,
    'font-weight': 900,
  },
};

const DELETE_MESSAGE_TIMER = 15000; // * 15sec

const setAlertWrapperStyles = (element, WrapperStylesTemplate) => {

  element.style.position = WrapperStylesTemplate.position;
  element.style.top = WrapperStylesTemplate.top;
  element.style.left = WrapperStylesTemplate.left;
  element.style.zIndex = WrapperStylesTemplate['z-index'];
  element.style.transform = WrapperStylesTemplate.transform;

  element.style.display = WrapperStylesTemplate.display;
  element.style.width = WrapperStylesTemplate.width;
  element.style.minHeight = WrapperStylesTemplate['min-height'];
  element.style.padding = WrapperStylesTemplate.padding;

  element.style.fontFamily = WrapperStylesTemplate['font-family'];
  element.style.fontSize = WrapperStylesTemplate['font-size'];
  element.style.lineHeight = WrapperStylesTemplate['line-height'];
  element.style.fontWeight = WrapperStylesTemplate['font-weight'];
  element.style.textAlign = WrapperStylesTemplate['text-align'];
  element.style.color = WrapperStylesTemplate.color;

  element.style.backgroundColor = WrapperStylesTemplate['background-color'];
};

const setAlertHeaderStyles = (element, AlertHeaderTemplate) => {
  element.style.marginTop = AlertHeaderTemplate['margin-top'];
  element.style.fontSize = AlertHeaderTemplate['font-size'];
  element.style.fontWeight = AlertHeaderTemplate['font-weight'];
};

const getMessageWrapper = (Template) => {
  const {CLASS, Styles} = Template;
  const wrapper = document.createElement('div');
  wrapper.className = CLASS;
  setAlertWrapperStyles(wrapper, Styles);

  return wrapper;
}

const getErrorString = (string, paragraphClass = ErrorMessageTemplate.CLASS) => {
  const paragraph = document.createElement('p');
  paragraph.className = paragraphClass;
  paragraph.textContent = string;

  return paragraph;
};

const getMessage = (messages) => {
  const messageFragment = document.createDocumentFragment();

  messages.forEach((string, index) => {
    const element = getErrorString(string)

    if (index === 0) {
      element.classList.add(ErrorMessageTemplate.HEADER_CLASS);
      setAlertHeaderStyles(element, ErrorMessageTemplate.HeaderStyles);
    }

    messageFragment.appendChild(element);
  });

  return messageFragment;
};

const renderErrorAlert = (messages) => {
  const container = document.querySelector('body');

  const errorWrapper = getMessageWrapper(ErrorWrapperTemplate);
  const errorMessage = getMessage(messages);

  errorWrapper.appendChild(errorMessage);
  container.insertAdjacentElement('afterbegin', errorWrapper);

  document.querySelector('.api-error-message_header').focus();

  setTimeout(() => {
    container.removeChild(errorWrapper);
  }, DELETE_MESSAGE_TIMER);
}

export {renderErrorAlert}
