/*
 * @FilePath: /nx-theme-Single/components/Markdown/index.tsx
 * @author: Wibus
 * @Date: 2022-08-08 16:01:35
 * @LastEditors: Wibus
 * @LastEditTime: 2022-08-21 22:02:28
 * Coding With IU
 */


import React, { FC, memo, RefObject, useEffect, useRef, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import images from '../../states/images.state'
import { isClientSide } from '../../utils/ssr.util'
import { PreBlock } from './renderers/PreBlock'
import { ensuredForwardRef } from 'react-use'
import dynamic from 'next/dynamic'
import { processDetails } from './process-tag'
import range from 'lodash-es/range'
import Heading from './renderers/Header'

const TOC = dynamic(() => import('./TOC'), { ssr: false })

const Image = dynamic(() => import("./renderers/Image"), {
  ssr: false,
})

const CodeBlock = dynamic(() => import("./renderers/CodeBlock"), {
  ssr: false,
})


type MarkdownProps = {
  source: string
  [key: string]: any
  children?: string
  toc?: boolean
}

const __Markdown: FC<MarkdownProps> = ensuredForwardRef<HTMLDivElement, MarkdownProps>(
  (props: React.PropsWithChildren<MarkdownProps>) => {

    props.images ? images.data = props.images : null

    const [components, setComponents] = useState({})

    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
      const _ = ref as RefObject<HTMLElement>
      if (!_.current) {
        return
      }
      const $ = _.current as HTMLElement
      //  process raw html tag
      processDetails($)
    }, [ref])

    const [headings, setHeadings] = useState<HTMLElement[]>([])

    useEffect(() => {
      const _ = ref as RefObject<HTMLElement>
      if (!_.current) {
        return
      }
      const $ = _.current
      // FIXME: 可能存在 memory leak

      setHeadings(
        Array.from(
          $.querySelectorAll(
            range(0, 6)
              .map((i) => `h${i}`)
              .join(', '),
          ),
        ),
      )
    }, [ref, props.source])

    const setComponentHandle = async () => {
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
    }

    useEffect(() => {
      setComponentHandle()
    }, [])

    return (
      <>
        <article className="post-content">
          <div id='write' ref={ref}>
            <ReactMarkdown
              remarkPlugins={[
                gfm,
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
        </article>
        {
          props.toc && <TOC headings={headings} />
        }
      </>
    )
  })

export const Markdown = memo(__Markdown)
Markdown.displayName = 'Markdown'
export default Markdown