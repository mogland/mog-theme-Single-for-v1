/*
 * @FilePath: /nx-theme-tiny/components/layouts/Footer/index.tsx
 * @author: Wibus
 * @Date: 2022-08-08 14:51:52
 * @LastEditors: Wibus
 * @LastEditTime: 2022-08-11 23:03:25
 * Coding With IU
 */


import { FC } from "react";
import { useSnapshot } from "valtio";
import appState from "../../../states/appState";


export const Footer: FC = () => {

  const aggregateSnapshot = ((useSnapshot(appState)).aggregate as any)

  return (
    <footer>
      <div className="flex flex-col items-center mt-16">
        <div className="flex mb-3 space-x-4"></div>
        <div className="flex mb-2 space-x-2 text-sm text-gray-500 dark:text-gray-400">
          {aggregateSnapshot.aggregatedData.user.name} • © {new Date().getFullYear()} • {aggregateSnapshot.aggregatedData.sites.title}
        </div>
        <div className="mb-2 text-sm text-gray-500 dark:text-gray-400">
          {aggregateSnapshot.aggregatedData.sites.description}
        </div>
        <div className="mb-8 text-sm text-gray-500 dark:text-gray-400">
          Power By <strong><a href="https://nx.js.org">NEXT</a></strong>
        </div>
      </div>
    </footer>
  )
}