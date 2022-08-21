/*
 * @FilePath: /nx-theme-Single/pages/[pages]/index.tsx
 * @author: Wibus
 * @Date: 2022-08-18 12:52:01
 * @LastEditors: Wibus
 * @LastEditTime: 2022-08-21 21:42:13
 * Coding With IU
 */
import { Loading } from "@icon-park/react";
import { GetServerSideProps, NextPage } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
import { Suspense, useEffect } from "react";
import { useSnapshot } from "valtio";
import Markdown from "../../components/Markdown";
import appState from "../../states/appState";
import { apiClient } from "../../utils/request.util";

const Comments = dynamic(() => import("../../components/widgets/Comments"), {
  ssr: false,
});

const SEO = dynamic(() => import("../../components/others/SEO"))

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
      <Markdown source={props.data.text} images={props.data.images} toc />
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
      
    </>
  )
}

export default Page;