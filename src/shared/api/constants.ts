const IS_DEV = import.meta.env.DEV

export const API_URL = import.meta.env[IS_DEV ? 'VITE_DEV_API_URL' : 'VITE_PROD_API_URL']

export enum Method {
  GET = 'GET',
  DELETE = 'DELETE',
  POST = 'POST',
}
