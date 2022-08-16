/*
 * @FilePath: /nx-theme-tiny/states/appState.ts
 * @author: Wibus
 * @Date: 2022-08-07 21:55:47
 * @LastEditors: Wibus
 * @LastEditTime: 2022-08-09 14:43:31
 * Coding With IU
 */

import { proxy } from "valtio";


const appState = proxy({
  request: {
    ip: "",
    userAgent: "",
  },
  aggregate: {},
})

export default appState