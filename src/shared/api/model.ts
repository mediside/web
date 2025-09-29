import { API_URL, Method } from './constants'

const fetch = async <T>(method: Method, path: string, body?: object | FormData) => {
  const isData = body instanceof FormData // TODO: убрать проверку в угоду оптимизации
  const response = await window.fetch(new URL(path, API_URL), { method, body: isData ? body : JSON.stringify(body) })
  const data: T = await response.json()
  return { data }
}

const get = async <T>(path: string, body?: object) => fetch<T>(Method.GET, path, body)

const post = async <T>(path: string, body?: object) => fetch<T>(Method.POST, path, body)

const del = async <T>(path: string, body?: object) => fetch<T>(Method.DELETE, path, body)

const download = async (path: string, body?: object) => {
  const response = await window.fetch(new URL(path, API_URL), { method: 'GET', body: JSON.stringify(body) })
  return response.blob()
}

export const api = {
  get,
  post,
  delete: del,
  download,
}
