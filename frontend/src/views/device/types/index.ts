export interface DeviceItem {
  key: string;
  deviceStatus: string;
  modeName: string;
  serialNumber: string;
  firmMainVer: string;
  firmSubVer: string;
  nodeName: string;
  runningTask: string;
  lastUpdateTime: string;
}
export interface instantTaskItem {
  key: string;
  modeName: string;
  serialNumber: string;
  firmMainVer: string;
  firmSubVer: string;
  nodeName: string;
}
export interface ResponseDeviceItem {
  deviceId: string;
  deviceStatus: string;
  modeName: string;
  serialNumber: string;
  firmMainVer: string;
  firmSubVer: string;
  nodeName: string;
  runningTask: string;
  lastUpdateTime: string;
}
export type filterFn = (value: any, record: DeviceItem) => boolean;
export interface ResponseDeviceDetailItem {
  contact: string;
  deviceStatus: string;
  firmMainVer: string;
  firmSubVer: string;
  iconUrl: string;
  ipAddress: string;
  location: string;
  macAddress: string;
  modeName: string;
  nodeName: string;
  serialNumber: string;
}
