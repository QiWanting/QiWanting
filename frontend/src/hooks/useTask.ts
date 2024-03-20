import { sendTask } from '../api/task';
import { InstantTask } from '../enums';

export const TaskComponent = reactive({
  firmwareUpdate: markRaw(
    defineAsyncComponent(() => import('/@/components/runTaskModal/firmwareUpdate.vue')),
  ),
  sendFile: markRaw(defineAsyncComponent(() => import('/@/components/runTaskModal/sendFile.vue'))),
});

export const runTask = async (type: TaskType, payload: TaskPayload, devices: string[]) => {
  switch (type) {
    case InstantTask.FIRMWARE_UPDATE:
      await sendTask({
        taskType: type,
        taskPayload: payload,
        deviceList: devices,
      }).catch(_ => {});
      break;
    case InstantTask.SEND_FILE:
      await sendTask({
        taskType: type,
        taskPayload: payload,
        deviceList: devices,
      }).catch(_ => {});
      break;
  }
};
