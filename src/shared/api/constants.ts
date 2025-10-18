const IS_DEV = import.meta.env.DEV

export const API_URL = import.meta.env[IS_DEV ? 'VITE_DEV_API_URL' : 'VITE_PROD_API_URL']
export const WS_URL = import.meta.env[IS_DEV ? 'VITE_DEV_WS_URL' : 'VITE_PROD_WS_URL']

export enum Method {
  GET = 'GET',
  DELETE = 'DELETE',
  POST = 'POST',
  PATCH = 'PATCH',
}
