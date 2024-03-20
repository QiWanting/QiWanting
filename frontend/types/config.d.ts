export interface GlobConfig {
  // Service interface url
  apiUrl: string;
  // Upload url
  uploadUrl?: string;
  //  Service interface url prefix
  urlPrefix?: string;
}
export interface GlobEnvConfig {
  // Service interface url
  VITE_GLOB_API_URL: string;
  // Service interface url prefix
  VITE_GLOB_API_URL_PREFIX?: string;
  // Upload url
  VITE_GLOB_UPLOAD_URL?: string;
  // task list websocket
  VITE_TASK_WEBSOCKET?: string;
  // task detail websocket
  VITE_TASK_DETAIL_WEBSOCKET?: string;
}

export interface RuntimeConfig {
  // disable config flag
  DISABLE_CONFIG: boolean;
  // DGFT API key
  DGFT_API_KEY: string;
}
