/*
 * @FilePath: /nx-theme-tiny/utils/ssr.util.ts
 * @author: Wibus
 * @Date: 2022-08-07 21:23:02
 * @LastEditors: Wibus
 * @LastEditTime: 2022-08-07 21:23:03
 * Coding With IU
 */
export const isClientSide = () => {
  return typeof window !== 'undefined'
}
export const isServerSide = () => {
  return !isClientSide()
}