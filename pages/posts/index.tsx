/*
 * @FilePath: /nx-theme-Single/pages/posts/index.tsx
 * @author: Wibus
 * @Date: 2022-08-16 20:57:29
 * @LastEditors: Wibus
 * @LastEditTime: 2022-08-17 21:03:42
 * Coding With IU
 */

import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import { SEO } from "../../components/others/SEO";
import { apiClient } from "../../utils/request.util";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const data = await apiClient("/posts", {
    method: "GET",
    params: {
      page: ctx.query.page || 1,
      size: 5, // CONFIGS NEEDED
    }
  });
  return {
    props: {
      data,
    }
  }
}

const Posts: NextPage<any> = (props) => {

  // const appStateSnapshot = useSnapshot(appState) as any;
  // console.log(props.data);

  return (
    <>
      <SEO title="博文" />

      <section className="home-title">
        <h1>博文</h1>
        <span>共撰写了 {props.data.data.length} 篇博文</span>
      </section>

      <section className='home-posts'>

        {
          props.data && props.data.data.map((item: any) => {
            return (
              <div className="post-item" key={item.id}>
              <h2>
                <Link href={`/posts/${item.category.slug}/${item.slug}`}>
                  <span>
                    {item.title}
                  </span>
                </Link>
              </h2>
              <p>
                {item.text.substring(0, 80)}
              </p>
              <div className="post-meta">
                <time className="date">
                  <span>{item.created.split('T')[0]}</span>
                </time>
                <span className="category">
                  <Link href={`/category/${item.category.slug}`} >
                    <span>{item.category.name}</span>
                  </Link>
                </span>
                <span className="comments">
                  <Link href={`/posts/${item.category.slug}/${item.slug}`}>
                    <span>{item.comments_index} °C</span>
                  </Link>
                </span>
              </div>
            </div>
            )
          }
          )
        }

      </section>

      <section className="page-navigator">
        {
          props.data.pagination.has_prev_page && (
            <>
              <Link href={`/posts?page=${props.data.pagination.current_page - 1}`}>
                «
              </Link>

              <Link href={`/posts?page=${props.data.pagination.current_page - 1}`}>
                {props.data.pagination.current_page - 1}
              </Link>
            </>
          )
        }
        {props.data.pagination.current_page}
        {
          props.data.pagination.has_next_page && (
            <>
              <Link href={`/posts?page=${props.data.pagination.current_page + 1}`}>
                {props.data.pagination.current_page + 1}
              </Link>

              <Link href={`/posts?page=${props.data.pagination.current_page + 1}`}>
                »
              </Link>
            </>
          )
        }
      </section>

    </>
  )
};

export default Posts;