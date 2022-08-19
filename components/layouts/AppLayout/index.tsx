/*
 * @FilePath: /nx-theme-Single/components/layouts/AppLayout/index.tsx
 * @author: Wibus
 * @Date: 2022-08-19 22:50:22
 * @LastEditors: Wibus
 * @LastEditTime: 2022-08-19 22:57:22
 * Coding With IU
 */

import dynamic from "next/dynamic";
import Link from "next/link";
import React, { FC } from "react";
import { useSnapshot } from "valtio";
import appState from "../../../states/appState";

const Commander = dynamic(() => import("../../widgets/Commander"), {
  ssr: false
})

export const AppLayout: FC<React.PropsWithChildren> = ({ children }) => {

  const aggregateSnapshot = ((useSnapshot(appState)).aggregate as any)

  return (
    <>
      <header>
        <div className="head-title">
          <h4>
            {aggregateSnapshot.aggregatedData.sites.title}
          </h4>
        </div>
        <div className="head-action">
          <div className="toggle-btn" onClick={() => {
            document.querySelector(".head-menu")?.classList.toggle("active")
          }}></div>
          <div className="light-btn" onClick={() => {
            document.body.classList.toggle('dark-theme');
            document.body.classList.toggle('light-theme');
          }}></div>
          <div className="search-btn hidden"></div>
        </div>
        <form className="head-search" method="post">
          <input type="text" name="s" placeholder="搜索什么？" />
        </form>
        <nav className="head-menu">
          <Link href="/">
            <span>首页</span>
          </Link>
          <div className="has-child">
            <a>分类</a>
            <div className="sub-menu">
              {
                aggregateSnapshot.aggregatedData.categories.map((item: any) => {
                  return (
                    <Link href={`/category/${item.slug}`} key={item.id}>
                      <span>{item.name}</span>
                    </Link>
                  )
                })
              }
            </div>
          </div>
          {
            aggregateSnapshot.aggregatedData.page_meta?.map((item: any) => {
              return (
                <Link href={`/${item.slug}`} key={item.id}>
                  <span>{item.title}</span>
                </Link>
              )
            })
          }
        </nav>
      </header>
      <main>
        <div className="wrap min">
          {children}
        </div>
      </main>
      <Commander />
      <footer>
        <div className="buttons">
          <a className="to-top" href="#"></a>
        </div>
        <div className="wrap min">
          <section className="widget">
            <div className="row">
              <div className="col-m-4">
                <h3 className="title-recent">最新文章：</h3>
                <ul>
                  {
                    aggregateSnapshot.aggregatedTop.posts?.map((item: any) => {
                      return (
                        <li key={item.id}>
                          <Link href={`/posts/${item.slug}`}>
                            <span>{item.title}</span>
                          </Link>
                        </li>
                      )
                    })
                  }
                </ul>
              </div>
              {/* <div className="col-m-4">
                <h3 className="title-date">标签云：</h3>

              </div> */}
              <div className="col-m-8">
                <h3 className="title-comments">最近评论：</h3>
                <ul>
                  {
                    aggregateSnapshot.resentlyComments.data?.length && aggregateSnapshot.resentlyComments.data.map((item: any) => {
                      return (
                        <li key={item.id}>
                          <Link href={`/posts/${item.slug}`}>
                            <span>{item.author}: </span>
                            <span>{item.text}</span>
                          </Link>
                        </li>
                      )
                    }) || (
                      <li>
                        <span>暂无评论</span>
                      </li>
                    )
                  }
                </ul>
              </div>
            </div>
          </section>
          <section className="sub-footer">

          </section>
        </div>
      </footer>
    </>
  )

}

export default AppLayout;