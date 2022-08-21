/*
 * @FilePath: /nx-theme-Single/components/Markdown/renderers/Image.tsx
 * @author: Wibus
 * @Date: 2022-08-08 17:26:47
 * @LastEditors: Wibus
 * @LastEditTime: 2022-08-21 21:00:23
 * Coding With IU
 */
import { observer } from 'mobx-react-lite'
import type { FC } from 'react'
import React, {useEffect, useRef, useState } from 'react'
import { useSnapshot } from 'valtio'
import images from '../../../states/images.state'
import { calculateDimensions } from '../../../utils/images.util'
import { isClientSide } from '../../../utils/ssr.util'
import { ImageLazyRef, ImageLazy } from '../../widgets/Image'

const getContainerSize = () => {
  const $wrap = document.getElementById('write')
  if (!$wrap) {
    return
  }

  return $wrap.getBoundingClientRect().width
}

/**
 * This Component only can render in browser.
 */
const _Image: FC<{ src: string; alt?: string }> = observer(({ src, alt }) => {

  const imageRef = useRef<ImageLazyRef>(null)
  useEffect(() => {
    const disposer = () => {
      if (imageRef.current?.status === 'loaded') {
        disposer()

        return
      }
      setMaxWidth(getContainerSize())
    }

    return () => {
      disposer()
    }
  }, [])
  const imagesSnapshow = useSnapshot(images)

  const [maxWidth, setMaxWidth] = useState(getContainerSize())

  // 因为有动画开始不能获取到大小 , 直到获取到 container 的大小
  useEffect(() => {
    let raf = requestAnimationFrame(function a() {
      const size = getContainerSize()
      if (!size) {
        requestAnimationFrame(a)
      } else {
        setMaxWidth(size)
      }
    }) as any
    return () => {
      raf = cancelAnimationFrame(raf)
    }
  }, [])

  function findImage(src: string) {
    return (imagesSnapshow.data as any).find(item => item.src === src)
  }

  const { accent, height, width } = findImage(src) || {
    height: undefined,
    width: undefined,
  }

  const max = {
    width: maxWidth ?? 644,
    height: Infinity,
  }

  let cal = {} as any
  if (width && height) {
    cal = calculateDimensions(width, height, max)
  }

  return (
    <ImageLazy
      popup
      ref={imageRef}
      src={src}
      alt={alt || src}
      backgroundColor={accent}
      height={cal.height}
      width={cal.width}
      style={style}
      data-raw-height={height}
      data-raw-width={width}
      overflowHidden
    />
  )
})
const style = { padding: '1rem 0' }
export const Image: FC<any> = (props) => {
  const { src, alt } = props
  const isClient = isClientSide()
  return !isClient ? <img src={src} alt={alt} /> : <_Image {...props} />
}

export default Image