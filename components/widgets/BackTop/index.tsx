/*
 * @FilePath: /nx-theme-tiny/components/widgets/BackTop/index.tsx
 * @author: Wibus
 * @Date: 2022-08-08 15:26:36
 * @LastEditors: Wibus
 * @LastEditTime: 2022-08-09 13:19:39
 * Coding With IU
 */

import { FC, useState } from "react";
import { isClientSide } from "../../../utils/ssr.util";


export const BackTop: FC = () => {

  const [scrollTop, setScrollTop] = useState(0);

  if (isClientSide()) {
    window.addEventListener("scroll", () => {
      setScrollTop(window.scrollY);
    });
  }

  return (
    <div className="fixed flex-col hidden gap-3 right-8 bottom-8 md:flex">
      <button aria-label="Scroll To Top" type="button" className="p-2 text-gray-500 transition-all bg-gray-200 rounded-full dark:text-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 hover:bg-gray-300"
        style={{
            opacity: isClientSide() && scrollTop > 10 ? 1 : 0,
        }}
        onClick={() => {
          // 平滑移动到顶部
          window.scroll({
            top: 0,
            left: 0,
            behavior: "smooth"
          });
        }}
      >
        <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
      </button>
    </div>
  )
}