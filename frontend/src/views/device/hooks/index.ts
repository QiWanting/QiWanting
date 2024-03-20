import { DeviceItem, filterFn } from '../types';

export const useOnlineStatusFilter: filterFn = (value: string, record: DeviceItem): boolean => {
  return record.deviceStatus.indexOf(value) === 0;
};

export const useFormatDateTime = (date: string): string => {
  return useDateFormat(date, 'YYYY-MM-DD HH:mm:ss').value.toString();
};
