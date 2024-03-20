export enum AppContext {
  TITILE = 'RDM',
  DEVICES = 'Devices',
  TASKS = 'Tasks',
  INSTANT_TASKS = 'Instant tasks',
  GET_DEVICE_STATUS = 'Get device status',
  FIRMWARE_UPDATE = 'Firmware update',
  SEND_FILE = 'Send file',
  ONLINE = 'online',
  OFFLINE = 'offline',
  LOGOUT = 'logout',
  UPDATE_FLAG_TEXT = 'Auto update to the latest version',
  UPDATE_TIPS = 'If unchecked, will just do firmware update check for selected devices.',
  CURRENT_TASK = 'Current task',
  TASK_LOG = 'Task log',
  STOP_CONTEXT = 'Are you sure want to stop all selected tasks?',
  DELETE_CONTEXT = 'Are you sure would like to delete the task logs?',
  OK = 'OK',
  CANCEL = 'Cancel',
  DELETE = 'Delete',
  DETAIL_UPDATE_FIRMWARE = 'Detail - Update firmware',
  DETAIL_SEND_FILE = 'Detail - Send file',
  RETRY = 'Retry error devices...',
  TARGET = 'Target:',
  CHOOSE_FILE = 'Please choose file:',
  FILE_NAME_RULE = 'ファイル名：半角英数、ハイフン(-)、アンダーバー(_)、ピリオド(.)のみ許容されマルチバイト文字は使用できません。1~987文字で指定してください。',
  FILE_AMOUNT_RULE = 'Limit 1 file, new file will cover the old file',
  SELECT_FILE = 'Select file',
  RUN = 'Run',
  FILE = 'File:',
}

export enum IconSrcPath {
  REFRESH_STATUS = 'RefreshStatus',
  FIRMWARE_UPDATE = 'FirmwareUpdate',
  SEND_FILE = 'SendFiles',
  INSTANT_TASK = 'InstantTask',
  SHOW_DETAILS = 'ShowDetail',
  STOP = 'Stop',
  DELETE = 'Delete',
}

export enum DeviceTable {
  ONLINE_STATUS = 'Online status',
  MODEL_NAME = 'Model name',
  SERAIL = 'Serail number',
  MAIN_FIRM_VERSION = 'Firmware version (Main)',
  SUB_FIRM_VERSION = 'Firmware version (Sub)',
  NODE_NAME = 'Node name',
  RUNNING_TASK = 'Running task',
  LAST_UPDATE_TIME = 'Last update time',
}

export enum InstantTask {
  FIRMWARE_UPDATE = 'firmwareUpdate',
  SEND_FILE = 'sendFile',
}

export const enum TasksType {
  CURRENT_TASK = 'CurrentTask',
  TASK_LOG = 'TaskLog',
}
export const enum TasksSiderBtnText {
  DETAILS = 'Details',
  STOP = 'Stop',
  DELETE = 'Delete',
}
export const enum TasksSiderBtnKey {
  CUR_TASK_DETAILS = 'curTaskDetails',
  STOP = 'stop',
  TASK_LOG_DETAILS = 'taskLogDetails',
  DELETE = 'delete',
}
export const enum TaskStatus {
  COMPLETED = 0,
  WORKING = 1,
  CREATED = 2,
  STOPPING = 3,
  STOP = 4,
  ERROR = 5,
}

export const enum TaskStatusCode {
  CODE_0 = 0,
  CODE_1 = 1,
  CODE_2 = 2,
  CODE_3 = 3,
  CODE_4 = 4,
  CODE_5 = 5,
}

export const enum TaskStatusText {
  CODE_0 = 'Completed',
  CODE_1 = 'Working···',
  CODE_2 = 'Waiting···',
  CODE_3 = 'Stopping···',
  CODE_4 = 'Stop',
  CODE_5 = 'Error',
}
export const enum TaskDetailCode {
  CODE_1 = 1,
  CODE_2 = 2,
  CODE_3 = 3,
  CODE_101 = 101,
  CODE_201 = 201,
  CODE_401 = 401,
  CODE_501 = 501,
  CODE_502 = 502,
  CODE_503 = 503,
  CODE_504 = 504,
  CODE_505 = 505,
  CODE_506 = 506,
  CODE_507 = 507,
  CODE_508 = 508,
  CODE_509 = 509,
}
export const enum TaskDetailText {
  CODE_1 = 'Complete',
  CODE_2 = 'New firmware updates available',
  CODE_3 = 'Firmware is up-to-date',
  CODE_101 = 'Working…',
  CODE_201 = 'Wating…',
  CODE_401 = 'Cancelled',
  CODE_501 = 'Data id error or Not supported',
  CODE_502 = 'Device is busy',
  CODE_503 = 'Permission error',
  CODE_504 = 'Prohibition setting cannot be executed',
  CODE_505 = 'Device memory full',
  CODE_506 = 'Please set the date and time',
  CODE_507 = "You must change the device's default password",
  CODE_508 = 'Firmware update error',
  CODE_509 = 'Connection error',
  DEFAULT = 'Server error',
}

export enum TaskTable {
  TYPE = 'Type',
  STATUS = 'Status',
  STARTED = 'Started',
  FINISHED = 'Finished',
  TARGET = 'Target',
}

export const enum TaskTetailTable {
  STATUS = 'Status',
  MODEL_NAME = 'Model name',
  NODE_NAME = 'Node name',
  SERAIL = 'Serail number',
  MAIN_FIRM_VERSION = 'Firmware version (Main)',
  SUB_FIRM_VERSION = 'Firmware version (Sub)',
}

export const enum TaskMenu {
  INSTANT_TASKS = 'Instant tasks',
}

export const enum Color {
  RED = '#b30000',
  GREEN = '#008a00',
  BLUE = '#4568e6',
  YELLO = '#ffbf00',
  WHITE = '#ffffff',
  BLACK = '#000000',
  GREY = '#adadad',
  DARK_GREY = '#808080',
}
