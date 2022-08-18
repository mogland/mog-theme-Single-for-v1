/*
 * @FilePath: /nx-theme-Single/pages/category/[slug].tsx
 * @author: Wibus
 * @Date: 2022-08-18 15:29:19
 * @LastEditors: Wibus
 * @LastEditTime: 2022-08-18 15:35:40
 * Coding With IU
 */

import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import { SEO } from "../../components/others/SEO";
import { apiClient } from "../../utils/request.util";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { slug } = ctx.query;
  const data = await apiClient(`/categories/${slug}?tag=false`);
  return {
    props: {
      data: data.data,
    },
  };
}

const Category: NextPage<any> = (props) => {
  return (
    <>
      <SEO title={`「 ${props.data.name} 」分类下的文章`} />

      <section className="home-title">
        <h1>「 {props.data.name} 」分类下的文章</h1>
        <span>共撰写了 {props.data.children?.length} 篇博文</span>
      </section>

      <section className='home-posts'>
      {
          props.data.children && props.data.children.map((item: any) => {
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

    </>
  )
}

export default Category;