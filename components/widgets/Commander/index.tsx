/*
 * @FilePath: /nx-theme-Single/components/widgets/Commander/index.tsx
 * @author: Wibus
 * @Date: 2022-08-19 11:38:19
 * @LastEditors: Wibus
 * @LastEditTime: 2022-08-19 21:41:10
 * Coding With IU
 */

import { FC, useEffect, useRef, useState } from "react";
import { Command } from "cmdk";
import { Item } from "./Item";
import { RaycastLightIcon } from "./icon";
import { SubCommand } from "./Sub";
import { DarkMode } from "@icon-park/react";
import { useSnapshot } from "valtio";
import appState from "../../../states/appState";
import Link from "next/link";
import { CommanderItemType } from "./type";
import Router from "next/router";
import { message } from "react-message-popup";

export const Commander: FC = () => {
  // const { resolvedTheme: theme } = useTheme()
  const [value, setValue] = useState('toggle website appearence')
  const inputRef = useRef<HTMLInputElement | null>(null)
  const listRef = useRef(null)

  useEffect(() => {
    inputRef?.current?.focus()
  }, [])

  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.keyCode === 112) {
        setOpen((open) => !open)
      }
      // 如果按下 command + J
      if (e.keyCode === 75 && e.metaKey || e.keyCode === 75 && e.ctrlKey) {
        setOpen((open) => !open)
      }
      if (e.keyCode === 27) {
        setOpen(false)
      }
      // // 按下 enter 键，执行命令
      if (e.keyCode === 13) {
        // message.info(`执行命令：${value}`)
        if (value === CommanderItemType.THEME){
          document.body.classList.toggle('dark-theme');
        }
        if (value.includes(CommanderItemType.POSTS)){
          Router.push(value)
        }
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
      }}>
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
              Toggle Website Appearence
            </Command.Item>

          </Command.Group>

          {/* <Command.Group heading="Resently Posts">
            {
              appStateSnapshot.aggregate.aggregatedTop?.posts?.map((item: any, index: number) => {
                return <Command.Item value={`${CommanderItemType.POSTS}/${item.category.slug}/${item.slug}`} key={item.id} id={item.id}>
                  {item.title}
                </Command.Item>
              })
            }

          </Command.Group> */}
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