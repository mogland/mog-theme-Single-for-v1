/*
 * @FilePath: /nx-theme-Single/components/Markdown/index.tsx
 * @author: Wibus
 * @Date: 2022-08-08 16:01:35
 * @LastEditors: Wibus
 * @LastEditTime: 2022-08-17 22:37:58
 * Coding With IU
 */


import React, { FC, memo, RefObject, useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import rehypeKatex from 'rehype-katex'
import gfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import images from '../../states/images.state'
import { isClientSide } from '../../utils/ssr.util'
import { CodeBlock } from './renderers/CodeBlock'
import { Image } from './renderers/Image'
import { PreBlock } from './renderers/PreBlock'
import { Heading } from './renderers/Header'
import { range } from 'lodash'
import { ensuredForwardRef } from 'react-use'
import { observer } from 'mobx-react-lite'
import { processDetails } from './process-tag'

type MarkdownProps = {
  source: string
  [key: string]: any
  children?: string
}

const __Markdown: FC<MarkdownProps> = ensuredForwardRef<HTMLDivElement, MarkdownProps>(
  (props: React.PropsWithChildren<MarkdownProps>, ref: React.ForwardedRef<HTMLDivElement>) => {

  props.images ? images.data = props.images : null

  const [components, setComponents] = useState({})

  useEffect(() => {
    setComponents({
      'img': Image,
      'pre': PreBlock,
      'code': CodeBlock,
      "h1": Heading(),
      "h2": Heading(),
      "h3": Heading(),
      "h4": Heading(),
      "h5": Heading(),
      "h6": Heading(),
    })
  }, [])

  return (
    <div id='write'>
      <ReactMarkdown
        remarkPlugins={[
          gfm,
          rehypeKatex,
        ]}
        rehypePlugins={[
          rehypeRaw,
        ]}
        components={isClientSide() && components || {}}
      // render html
      >
        {props.source}
      </ReactMarkdown>
    </div>
  )
})

export const Markdown = memo(__Markdown)
Markdown.displayName = 'Markdown'
export default Markdown