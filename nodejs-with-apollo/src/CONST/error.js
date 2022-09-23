const ERROR_MESSAGE = {
  CustomAlreadyExisted: 'The $property already existed',
  CustomNotExist: 'The $property does not exist',
  CustomNotFound: '$property not found',
  CustomNotAuthenticated: 'The $property is not authenticated',
};

const AUTHENTICATION_ERROR = {
  NotAuthenticated: 'You are not authenticated',
  AccessDenied: 'Access Denied',
  InvalidAuthentication: 'Your email or password is incorrect',
  PermissionDenied: 'You do not have permission to do this action',
};

export { ERROR_MESSAGE, AUTHENTICATION_ERROR };
