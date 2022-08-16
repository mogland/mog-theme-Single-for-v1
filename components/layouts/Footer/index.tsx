/*
 * @FilePath: /nx-theme-Single/components/layouts/Footer/index.tsx
 * @author: Wibus
 * @Date: 2022-08-08 14:51:52
 * @LastEditors: Wibus
 * @LastEditTime: 2022-08-16 22:17:54
 * Coding With IU
 */


import Link from "next/link";
import { FC } from "react";
import { useSnapshot } from "valtio";
import appState from "../../../states/appState";


export const Footer: FC = () => {

  const aggregateSnapshot = ((useSnapshot(appState)).aggregate as any)
  console.log(aggregateSnapshot.aggregatedTop.comments)

  return (
    <footer>
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
                        <li>
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
                    aggregateSnapshot.aggregatedTop.comments.length && aggregateSnapshot.aggregatedTop.comments?.map((item: any) => {
                      return (
                        <li>
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
    </footer>
  )
}