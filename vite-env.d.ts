interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface ImportMetaEnv {
  readonly VITE_APP_API_URL: string;
  readonly VITE_APP_FILE_SERVER_API_URL: string;
  readonly VITE_APP_FILE_SERVER_SOCKET_API_URL: string;
  readonly VITE_APP_CHAT_SOCKET_API_URL: string;
}
