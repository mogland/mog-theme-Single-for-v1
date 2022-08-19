/*
 * @FilePath: /nx-theme-Single/components/widgets/LinksSender/index.tsx
 * @author: Wibus
 * @Date: 2022-08-09 12:52:53
 * @LastEditors: Wibus
 * @LastEditTime: 2022-08-19 23:14:52
 * Coding With IU
 */
/*
 * @FilePath: /nx-theme-tiny/components/widgets/Comments/index.tsx
 * @author: Wibus
 * @Date: 2022-08-08 18:14:29
 * @LastEditors: Wibus
 * @LastEditTime: 2022-08-09 12:52:20
 * Coding With IU
 */

import { FC, useState } from "react";
import styles from './index.module.css'
import clsx from "clsx";
import { apiClient } from "../../../utils/request.util";
import { useMount } from "react-use";
import { message } from "react-message-popup";
import { isClientSide } from "../../../utils/ssr.util";

export const LinksSender: FC<any> = () => {

  const [link, setLink] = useState<any>({
    types: "Friend",
    author: "",
    mail: "",

    name: "",
    avatar: "",
    url: "",
    description: "",

    rssType: "",
    rss: "",
  });


  useMount(() => {
    isClientSide() && setLink({
      ...link,
      "author": (JSON.parse(localStorage.getItem('guest-message') || '{}')).author,
      "mail": (JSON.parse(localStorage.getItem('guest-message') || '{}')).mail,
      "url": (JSON.parse(localStorage.getItem('guest-message') || '{}')).url,
    })
  })



  return (
    <div className="pt-6 pb-6 text-center text-gray-700 dark:text-gray-300 ml-0">
      <div className={clsx(styles["comments"])}>
        <div className="items-center flex flex-auto">
          <div className="flex-wrap whitespace-nowrap items-center flex flex-auto">
            <h4 className="font-semibold">Apply For Links</h4>
          </div>
        </div>

        <form action="post" className={clsx(styles['form'])} onSubmit={async (e) => {
          e.preventDefault()
          localStorage.setItem("guest-message", JSON.stringify({
            "author": link.author,
            "mail": link.mail,
            "url": link.url,
          }))
          await apiClient(`/links/apply`, {
            method: "POST",
            body: JSON.stringify(link)
          }).then(() => {
            message.info("申请成功，等待审核中...")
          }).catch((err) => {
            message.error(`申请失败`)
          })
        }}>
          <div className={clsx(styles["boxMain"])}>
            <div className="p-3 pb-4">
              <label className="mr-5 text-gray-700 dark:text-gray-300 font-semibold">
                您的名字
              </label>
              <input type="text" style={{backgroundColor: "inherit"}} placeholder="Name" className="focus:outline-none" name="author"
                value={link.author as any}
                onChange={(e) => {
                  setLink({
                    ...link,
                    author: e.target.value
                  })
                }}
              />
              <label className="ml-5 mr-5 text-gray-700 dark:text-gray-300 font-semibold">
                您的邮箱
              </label>
              <input type="text" style={{backgroundColor: "inherit"}} placeholder="Mail" className="focus:outline-none"
                name="mail"
                value={link.mail as any}
                onChange={(e) => {
                  setLink({
                    ...link,
                    mail: e.target.value
                  })
                }}
              />
              {/* 站点图标 */}
              <label className="ml-5 mr-5 text-gray-700 dark:text-gray-300 font-semibold">
                站点图标
              </label>
              <input type="text" style={{backgroundColor: "inherit"}} placeholder="avatar" className="focus:outline-none"
                name="avatar"
                value={link.avatar as any}
                onChange={(e) => {
                  setLink({
                    ...link,
                    avatar: e.target.value
                  })
                }
                }
              />


            </div>
            <div className="p-3 pb-4">
              <label className=" mr-5 text-gray-700 dark:text-gray-300 font-semibold">
                站点名称
              </label>
              <input type="text" style={{backgroundColor: "inherit"}} placeholder="Name" className="focus:outline-none"
                name="name"
                value={link.name as any}
                onChange={(e) => {
                  setLink({
                    ...link,
                    name: e.target.value
                  })
                }
                }
              />

              <label className="mr-5 ml-5 text-gray-700 dark:text-gray-300 font-semibold">
                站点地址
              </label>
              <input type="text" style={{backgroundColor: "inherit"}} placeholder="Url (optional)" className="focus:outline-none"
                name="url"
                value={link.url as any}
                onChange={(e) => {
                  setLink({
                    ...link,
                    url: e.target.value
                  })
                }}
              />
            </div>
            <div className="p-3 pb-4">
              <div className="mb-5">
                <label className="mr-5 text-gray-700 dark:text-gray-300 font-semibold">
                  RSS 订阅地址
                </label>
                <input type="text" style={{backgroundColor: "inherit", width: "400px"}} placeholder="Rss Link (optional)" className="focus:outline-none"
                  name="rss"
                  value={link.rss as any}
                  onChange={(e) => {
                    setLink({
                      ...link,
                      rss: e.target.value
                    })
                  }
                  }
                />
              </div>
              <div>
                <label className=" text-gray-700 dark:text-gray-300 font-semibold mr-5">
                  RSS 订阅类型 (填写 atom 或 rss)
                </label>
                <input type="text" style={{backgroundColor: "inherit"}} placeholder="Rss Type (optional)" className="focus:outline-none"
                  name="rssType"
                  value={link.rssType as any}
                  onChange={(e) => {
                    setLink({
                      ...link,
                      rssType: e.target.value
                    })
                  }
                  }
                />
              </div>
            </div>
            <hr />
            <label className="mt-5 mb-5 ml-3 block text-gray-700 dark:text-gray-300 font-semibold">
              站点描述
            </label>
            <textarea id="" placeholder="Website description" className={clsx(styles["textarea"])}
              name="text"
              value={link.text as any}
              onChange={(e) => {
                setLink({
                  ...link,
                  description: e.target.value
                })
              }}
            ></textarea>
          </div>
          <div className={clsx(styles["submitBtn"])}>

            <div className={clsx(styles.submit)}>

              {
                (link) && (
                  <button className={clsx(styles.submitInner)} type="button"
                    style={{
                      backgroundColor: "inherit",
                      color: "inherit"
                    }}
                    onClick={() => {
                      setLink({
                        types: "Friend",
                        author: "",
                        mail: "",

                        name: "",
                        url: "",
                        description: "",

                        rssType: "",
                        rss: "",
                      })
                    }}
                  >
                    Cancel
                  </button>
                )
              }

              <button type="submit" className={clsx(styles.submitInner)}>Apply</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LinksSender