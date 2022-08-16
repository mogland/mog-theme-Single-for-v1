/*
 * @FilePath: /nx-theme-Single/components/layouts/Header/index.tsx
 * @author: Wibus
 * @Date: 2022-08-08 12:28:09
 * @LastEditors: Wibus
 * @LastEditTime: 2022-08-16 21:15:04
 * Coding With IU
 */

import { FC } from "react";
import { useSnapshot } from "valtio";
import appState from "../../../states/appState";
import Link from "next/link";

export const Header: FC<any> = () => {


  // const [isOpen, setIsOpen] = useState(false);

  const aggregateSnapshot = ((useSnapshot(appState)).aggregate as any)

  return (
    <header>
      <div className="head-title">
        <h4>
          {aggregateSnapshot.aggregatedData.sites.title}
        </h4>
      </div>
      <div className="head-action">
        <div className="toggle-btn"></div>
        <div className="light-btn"></div>
        <div className="search-btn"></div>
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
  );
}