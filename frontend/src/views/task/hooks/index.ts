import {
  AppContext,
  Color,
  InstantTask,
  TaskDetailCode,
  TaskDetailText,
  TaskStatus,
  TaskStatusCode,
  TaskStatusText,
} from '/@/enums';

export const setStatusColor = (status: number): string => {
  let color: string = '';
  switch (status) {
    case TaskStatus.COMPLETED:
      color = Color.GREEN;
      break;
    case TaskStatus.ERROR:
      color = Color.RED;
      break;
    case TaskStatus.STOP:
      color = Color.DARK_GREY;
      break;
    case TaskStatus.WORKING:
      color = Color.BLUE;
      break;
    case TaskStatus.STOPPING:
      color = Color.GREY;
      break;
    case TaskStatus.CREATED:
    default:
      color = 'default';
      break;
  }
  return color;
};
export const setTextColor = (status: number): string => {
  let color: string = '';
  switch (status) {
    case TaskStatus.COMPLETED:
    case TaskStatus.ERROR:
    case TaskStatus.STOP:
    case TaskStatus.WORKING:
    case TaskStatus.STOPPING:
      color = Color.WHITE;
      break;
    case TaskStatus.CREATED:
    default:
      color = Color.BLACK;
      break;
  }
  return color;
};

export const translateStatus = (status: number): string => {
  let transedWord: string = '';
  switch (status) {
    case TaskStatusCode.CODE_0:
      transedWord = TaskStatusText.CODE_0;
      break;
    case TaskStatusCode.CODE_1:
      transedWord = TaskStatusText.CODE_1;
      break;
    case TaskStatusCode.CODE_2:
      transedWord = TaskStatusText.CODE_2;
      break;
    case TaskStatusCode.CODE_3:
      transedWord = TaskStatusText.CODE_3;
      break;
    case TaskStatusCode.CODE_4:
      transedWord = TaskStatusText.CODE_4;
      break;
    case TaskStatusCode.CODE_5:
      transedWord = TaskStatusText.CODE_5;
      break;
  }
  return transedWord;
};
export const transToDetailStatus = (status: number): string => {
  let transedWord: string = '';
  switch (status) {
    case TaskDetailCode.CODE_1:
      transedWord = TaskDetailText.CODE_1;
      break;
    case TaskDetailCode.CODE_2:
      transedWord = TaskDetailText.CODE_2;
      break;
    case TaskDetailCode.CODE_3:
      transedWord = TaskDetailText.CODE_3;
      break;
    case TaskDetailCode.CODE_101:
      transedWord = TaskDetailText.CODE_101;
      break;
    case TaskDetailCode.CODE_201:
      transedWord = TaskDetailText.CODE_201;
      break;
    case TaskDetailCode.CODE_401:
      transedWord = TaskDetailText.CODE_401;
      break;
    case TaskDetailCode.CODE_501:
      transedWord = TaskDetailText.CODE_501;
      break;
    case TaskDetailCode.CODE_502:
      transedWord = TaskDetailText.CODE_502;
      break;
    case TaskDetailCode.CODE_503:
      transedWord = TaskDetailText.CODE_503;
      break;
    case TaskDetailCode.CODE_504:
      transedWord = TaskDetailText.CODE_504;
      break;
    case TaskDetailCode.CODE_505:
      transedWord = TaskDetailText.CODE_505;
      break;
    case TaskDetailCode.CODE_506:
      transedWord = TaskDetailText.CODE_506;
      break;
    case TaskDetailCode.CODE_507:
      transedWord = TaskDetailText.CODE_507;
      break;
    case TaskDetailCode.CODE_508:
      transedWord = TaskDetailText.CODE_508;
      break;
    case TaskDetailCode.CODE_509:
      transedWord = TaskDetailText.CODE_509;
      break;
    default:
      transedWord = TaskDetailText.DEFAULT;
      break;
  }
  return transedWord;
};

export const setDetailStatusColor = (status: number): string => {
  let color: string = '';
  switch (status) {
    case TaskDetailCode.CODE_1:
    case TaskDetailCode.CODE_2:
    case TaskDetailCode.CODE_3:
      color = Color.GREEN;
      break;
    case TaskDetailCode.CODE_101:
      color = Color.BLUE;
      break;
    case TaskDetailCode.CODE_201:
      color = 'default';
      break;
    case TaskDetailCode.CODE_401:
      color = Color.DARK_GREY;
      break;
    case TaskDetailCode.CODE_501:
    case TaskDetailCode.CODE_502:
    case TaskDetailCode.CODE_503:
    case TaskDetailCode.CODE_504:
    case TaskDetailCode.CODE_505:
    case TaskDetailCode.CODE_506:
    case TaskDetailCode.CODE_507:
    case TaskDetailCode.CODE_508:
    case TaskDetailCode.CODE_509:
    default:
      color = Color.RED;
      break;
  }
  return color;
};

export const setDetailTextColor = (status: number): string => {
  let color: string = '';
  switch (status) {
    case TaskDetailCode.CODE_201:
      color = Color.BLACK;
      break;
    case TaskDetailCode.CODE_1:
    case TaskDetailCode.CODE_2:
    case TaskDetailCode.CODE_3:
    case TaskDetailCode.CODE_101:
    case TaskDetailCode.CODE_401:
    case TaskDetailCode.CODE_501:
    case TaskDetailCode.CODE_502:
    case TaskDetailCode.CODE_503:
    case TaskDetailCode.CODE_504:
    case TaskDetailCode.CODE_505:
    case TaskDetailCode.CODE_506:
    case TaskDetailCode.CODE_507:
    case TaskDetailCode.CODE_508:
    case TaskDetailCode.CODE_509:
    default:
      color = Color.WHITE;
      break;
  }
  return color;
};

export const transToDetailTitle = (type: string): string => {
  let transedWord: string = '';
  switch (type) {
    case InstantTask.FIRMWARE_UPDATE:
      transedWord = AppContext.DETAIL_UPDATE_FIRMWARE;
      break;
    case InstantTask.SEND_FILE:
      transedWord = AppContext.DETAIL_SEND_FILE;
      break;
  }
  return transedWord;
};
