/*
 * @FilePath: /nx-theme-Single/pages/[pages]/index.tsx
 * @author: Wibus
 * @Date: 2022-08-18 12:52:01
 * @LastEditors: Wibus
 * @LastEditTime: 2022-08-19 23:35:46
 * Coding With IU
 */
import { GetServerSideProps, NextPage } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useEffect } from "react";
import { useSnapshot } from "valtio";
import appState from "../../states/appState";
import { apiClient } from "../../utils/request.util";

const Comments = dynamic(() => import("../../components/widgets/Comments"), {
  ssr: false,
});

const SEO = dynamic(() => import("../../components/others/SEO"))

const Markdown = dynamic(() => import("../../components/Markdown"));

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const data = await apiClient(`/page/slug/${ctx.query?.pages}`);
  return {
    props: {
      data,
    },
  };
}

const Page: NextPage<any> = (props) => {

  const aggregateSnapshot = (useSnapshot(appState) as any).aggregate.aggregatedData;

  useEffect(() => {
    Array.from(document.querySelectorAll("#write h2")).map((item, index) => {
      const ele = document.createElement("a")
      ele.setAttribute("href", `#${item.textContent}`)
      ele.innerText = item.textContent || "";
      document.querySelector(".article-list")?.appendChild(ele)
    })
    document.body.classList.add("has-trees");
    return () => {
      document.body.classList.remove("has-trees");
    }
  }, [])

  useEffect(() => {
    const ele = document.createElement("a")
    ele.classList.add("toggle-list")
    ele.onclick = () => {
      document.querySelector(".article-list")?.classList.toggle("active")
    }
    document.querySelector(".buttons")?.appendChild(ele)
    return () => {
      document.querySelector(".article-list")?.classList.toggle("active")
      document.querySelector(".buttons")?.removeChild(ele)
    }
  })


  return (
    <>
      <SEO
        title={props.data.title}
        openGraph={{ type: 'article' }}
        description={
          props.data.text.substring(0, 200)
        }
      />
      <Head>
        <title>{props.data.title}</title>
      </Head>

      <section className="post-title">
        <h2>{props.data.title}</h2>
      </section>
      <article className="post-content">
        <Markdown source={props.data.text} images={props.data.images} />
      </article>
      {/* <section className="post-near"></section> */}
      <section className="post-author">
        <figure className="author-avatar">
          <img src={aggregateSnapshot.user.avatar} alt={aggregateSnapshot.user.name} width={200} height={200} />
        </figure>
        <div className="author-info">
          <h4>
            {aggregateSnapshot.user.name}
          </h4>
          <p>
            {aggregateSnapshot.user.introduce}
          </p>
        </div>
      </section>
      <section className="post-comments">
        <Comments type="Page" path={props.data.slug} id={props.data.id} />
      </section>
      <section className="article-list">
        <h4>
          <span className="title">目录</span>
        </h4>
      </section>
    </>
  )
}

export default Page;