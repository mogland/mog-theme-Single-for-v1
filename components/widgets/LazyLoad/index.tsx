/*
 * @FilePath: /nx-theme-tiny/components/widgets/LazyLoad/index.tsx
 * @author: Wibus
 * @Date: 2022-08-08 17:23:16
 * @LastEditors: Wibus
 * @LastEditTime: 2022-08-08 17:24:53
 * Coding With IU
 */
import type { FC, ReactNode } from 'react'
import React from 'react'
import type { IntersectionOptions } from 'react-intersection-observer'
import { useInView } from 'react-intersection-observer'

export type LazyLoadProps = {
  offset?: number
  placeholder?: React.ReactNode
} & IntersectionOptions
export const LazyLoad: FC<
  { children: ReactNode } & LazyLoadProps
> = (props) => {
  const { placeholder = null, offset = 0, ...rest } = props
  const { ref, inView } = useInView({
    // onChange(inView) {},
    triggerOnce: true,
    rootMargin: `${offset || 0}px`,
    ...rest,
  })
  return <div ref={ref}>{!inView ? placeholder : props.children}</div>
}