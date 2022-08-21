/*
 * @FilePath: /nx-theme-Single/components/widgets/Commander/index.tsx
 * @author: Wibus
 * @Date: 2022-08-19 11:38:19
 * @LastEditors: Wibus
 * @LastEditTime: 2022-08-21 23:09:50
 * Coding With IU
 */

import { FC, useCallback, useEffect, useRef, useState } from "react";
import { Command } from "cmdk";
import { RaycastLightIcon } from "./icon";
import { DarkMode } from "@icon-park/react";
import { useSnapshot } from "valtio";
import appState from "../../../states/appState";
import { CommanderItemType } from "./type";
import Router, { Router as RouterType } from "next/router";
import apiClient from "../../../utils/request.util";

export const Commander: FC = () => {

  const appStateSnapshot = useSnapshot(appState) as any
  const [value, setValue] = useState('toggle website appearence')
  const inputRef = useRef<HTMLInputElement | null>(null)
  const listRef = useRef(null)

  useEffect(() => {
    inputRef?.current?.focus()
  }, [])

  const [open, setOpen] = useState(false)
  const [suggestionsLoading, setSuggestionsLoading] = useState(true)

  const registerRouterEvents = useCallback(() => {
    RouterType.events.on('routeChangeStart', () => {
      setOpen(false)
    })
  } , [])

  useEffect(() => {
    registerRouterEvents()
  } , [registerRouterEvents])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.keyCode === 112) {
        e.preventDefault()
        setOpen((open) => !open)
      }
      if (e.keyCode === 75 && e.metaKey || e.keyCode === 75 && e.ctrlKey) {
        e.preventDefault()
        setOpen((open) => !open)
      }
      if (e.keyCode === 27) {
        e.preventDefault()
        setOpen(false)
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  const suggestionsRef = useRef<any>(null)

  useEffect(() => {
    // 对 inputRef 进行监听，当 inputRef 发生变化，停止变化1s后再进行搜索
    const handleInputRefChange = (e: Event) => {
      console.log('inputRef change')
      setTimeout(() => {
        setSuggestionsLoading(true)
        apiClient(`/posts/search?value=${inputRef?.current?.value}`).then(res => {
          const dataEle = document.querySelectorAll('[data-value*=Suggestion]')
          res.data.forEach((item: any, index: number) => {
            const ele = document.createElement('div')
            ele.setAttribute('cmdk-item', '')
            ele.setAttribute('role', 'option')
            ele.setAttribute('data-value', `/posts/${item.category.slug}/${item.slug}`)
            ele.id = `${item.title}`
            ele.innerHTML = `<div class="w-full">${item.title}</div> <div class="w-full text-gray-500">${item.text.substring(0, 20)}</div>`
            suggestionsRef.current?.appendChild(ele)
          })
        })
      }, 1000)
    }
    inputRef?.current?.addEventListener('input', handleInputRefChange)
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      inputRef?.current?.removeEventListener('input', handleInputRefChange)
    }
  }, [])

  return (
    <div className="raycast">
      <Command.Dialog open={open} onOpenChange={setOpen} value={value} onValueChange={(v) => {
        setValue(v)
      }}
        onKeyDownCapture={(e) => {
          if (e.keyCode === 13) {
            e.preventDefault()
            if (value === CommanderItemType.THEME) {
              document.body.classList.toggle('dark-theme');
            }
            if (value.includes(CommanderItemType.POSTS)) {
              Router.push(value)
            }
          }
        }}
      >
        <div cmdk-raycast-top-shine="" />
        <Command.Input ref={inputRef} autoFocus placeholder="Search for apps and commands..." onValueChange={async (v) => {
          console.log('input value change', v)
          await apiClient(`/posts/search?value=${v}`).then(res => {
            const dataEle = document.querySelectorAll('[data-value*=Suggestion]')
            res.data.forEach((item: any, index: number) => {
              const ele = document.createElement('div')
              ele.setAttribute('cmdk-item', '')
              ele.setAttribute('role', 'option')
              ele.setAttribute('data-value', `/posts/${item.category.slug}/${item.slug}`)
              ele.id = `${item.title}`
              ele.innerHTML = `<div class="w-full">${item.title}</div> <div class="w-full text-gray-500">${item.text.substring(0, 20)}</div>`
              dataEle[index]?.parentElement?.replaceChild(ele, dataEle[index])
            })
          })
        }} />
        <hr cmdk-raycast-loader="" />
        <Command.List ref={listRef}>
          <Command.Empty>No results found.</Command.Empty>

          <Command.Group heading="Suggestions" ref={suggestionsRef}>
          </Command.Group>

          <Command.Group heading="Commands">
            <Command.Item value="toggle website appearence" >
              <DarkMode theme="filled"
                style={{
                  marginBottom: 3,
                  marginLeft: 3,
                  width: 15,
                }}
              />
              <span className="w-full"
                onClick={() => {
                  document.body.classList.toggle('dark-theme');
                }}
              >
              Toggle Website Appearence
              </span>
            </Command.Item>

          </Command.Group>

          <Command.Group heading="Resently Posts">
            {
              appStateSnapshot.aggregate.aggregatedTop?.posts?.map((item: any, index: number) => {
                return (
                  <Command.Item
                    value={`${CommanderItemType.POSTS}/${item.category.slug}/${item.slug}`}
                    key={item.id}
                    id={item.id}
                    
                  >
                    <span className="w-full" onClick={() => {
                      Router.push(`${CommanderItemType.POSTS}/${item.category.slug}/${item.slug}`)
                    }}>{item.title}</span>
                  </Command.Item>
                )
              })
            }

          </Command.Group>
        </Command.List>

        <div cmdk-raycast-footer="">
          <RaycastLightIcon />

          <button cmdk-raycast-open-trigger="">
            Run It
            <kbd>↵</kbd>
          </button>

          {/* <hr /> */}

          {/* <SubCommand listRef={listRef} selectedValue={value} inputRef={inputRef} /> */}
        </div>
      </Command.Dialog>
    </div>
  )
}

export default Commander;