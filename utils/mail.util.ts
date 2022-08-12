/*
 * @FilePath: /nx-theme-tiny/utils/mail.util.ts
 * @author: Wibus
 * @Date: 2022-08-08 22:52:18
 * @LastEditors: Wibus
 * @LastEditTime: 2022-08-08 22:53:35
 * Coding With IU
 */

export const mailAvatar = (mail: string) => {
  // md5 加密 mail
  const md5 = require("crypto").createHash("md5").update(mail).digest("hex");
  return `https://cravatar.cn/avatar/${md5}`;
}