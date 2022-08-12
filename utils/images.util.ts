/*
 * @FilePath: /nx-theme-tiny/utils/images.util.ts
 * @author: Wibus
 * @Date: 2022-08-08 17:19:31
 * @LastEditors: Wibus
 * @LastEditTime: 2022-08-08 17:19:31
 * Coding With IU
 */

export const calculateDimensions = (
  width: number,
  height: number,
  max: { width: number; height: number },
) => {
  const { height: maxHeight, width: maxWidth } = max
  const wRatio = maxWidth / width
  const hRatio = maxHeight / height
  let ratio = 1
  if (maxWidth == Infinity && maxHeight == Infinity) {
    ratio = 1
  } else if (maxWidth == Infinity) {
    if (hRatio < 1) ratio = hRatio
  } else if (maxHeight == Infinity) {
    if (wRatio < 1) ratio = wRatio
  } else if (wRatio < 1 || hRatio < 1) {
    ratio = wRatio <= hRatio ? wRatio : hRatio
  }
  if (ratio < 1) {
    return {
      width: width * ratio,
      height: height * ratio,
    }
  }
  return {
    width,
    height,
  }
}