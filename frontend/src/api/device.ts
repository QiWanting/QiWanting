import { defHttp } from '/@/utils/axios';

export const getDeviceList = () => {
  return defHttp.get({ url: '/devices' });
};

export const getDeviceStatus = (list: string[]) => {
  return defHttp.post({ url: '/devices', data: { deviceIdList: list } });
};

export const getDeviceDetail = (id: string) => {
  return defHttp.get({ url: `/devices/information?deviceId=${id}` });
};
