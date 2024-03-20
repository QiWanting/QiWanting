import axios from 'axios';
import { defHttp } from '/@/utils/axios';

export const sendTask = (data: Task) => {
  return defHttp.post({ url: '/tasks', data });
};

export const getTaskLogList = () => {
  return defHttp.get(
    { url: '/tasks/tasklogs' },
    { successMessageMode: 'none', errorMessageMode: 'none' },
  );
};

export const taskStop = (taskId: string) => {
  return defHttp.post({ url: `/tasks/${taskId}/cancel` });
};

export const taskDelete = (taskIdist: string[]) => {
  return defHttp.delete({ url: '/tasks/tasklogs', data: { taskIDList: taskIdist } });
};
export const getTaskDetail = (taskId: string) => {
  return defHttp.get({ url: `/tasks/tasklogs/${taskId}/details` });
};
export const getUploadIdAndUrl = (fileName: string, deviceName: string) => {
  return defHttp.get({
    url: `/file_storage_space?devicename=${deviceName}&filename=${fileName}`,
  });
};
export const uploadToS3 = (url: string, file: File) => {
  if (url) {
    return axios
      .put(url, file)
      .then(res => {
        if (res.status == 200) {
          //上传成功...
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
};
