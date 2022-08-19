/*
 * @FilePath: /nx-theme-Single/pages/links/index.tsx
 * @author: Wibus
 * @Date: 2022-08-18 12:57:33
 * @LastEditors: Wibus
 * @LastEditTime: 2022-08-19 23:44:06
 * Coding With IU
 */

import { Loading } from "@icon-park/react";
import { GetServerSideProps, NextPage } from "next";
import dynamic from "next/dynamic";
import { Suspense, useEffect, useState } from "react";
import { apiClient } from "../../utils/request.util";

const LinksSender = dynamic(() => import("../../components/widgets/LinksSender"), {
  ssr: false,
});

const SEO = dynamic(() => import("../../components/others/SEO"))

const Markdown = dynamic(() => import("../../components/Markdown"), {
  suspense: true,
});

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const link = await apiClient("/links/all").then((res) => res.data);
  return {
    props: {
      link,
    },
  }
}


const Links: NextPage<any> = (props) => {

  const [data, setData] = useState<any>()

  const getData = async () => {
    const res = await apiClient(`/page/slug/links`);
    setData(res)
  }

  useEffect(() => {
    getData();
  })

  return (
    <>
      <SEO title={"朋友们"} />

      <section className="page-title">
        <h2>
          {data ? data.title : "朋友们"}
        </h2>
      </section>

      <article className="page-content">
        <h1>我的朋友们</h1>

        <ul>
          {
            props.link.map((item: any, index: number) => {
              return (
                <li key={index}>
                  <a href={item.url} target="_blank">
                    {item.name}
                  </a>
                  -- {item.description}
                </li>
              )
            }
            )
          }
        </ul>

        {
          data && (
            <Suspense fallback={<div><Loading /> Loading...</div>}>
              <Markdown source={props.data.text} images={props.data.images} />
            </Suspense>
          )
        }

      </article>

      <section className="post-comments">
        <LinksSender />
      </section>


    </>
  )
}

export default Links;