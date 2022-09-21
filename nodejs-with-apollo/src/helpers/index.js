import { ERROR_MESSAGE } from '../CONST/error';

const getMsgForProperty = (constraintsType, property) => {
  const replaceMsg = ERROR_MESSAGE[constraintsType].replace(
    '$property',
    property
  );

  return replaceMsg;
};

const throwNewError = (constraintsType, property, msg) => {
  const errorMsg = msg ? msg : getMsgForProperty(constraintsType, property);
  throw new Error(errorMsg);
};

export { throwNewError };
