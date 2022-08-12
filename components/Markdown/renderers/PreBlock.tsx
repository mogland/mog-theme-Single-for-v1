/*
 * @FilePath: /nx-theme-tiny/components/Markdown/renderers/PreBlock.tsx
 * @author: Wibus
 * @Date: 2022-08-08 20:28:59
 * @LastEditors: Wibus
 * @LastEditTime: 2022-08-08 20:30:34
 * Coding With IU
 */

export const PreBlock = ({ node, inline, className, children, ...props }) => {
  return <pre className="not-prose" {...props} style={{
    background: "rgb(29, 31, 33)",
  }}>
    {children}
  </pre>

}