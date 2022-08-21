/*
 * @FilePath: /nx-theme-Single/components/widgets/Commander/index.tsx
 * @author: Wibus
 * @Date: 2022-08-19 11:38:19
 * @LastEditors: Wibus
 * @LastEditTime: 2022-08-21 22:16:40
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

export const Commander: FC = () => {

  const [value, setValue] = useState('toggle website appearence')
  const inputRef = useRef<HTMLInputElement | null>(null)
  const listRef = useRef(null)

  useEffect(() => {
    inputRef?.current?.focus()
  }, [])

  const [open, setOpen] = useState(false)

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
        setOpen((open) => !open)
      }
      if (e.keyCode === 75 && e.metaKey || e.keyCode === 75 && e.ctrlKey) {
        setOpen((open) => !open)
      }
      if (e.keyCode === 27) {
        setOpen(false)
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  const appStateSnapshot = useSnapshot(appState) as any

  const valueChangeHandle = (v) => {
    setValue(v)
    console.log(value)
  }

  return (
    <div className="raycast">
      <Command.Dialog open={open} onOpenChange={setOpen} value={value} onValueChange={(v) => {
        valueChangeHandle(v)
      }}
        onKeyDownCapture={(e) => {
          if (e.keyCode === 13) {
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
        <Command.Input ref={inputRef} autoFocus placeholder="Search for apps and commands..." />
        <hr cmdk-raycast-loader="" />
        <Command.List ref={listRef}>
          <Command.Empty>No results found.</Command.Empty>

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