import { TasksType } from '/@/enums';

export interface CurrentTaskItem {
  key: string;
  taskType: string;
  taskStatus: number;
  started: string;
  targetDeviceCount: string;
}
export interface TaskLogItem {
  key: string;
  taskType: string;
  taskStatus: number;
  started: string;
  finished: string;
  targetDeviceCount: string;
}
export interface ResponseTaskLogItem {
  taskId: string;
  taskType: string;
  taskStatus: number;
  started: string;
  finished: string;
  targetDeviceCount: string;
}
export type Key = string | number;
export type Type = '' | TasksType.CURRENT_TASK | TasksType.TASK_LOG;
export interface DetailLogItem {
  key: string;
  modeName: string;
  nodeName: string;
  firmMainVer: string;
  firmSubVer: string;
  targetDeviceTaskStatus: number;
}
export interface ResponseDetailLogItem {
  deviceId: string;
  modeName: string;
  nodeName: string;
  firmMainVer: string;
  firmSubVer: string;
  targetDeviceTaskStatus: number;
}
