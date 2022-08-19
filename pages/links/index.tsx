/*
 * @FilePath: /nx-theme-Single/pages/links/index.tsx
 * @author: Wibus
 * @Date: 2022-08-18 12:57:33
 * @LastEditors: Wibus
 * @LastEditTime: 2022-08-19 23:34:47
 * Coding With IU
 */

import { GetServerSideProps, NextPage } from "next";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { apiClient } from "../../utils/request.util";

const LinksSender = dynamic(() => import("../../components/widgets/LinksSender"), {
  ssr: false,
});

const SEO = dynamic(() => import("../../components/others/SEO"))

const Markdown = dynamic(() => import("../../components/Markdown"));

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
              <Markdown source={data.text} images={data.images} />
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