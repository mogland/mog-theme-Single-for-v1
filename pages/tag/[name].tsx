/*
 * @FilePath: /nx-theme-Single/pages/tag/[name].tsx
 * @author: Wibus
 * @Date: 2022-08-18 15:29:14
 * @LastEditors: Wibus
 * @LastEditTime: 2022-08-18 15:40:44
 * Coding With IU
 */

import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import { SEO } from "../../components/others/SEO";
import { apiClient } from "../../utils/request.util";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { name } = ctx.query;
  const data = await apiClient(`/categories/${name}?tag=true`);
  return {
    props: {
      tag: data.tag,
      data: data.data,
    },
  };
}

const Category: NextPage<any> = (props) => {
  return (
    <>
      <SEO title={`「 ${props.tag} 」标签下的文章`} />

      <section className="home-title">
        <h1>「 {props.tag} 」标签下的文章</h1>
        <span>共撰写了 {props.data?.length} 篇博文</span>
      </section>

      <section className='home-posts'>
      {
          props.data && props.data.map((item: any) => {
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
              </div>
            </div>
            )
          }
          )
        }
      </section>

    </>
  )
}

export default Category;