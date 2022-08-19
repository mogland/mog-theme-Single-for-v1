/*
 * @FilePath: /nx-theme-Single/components/widgets/Commander/index.tsx
 * @author: Wibus
 * @Date: 2022-08-19 11:38:19
 * @LastEditors: Wibus
 * @LastEditTime: 2022-08-19 14:04:25
 * Coding With IU
 */

import { FC, useEffect, useRef, useState } from "react";
import { Command } from "cmdk";
import { Item } from "./Item";
import { Logo, LinearIcon, FigmaIcon, SlackIcon, YouTubeIcon, RaycastIcon, ClipboardIcon, HammerIcon, RaycastDarkIcon, RaycastLightIcon } from "./icon";
import { SubCommand } from "./Sub";

export const Commander: FC = () => {
  // const { resolvedTheme: theme } = useTheme()
  const [value, setValue] = useState('linear')
  const inputRef = useRef<HTMLInputElement | null>(null)
  const listRef = useRef(null)

  useEffect(() => {
    inputRef?.current?.focus()
  }, [])
  return (
    <div className="raycast">
      <Command value={value} onValueChange={(v) => setValue(v)}>
        <div cmdk-raycast-top-shine="" />
        <Command.Input ref={inputRef} autoFocus placeholder="Search for apps and commands..." />
        <hr cmdk-raycast-loader="" />
        <Command.List ref={listRef}>
          <Command.Empty>No results found.</Command.Empty>
          <Command.Group heading="Suggestions">
            <Item value="Linear">
              <Logo>
                <LinearIcon
                  style={{
                    width: 12,
                    height: 12,
                  }}
                />
              </Logo>
              Linear
            </Item>
            <Item value="Figma">
              <Logo>
                <FigmaIcon />
              </Logo>
              Figma
            </Item>
            <Item value="Slack">
              <Logo>
                <SlackIcon />
              </Logo>
              Slack
            </Item>
            <Item value="YouTube">
              <Logo>
                <YouTubeIcon />
              </Logo>
              YouTube
            </Item>
            <Item value="Raycast">
              <Logo>
                <RaycastIcon />
              </Logo>
              Raycast
            </Item>
          </Command.Group>
          <Command.Group heading="Commands">
            <Item isCommand value="Clipboard History">
              <Logo>
                <ClipboardIcon />
              </Logo>
              Clipboard History
            </Item>
            <Item isCommand value="Import Extension">
              <HammerIcon />
              Import Extension
            </Item>
            <Item isCommand value="Manage Extensions">
              <HammerIcon />
              Manage Extensions
            </Item>
          </Command.Group>
        </Command.List>

        <div cmdk-raycast-footer="">
          <RaycastLightIcon />

          <button cmdk-raycast-open-trigger="">
            Open Application
            <kbd>↵</kbd>
          </button>

          <hr />

          <SubCommand listRef={listRef} selectedValue={value} inputRef={inputRef} />
        </div>
      </Command>
    </div>
  )
}