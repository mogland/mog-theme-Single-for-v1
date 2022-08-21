/*
 * @FilePath: /nx-theme-Single/components/Markdown/TOC.tsx
 * @author: Wibus
 * @Date: 2022-08-21 21:33:47
 * @LastEditors: Wibus
 * @LastEditTime: 2022-08-21 22:03:07
 * Coding With IU
 */

import { FC, useEffect } from "react";

export const TOC: FC<any> = ({ headings }) => {

  useEffect(() => {
    document.body.classList.add("has-trees");
    return () => {
      document.body.classList.remove("has-trees");
    }
  }, [])

  useEffect(() => {
    const ele = document.createElement("a")
    ele.classList.add("toggle-list")
    ele.onclick = () => {
      document.querySelector(".article-list")?.classList.toggle("active")
    }
    document.querySelector(".buttons")?.appendChild(ele)
    return () => {
      document.querySelector(".article-list")?.classList.toggle("active")
      document.querySelector(".buttons")?.removeChild(ele)
    }
  })

  return (
    <section className="article-list">
        <h4>
          <span className="title">目录</span>
        </h4>
        {
          headings && headings.map((item, index) => {
            return (
              <a href={`#${item.textContent}`} key={index}>{item.textContent}</a>
            )
          })
        }
      </section>
  )
}

export default TOC;