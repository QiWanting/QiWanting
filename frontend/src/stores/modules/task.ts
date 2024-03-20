import { defineStore } from 'pinia';
import { getTaskLogList } from '/@/api/task';
import { CurrentTaskItem, ResponseTaskLogItem, TaskLogItem } from '/@/views/task/types';
import { TaskStatus } from '/@/enums';
import { getUtcTime, sortString } from '/@/utils';

interface Task {
  logs: ResponseTaskLogItem[];
}

export const useTaskStore = defineStore('task', {
  state: (): Task => ({
    logs: [],
  }),
  getters: {
    getCurrentTask(): CurrentTaskItem[] {
      const curTaskList: CurrentTaskItem[] = [];
      this.logs.map((task: ResponseTaskLogItem) => {
        switch (task.taskStatus) {
          case TaskStatus.STOPPING:
          case TaskStatus.CREATED:
          case TaskStatus.WORKING:
            curTaskList.push({
              key: task.taskId,
              ...task,
            });
            break;
        }
        curTaskList.sort((a, b) => {
          return sortString(b.started, a.started);
        });
      });
      return curTaskList;
    },
    getTaskLog(): TaskLogItem[] {
      const taskLogList: TaskLogItem[] = [];
      this.logs.map((task: ResponseTaskLogItem) => {
        switch (task.taskStatus) {
          case TaskStatus.STOP:
          case TaskStatus.ERROR:
          case TaskStatus.COMPLETED:
            taskLogList.push({
              key: task.taskId,
              ...task,
            });
            break;
        }
        taskLogList.sort((a, b) => {
          return sortString(b.started, a.started);
        });
      });
      return taskLogList;
    },
  },
  actions: {
    async initData(): Promise<void> {
      const { taskLogsList } = await getTaskLogList().catch(e => console.log(e));
      this.logs = taskLogsList;
    },
    deleteTaskLog(idList: string[]): void {
      for (const id of idList) {
        this.logs.splice(
          this.logs.findIndex(i => i.taskId === id),
          1,
        );
      }
    },
    changeStatus(taskId: string, newStatus: number): void {
      const index = this.logs.findIndex(i => i.taskId === taskId);
      if (index !== -1) {
        this.logs[index].taskStatus = newStatus;
        this.logs[index].finished = getUtcTime();
      }
    },
  },
});
