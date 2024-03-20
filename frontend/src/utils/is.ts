export {
  isBoolean,
  isError,
  isFunction,
  isNumber,
  isNull,
  isString,
  isObject,
  isUndefined,
  isEmpty,
  isArray,
  isEqual,
} from 'lodash-es';

const toString = Object.prototype.toString;

export function is(val: unknown, type: string) {
  return toString.call(val) === `[object ${type}]`;
}

export function isUrl(path: string): boolean {
  const reg = /^http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?/;
  return reg.test(path);
}
