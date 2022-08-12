/*
 * @FilePath: /nx-theme-tiny/components/Markdown/renderers/CodeBlock.tsx
 * @author: Wibus
 * @Date: 2022-08-08 16:57:22
 * @LastEditors: Wibus
 * @LastEditTime: 2022-08-08 19:36:34
 * Coding With IU
 */
import { Prism } from 'react-syntax-highlighter'
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'



export const CodeBlock = ({ node, inline, className, children, ...props }) => {
  const match = /language-(\w+)/.exec(className || '')
  return !inline && match ? (
    <Prism
      children={String(children).replace(/\n$/, '')}
      style={atomDark}
      language={match[1]}
      PreTag={'div'}
      CodeTag={'code'}
      {...props}
    />
  ) : (
    <code className={className} {...props}>
      {children}
    </code>
  )

}