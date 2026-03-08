/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_GATEWAY: string
  readonly VITE_CORE_API: string
  readonly VITE_AUTH_API: string
  readonly VITE_EUREKA_DASHBOARD: string
  readonly VITE_APP_NAME: string
  readonly VITE_APP_VERSION: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}