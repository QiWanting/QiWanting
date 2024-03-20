declare interface Fn<T = any, R = T> {
  (...arg: T[]): R;
}

declare type GetArrayItemType<T extends unknown[]> = T extends Array<infer S> ? S : never;

declare type TargetContext = '_self' | '_blank';

declare type TaskType = 'firmwareUpdate' | 'sendFile' | '';
declare interface sendFilePayload {
  fileType: string;
  fileUrlId: string;
  fileName: string;
}
declare interface firmwareUpdatePayload {
  checkOnly: boolean;
}
declare interface uploadFileInfoType {
  fileData: File;
  uploadS3Url: string;
}
declare type TaskPayload = sendFilePayload | firmwareUpdatePayload;
