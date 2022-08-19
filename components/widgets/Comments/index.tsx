/*
 * @FilePath: /nx-theme-Single/components/widgets/Comments/index.tsx
 * @author: Wibus
 * @Date: 2022-08-08 18:14:29
 * @LastEditors: Wibus
 * @LastEditTime: 2022-08-19 23:08:36
 * Coding With IU
 */

import { FC, useEffect, useState } from "react";
import styles from './index.module.css'
import clsx from "clsx";
import Link from "next/link";
import { apiClient } from "../../../utils/request.util";
import { mailAvatar } from "../../../utils/mail.util";
import { useMount } from "react-use";
import Markdown from "../../Markdown";
import { message } from "react-message-popup";
import { isClientSide } from "../../../utils/ssr.util";

interface ICommentsFC {
  // type 只能填写 post 或 page
  type: 'Post' | 'Page';
  path: String
  id: String
}

interface IReply {
  id: String
  author: String
  text: String
  mail: String
  url: String
  toName: string
  reply: 0 | 1
}

export const Comments: FC<ICommentsFC> = ({ type, path, id }) => {

  const [list, setList] = useState<any>();
  const [reply, setReply] = useState<IReply>({
    id,
    "author": "",
    "text": "",
    "mail": "",
    "url": "",
    "toName": "",
    "reply": 0
  });

  useMount(() => {
    isClientSide() && setReply({
      ...reply,
      "author": (JSON.parse(localStorage.getItem('guest-message') || '{}')).author,
      "mail": (JSON.parse(localStorage.getItem('guest-message') || '{}')).mail,
      "url": (JSON.parse(localStorage.getItem('guest-message') || '{}')).url,
    })
  })

  const getComments = async (props?: number) => {
    return await apiClient(`/comments/ref/${id}?page=${props || 1}`).then(res => {
      setList(res);
      // console.log(res);
      return res
    })
  }

  useEffect(() => {
    getComments();
  }, [])

  const Children = ({ children }) => {
    return (children.length) && (
      <div className={clsx(styles.replyContainer)}>
        <div className="relative">
          <div className={clsx(styles.tlLine)} />
          {
            children.length && children.map((item: any, index: Number) => {
              return (
                <>
                  <div className={clsx("comment-single comment-child")}>
                    <img className="avatar" src={item.mail ? mailAvatar(item.mail) : "https://cravatar.cn/avatar/"} alt={item.author} width={150} height={150} />
                    <div className={clsx("comment-meta")}>
                      <span className="comment-author">
                        <a href={item?.url} rel="external nofollow" target={"_blank"}>{item.author}</a>
                      </span>
                      <time className="comment-time">
                        {item.created.split("T")[0]}
                      </time>
                      <span className="comment-reply" onClick={() => {
                        setReply({
                          ...reply,
                          reply: 1,
                          id: item.id,
                          toName: item.author
                        })
                        // 平滑移动到评论框
                        const comment = document.querySelector(`#comment`)
                        comment?.scrollIntoView({
                          behavior: 'smooth'
                        })
                      }}>
                        <i className="fa fa-reply" title="回复"></i>
                      </span>
                    </div>

                    <div className="comment-content">
                      <Markdown
                        source={item.text}
                      />
                    </div>



                  </div>
                  <Children children={item.children} />
                </>
              )
            })
          }
        </div>
      </div>
    ) || null
  }

  return (
    <div className="pt-6 pb-6 text-center w-full ml-0">
      <div className={clsx(styles["comments"])}>
        <div className="items-center flex flex-auto">
          <div className="flex-wrap whitespace-nowrap items-center flex flex-auto">
            <h4 className="font-semibold">{list?.data.length} comments</h4>
          </div>
        </div>

        <form action="post" className={clsx(styles['form'], "w-full")} onSubmit={async (e) => {
          e.preventDefault()
          localStorage.setItem("guest-message", JSON.stringify({
            "author": reply.author,
            "mail": reply.mail,
            "url": reply.url,
          }))
          // message.info(`/comments${reply.reply ? "/reply" : ""}/${reply.id}`)
          await apiClient(`/comments${reply.reply ? "/reply" : ""}/${reply.id}?ref=${type}`, {
            method: "POST",
            body: JSON.stringify(reply)
          }).then(() => {
            getComments();
            message.success(`${reply.reply ? "回复" : "评论"} 成功`)
            setReply({
              ...reply,
              text: "",
            })
          }).catch((err) => {
            message.error(`${reply.reply ? "回复" : "评论"} 失败`)
          })
        }}>
          <div className={clsx(styles["boxMain"], "md:flex w-full")}>
            <div className="p-3 pb-6">
              <label className="block mb-2 mr-5  font-semibold">
                你的名字
              </label>
              <input type="text" style={{ backgroundColor: "inherit" }} placeholder="Name" className="focus:outline-none mr-5 mb-2  " name="author"
                value={reply.author as any}
                onChange={(e) => {
                  setReply({
                    ...reply,
                    author: e.target.value
                  })
                }}
              />
              <label className="block mb-2 mr-5 w-full  font-semibold">
                你的邮箱
              </label>
              <input type="text" style={{ backgroundColor: "inherit" }} placeholder="Mail" className="focus:outline-none mr-5 mb-2 "
                name="mail"
                value={reply.mail as any}
                onChange={(e) => {
                  setReply({
                    ...reply,
                    mail: e.target.value
                  })
                }}
              />
              <label className="block mb-2 mr-5  font-semibold">
                你的站点
              </label>
              <input type="text" style={{ backgroundColor: "inherit" }} placeholder="Url (optional)" className="focus:outline-none mb-2 "
                name="url"
                value={reply.url as any}
                onChange={(e) => {
                  setReply({
                    ...reply,
                    url: e.target.value
                  })
                }}
              />
            </div>
            <textarea id="" placeholder={reply.toName ? `回复 ${reply.toName}` : "Comment here"} className={clsx(styles["textarea"])}
              name="text"
              value={reply.text as any}
              onChange={(e) => {
                setReply({
                  ...reply,
                  text: e.target.value
                })
              }}
            ></textarea>
          </div>
          <div className={clsx(styles["submitBtn"])}>
            <Link href="https://guides.github.com/features/mastering-markdown/">
              <span className={clsx(styles.markdownSupport)}>
                <svg aria-hidden="true" role="img" className={clsx(styles.supportBtn, "mr-1")} viewBox="0 0 16 16" width="16" height="16" fill="currentColor"><path fillRule="evenodd" d="M14.85 3H1.15C.52 3 0 3.52 0 4.15v7.69C0 12.48.52 13 1.15 13h13.69c.64 0 1.15-.52 1.15-1.15v-7.7C16 3.52 15.48 3 14.85 3zM9 11H7V8L5.5 9.92 4 8v3H2V5h2l1.5 2L7 5h2v6zm2.99.5L9.5 8H11V5h2v3h1.5l-2.51 3.5z"></path></svg>
                Styling with Markdown is supported
              </span>
            </Link>
            <div className={clsx(styles.submit)}>

              {
                (reply.reply || reply.text) && (
                  <button className="btn mr-5" type="button"
                    style={{
                      backgroundColor: "#27a17e63",
                    }}
                    onClick={() => {
                      setReply({
                        ...reply,
                        reply: 0,
                        id,
                        text: "",
                        toName: "",
                      })
                    }}
                  >
                    Cancel
                  </button>
                )
              }

              <button type="submit" className="btn">Submit{
                reply.reply ? " Reply" : ""
              } Comments</button>
            </div>
          </div>
        </form>

        <div className={clsx("comment-list mt-12")}>
          {list && list.data.map((item: any, index: Number) => {
            return (
              <>
                <div className={clsx("comment-single")}>
                  <img className="avatar" src={item.mail ? mailAvatar(item.mail) : "https://cravatar.cn/avatar/"} alt={item.author} width={150} height={150} />
                  <div className={clsx("comment-meta")}>
                    <span className="comment-author">
                      <a href={item?.url} rel="external nofollow" target={"_blank"}>{item.author}</a>
                    </span>
                    <time className="comment-time">
                      {item.created.split("T")[0]}
                    </time>
                    <span className="comment-reply" onClick={() => {
                      setReply({
                        ...reply,
                        reply: 1,
                        id: item.id,
                        toName: item.author
                      })
                      // 平滑移动到评论框
                      const comment = document.querySelector(`#comment`)
                      comment?.scrollIntoView({
                        behavior: 'smooth'
                      })
                    }}>
                      <i className="fa fa-reply" title="回复"></i>
                    </span>
                  </div>

                  <div className="comment-content">
                    <Markdown
                      source={item.text}
                    />
                  </div>
                </div>
                <Children children={item.children} />
              </>
            )
          })}
          {
            list && list.pagination.current_page !== list.pagination.total_page && (
              <div className={clsx(styles.more)}>
                <button className={clsx(styles.moreBtn)} onClick={() => {
                  getComments(list.pagination.current_page + 1).then((res) => {
                    setList({
                      data: [...list.data, ...res.data],
                      pagination: res.pagination
                    })
                    message.info(`加载成功`)
                    // console.log(res)
                  }).catch((err) => {
                    message.error('加载失败')
                  })
                }}>
                  还有 {list.pagination.total_page - list.pagination.current_page} 页评论
                  <span className={clsx(styles.moreBtnInner)}>
                    加载更多
                  </span>
                </button>
              </div>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default Comments