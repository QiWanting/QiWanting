export enum PageEnum {
  LOGIN = '/login', // basic login path
  HOME = '/', // basic home path
  DEVICES = '/device',
  TASKS = '/task',
  DEVICE_LIST = '/device/list',
  TASK_LIST = '/task/list',
  OTHER = '/:pathMatch(.*)*',
}

export enum PageName {}
