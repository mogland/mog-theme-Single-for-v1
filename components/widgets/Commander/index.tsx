/*
 * @FilePath: /nx-theme-Single/components/widgets/Commander/index.tsx
 * @author: Wibus
 * @Date: 2022-08-19 11:38:19
 * @LastEditors: Wibus
 * @LastEditTime: 2022-08-19 11:49:46
 * Coding With IU
 */

import { FC, useEffect, useState } from "react";
import { Command } from "cmdk";


export const Commander: FC = () => {
  const [open, setOpen] = useState(false)


  useEffect(() => {
    const down = (e) => {
      if (e.key === 'k' && e.metaKey) {
        setOpen((open) => !open)
      }
    }
    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  return (
    <Command.Dialog label="Global Command Menu">
      <Command.Input />
      <Command.List>
        <Command.Empty>No results found.</Command.Empty>

        <Command.Group heading="Letters">
          <Command.Item>a</Command.Item>
          <Command.Item>b</Command.Item>
          <Command.Separator />
          <Command.Item>c</Command.Item>
        </Command.Group>

        <Command.Item>Apple</Command.Item>
      </Command.List>
    </Command.Dialog>
  )
}