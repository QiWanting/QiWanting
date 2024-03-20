/* eslint-disable no-unused-vars */
/**
 * @description: Request result set
 */
export enum ResultEnum {
  SUCCESS = 1001,
  CREATED = 1002,
  ACCEPTED = 1003,
  DEVICE_HAS_BEEN_BOUND = 1004,
  DEVICE_REGISTER_FAILED = 1005,
  DEVICE_IS_BOUND_BY_ANOTHER_ACCOUNT = 1006,
  PARAMETER_INVALID = 2001,
  PARAMETER_MISSING = 2002,
  PARAMETER_EXPIRED = 2003,
  CARD_PARAMETER_EXPIRED = 2040,
  UNAUTHORIZED_SP_USER_TOKEN = 2301,
  EXPIRED_SP_USER_TOKEN = 2302,
  UNAUTHORIZED_BASIC_AUTH = 2303,
  UNAUTHORIZED_SHIPPING_TOKEN_NOT_FOUND = 2304,
  UNAUTHORIZED_SHIPPING_TOKEN_NOT_EXPIRED = 2305,
  UNAUTHORIZED_SESSION = 2306,
  SESSION_EXPIRED = 2101,
  RESOURCE_NOT_EXISTED = 2102,
  MAXINUM_DEVICE_LINKED = 2201,
  MAXINUM_USER_LINKED = 2202,
  MAXINUM_ORDERS = 2203,
  CALL_MULTIPLE_TIMES = 2204,
  ILLEGAL_STATE_TRANSITION = 2205,
  REQUEST_HAS_BEEN_MODIFIED = 2399,
  TIMEOUT = 3000,
}

export enum StatusEnum {
  STATUS_400 = 400,
  STATUS_401 = 401,
  STATUS_404 = 404,
  STATUS_405 = 405,
  STATUS_409 = 409,
  STATUS_500 = 500,
  STATUS_521 = 521,
  STATUS_524 = 524,
  STATUS_525 = 525,
}
/**
 * @description: request method
 */
export enum RequestEnum {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

/**
 * @description:  contentTyp
 */
export enum ContentTypeEnum {
  // json
  JSON = 'application/json;charset=UTF-8',
  // form-data qs
  FORM_URLENCODED = 'application/x-www-form-urlencoded;charset=UTF-8',
  // form-data  upload
  FORM_DATA = 'multipart/form-data;charset=UTF-8',
}

export enum ErrorMessage {
  INTERNAL_SERVER_ERROR = 'Internal Server Error.',
}

export enum ErrorMessageModeEnum {
  MODAL = 'modal',
  MESSAGE = 'message',
  NONE = 'none',
}
