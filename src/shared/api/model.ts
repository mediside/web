import { API_URL, Method, WS_URL } from './constants'

const fetch = async <T>(method: Method, path: string, body?: object) => {
  const response = await window.fetch(new URL(path, API_URL), { method, body: JSON.stringify(body) })
  const data: T = await response.json()
  return { data }
}

const upload = async (path: string, body: FormData, onprogress: (e: ProgressEvent<EventTarget>) => void) => {
  await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.upload.onprogress = onprogress
    xhr.onload = resolve
    xhr.onerror = reject
    xhr.open('POST', new URL(path, API_URL))
    xhr.send(body)
  })
}

const get = async <T>(path: string, body?: object) => fetch<T>(Method.GET, path, body)

const post = async <T>(path: string, body?: object) => fetch<T>(Method.POST, path, body)

const del = async <T>(path: string, body?: object) => fetch<T>(Method.DELETE, path, body)

const download = async (path: string, body?: object) => {
  const response = await window.fetch(new URL(path, API_URL), { method: 'GET', body: JSON.stringify(body) })
  return response.blob()
}

const stream = (path: string) => new WebSocket(new URL(path, WS_URL))

export const api = {
  get,
  post,
  delete: del,
  download,
  upload,
  stream,
}
