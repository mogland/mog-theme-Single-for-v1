/*
 * @FilePath: /nx-theme-Single/components/widgets/Commander/Item.tsx
 * @author: Wibus
 * @Date: 2022-08-19 13:15:42
 * @LastEditors: Wibus
 * @LastEditTime: 2022-08-19 13:15:42
 * Coding With IU
 */

import { Command } from "cmdk"

export function Item({
  children,
  value,
  isCommand = false,
}: {
  children: React.ReactNode
  value: string
  isCommand?: boolean
}) {
  return (
    <Command.Item value={value} onSelect={() => {}}>
      {children}
      <span cmdk-raycast-meta="">{isCommand ? 'Command' : 'Application'}</span>
    </Command.Item>
  )
}
