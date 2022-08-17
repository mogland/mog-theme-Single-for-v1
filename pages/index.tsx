import type { GetServerSideProps, NextPage } from 'next'
import { NextSeo } from 'next-seo'
import Link from 'next/link';
import { useSnapshot } from 'valtio';
import appState from '../states/appState';
import { apiClient } from '../utils/request.util';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const data = await apiClient("/posts", {
    method: "GET",
    params: {
      page: ctx.query.page || 1,
      size: 10, // CONFIGS NEEDED
    }
  });
  return {
    props: {
      data,
    }
  }
}

const Home: NextPage<any> = (props) => {

  const appStateSnapshot = useSnapshot(appState) as any;
  const aggregatedTopSnapshot = appStateSnapshot.aggregate.aggregatedTop.posts

  return (
    <>
      <NextSeo
        title={`${appStateSnapshot.aggregate.aggregatedData.sites.title} · ${appStateSnapshot.aggregate.aggregatedData.sites.description}`}
        description={appStateSnapshot.aggregate.aggregatedData.sites.description}
      />

      <section className="home-title">
        <h1>{appStateSnapshot.aggregate.aggregatedData.sites.title}</h1>
        <span>{appStateSnapshot.aggregate.aggregatedData.sites.description}</span>
      </section>

      <section className='home-posts'>

        {
          aggregatedTopSnapshot?.map((item: any) => {
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
        <span>
          <Link href="/posts">
            <span>« 全部文章 »</span>
          </Link>
        </span>
      </section>

    </>
  )
}

export default Home
