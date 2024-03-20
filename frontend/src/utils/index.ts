import { intersectionWith, mergeWith, unionWith } from 'lodash-es';
import { isArray, isEqual, isObject } from '/@/utils/is';
import { CompareFn } from 'ant-design-vue/lib/table/interface';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

export function setObjToUrlParams(baseUrl: string, obj: any): string {
  let parameters = '';
  for (const key in obj) {
    parameters += key + '=' + encodeURIComponent(obj[key]) + '&';
  }
  parameters = parameters.replace(/&$/, '');
  return /\?$/.test(baseUrl) ? baseUrl + parameters : baseUrl.replace(/\/?$/, '?') + parameters;
}
/**
 * Recursively merge two objects.
 * 递归合并两个对象。
 *
 * @param source The source object to merge from. 要合并的源对象。
 * @param target The target object to merge into. 目标对象，合并后结果存放于此。
 * @param mergeArrays How to merge arrays. Default is "replace".
 *        如何合并数组。默认为replace。
 *        - "union": Union the arrays. 对数组执行并集操作。
 *        - "intersection": Intersect the arrays. 对数组执行交集操作。
 *        - "concat": Concatenate the arrays. 连接数组。
 *        - "replace": Replace the source array with the target array. 用目标数组替换源数组。
 * @returns The merged object. 合并后的对象。
 */
export function deepMerge<T extends object | null | undefined, U extends object | null | undefined>(
  source: T,
  target: U,
  mergeArrays: 'union' | 'intersection' | 'concat' | 'replace' = 'replace',
): T & U {
  if (!target) {
    return source as T & U;
  }
  if (!source) {
    return target as T & U;
  }
  return mergeWith({}, source, target, (sourceValue, targetValue) => {
    if (isArray(targetValue) && isArray(sourceValue)) {
      switch (mergeArrays) {
        case 'union':
          return unionWith(sourceValue, targetValue, isEqual);
        case 'intersection':
          return intersectionWith(sourceValue, targetValue, isEqual);
        case 'concat':
          return sourceValue.concat(targetValue);
        case 'replace':
          return targetValue;
        default:
          throw new Error(`Unknown merge array strategy: ${mergeArrays as string}`);
      }
    }
    if (isObject(targetValue) && isObject(sourceValue)) {
      return deepMerge(sourceValue, targetValue, mergeArrays);
    }
    return undefined;
  });
}

export function getImageUrl(name: string) {
  return new URL(`../assets/images/${name}.png`, import.meta.url).href;
}

const getRandomString16 = (num: number): string => {
  let result = '';
  for (let i = 0; i < num; i++) {
    result += Math.floor(Math.random() * 16).toString(16); // 获取0-15并通过toString转16进制
  }
  return result;
};

export const createXRequestID = () => {
  const uuid = Date.now().toString(36) + '-' + [4, 4, 4, 12].map(getRandomString16).join('-');
  return uuid;
};

export const sortString: CompareFn<any> = (a: string, b: string) => {
  return a.localeCompare(b, 'en', { sensitivity: 'base' });
};

export const firstLetterLowerCase = (str: string): string => {
  return str.replace(str[0], str[0].toLowerCase());
};
export const firstLetterUpperCase = (str: string): string => {
  return str.replace(str[0], str[0].toUpperCase());
};

export const formatToLocalTime = (time: string): string => {
  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.tz.setDefault('UTC');
  // 转换成 ISO 格式
  const timestamp = dayjs(time).format('YYYY-MM-DDTHH:mm:ss[Z]');
  // 获取用户的时区
  const userTimezone = dayjs.tz.guess();
  // 将 UTC 时间转换为用户时区的时间
  const userLocalTime = dayjs(timestamp).tz(userTimezone).format('YYYY-MM-DD HH:mm:ss');

  return userLocalTime;
};
export const getUtcTime = (): string => {
  dayjs.extend(utc);
  return dayjs().utc().format('YYYY-MM-DD HH:mm:ss');
};
