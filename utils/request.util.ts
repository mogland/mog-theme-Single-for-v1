import { $fetch } from "ohmyfetch";
import { message } from "react-message-popup";
import Package from '../package.json'
import appState from "../states/appState";

/**
 * @description 封装请求方法
 */
export const apiClient = $fetch.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  retry: 3,
  async onRequestError({ error }) {
    console.log('[fetch request error]', error)
    message.error(`[Fetch 请求错误] ${error}`)
  },
  async onResponseError({ error }) {
    console.log('[fetch response error]', error)
    message.error(`[Fetch 返回错误] ${error}`)
  },
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    // 'Authorization': `Bearer ${localStorage.getItem('token')}`,
    'x-forwarded-for': appState.request.ip,
    "User-Agent": `${appState.request.userAgent} NextJS/v${Package.dependencies.next} NEXT-Theme-Tiny/${Package.version}` || '',
  },
})