const WarningTemplates = {
  UNKNOWN: 'Неизвестно',
  FAILED: 'Не удалось',
  INFO_MESSAGE: 'Для получения дополнительной информации свяжитесь с владельцем.',
};

const getWarningMessage = (capacityString, timeString) => {
  if (capacityString.includes(WarningTemplates.UNKNOWN)
    || capacityString.includes(WarningTemplates.FAILED)
    || timeString.includes(WarningTemplates.UNKNOWN)
    || capacityString.includes(WarningTemplates.UNKNOWN)) {
    return WarningTemplates.INFO_MESSAGE;
  }

  return null;
};

export {WarningTemplates, getWarningMessage};
