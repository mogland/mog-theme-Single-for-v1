import '../styles/kico.css'
import '../styles/globals.css'
import type { AppContext } from 'next/app'
import { Router } from 'next/router'
import { useCallback, useEffect } from 'react'
import { message } from 'react-message-popup'
import QP from 'qier-progress'
import { apiClient } from '../utils/request.util'
import appState from '../states/appState'
import NextApp from 'next/app'
import { Header } from '../components/layouts/Header'
import { Footer } from '../components/layouts/Footer'
function App({ initialData, Component, pageProps }) {

  const Progress = new QP({ colorful: false, color: '#27ae60' })
  const registerRouterEvents = useCallback(() => {
    Router.events.on('routeChangeStart', () => {
      // animation('out')

      Progress.start()
      // window.scrollTo({ top: 0, behavior: 'smooth' })
      history.backPath = history.backPath
        ? [...history.backPath, history.state.as]
        : [history.state.as]
    })

    Router.events.on('routeChangeComplete', () => {
      // animation('in')
      Progress.finish()
    })

    Router.events.on('routeChangeError', () => {
      // animation('in')
      history.backPath?.pop()
      Progress.finish()
      message.error('出现了未知错误, 刷新试试?')
    })
  }, [])

  useEffect(() => {
    try {
      registerRouterEvents()
    } finally {
      document.body.classList.remove('loading')
    }
  }, [])

  appState.aggregate = initialData

  return (
    <>
      <Header />
      <main>
        <div className="wrap min">
          <Component {...pageProps} />
        </div>
      </main>
    </>
  )
}

// @ts-ignore
App.getInitialProps = async (props: AppContext) => {
  const ctx = props.ctx
  const request = ctx.req
  // if (request && isServerSide()) {

  // 在原有的请求器基础上继续配置请求器
  let ip =
    ((request?.headers['x-forwarded-for'] ||
      request?.headers['X-Forwarded-For'] ||
      request?.headers['X-Real-IP'] ||
      request?.headers['x-real-ip'] ||
      request?.connection.remoteAddress ||
      request?.socket.remoteAddress) as string) || undefined
  if (ip && ip.split(',').length > 0) {
    ip = ip.split(',')[0]
  }
  if (ip) {
    appState.request.ip = ip
    appState.request.userAgent = request?.headers['user-agent'] || ''
  }

  // 获取数据
  // eslint-disable-next-line no-inner-declarations
  async function getHeadinitialData() {
    const aggregatedData = await apiClient("/aggregate")
    const aggregatedTop = await apiClient("/aggregate/top")
    const res = {
      aggregatedData,
      aggregatedTop,
    }
    return res
  }
  const initialData = globalThis.data ?? (await getHeadinitialData())
  const appProps = await (async () => {
    try {
      return await NextApp.getInitialProps(props)
    } catch (error) {

      if (!initialData) {
        throw error
      }

      if (ctx.res) {
        ctx.res.statusCode = 466
        ctx.res.statusMessage = '服务器错误, 无数据'
      }
      return null
    }
  })()


  return {
    ...appProps,
    initialData,
  }

}

export default App
