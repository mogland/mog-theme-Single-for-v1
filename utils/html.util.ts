/*
 * @FilePath: /nx-theme-tiny/utils/html.util.ts
 * @author: Wibus
 * @Date: 2022-08-08 17:17:35
 * @LastEditors: Wibus
 * @LastEditTime: 2022-08-08 17:17:35
 * Coding With IU
 */
export const escapeHTMLTag = (html: string) => {
  const lt = /</g,
    gt = />/g,
    ap = /'/g,
    ic = /"/g
  return html
    .toString()
    .replace(lt, '&lt;')
    .replace(gt, '&gt;')
    .replace(ap, '&#39;')
    .replace(ic, '&#34;')
}