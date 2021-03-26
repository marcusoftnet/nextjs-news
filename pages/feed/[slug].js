import React from 'react';
import styles from '../../styles/feed.module.css';
import { useRouter } from 'next/router';
import { Toolbar } from '../../components/toolbar';

const Feed = ({ pageNumber, articles }) => {
  const router = useRouter();
  return (
    <div className='page-contaier'>
      <Toolbar />
      <div className={styles.main}>
        {articles.map((article, index) => (
          <div key={index} className={styles.post}>
            <h1 onClick={() => (window.location.href = article.url)}>
              {article.title}
            </h1>
            <p>{article.description}</p>
            {!!article.urlToImage && <img src={article.urlToImage} />}
          </div>
        ))}
      </div>

      <div className={styles.paginator}>
        <div
          onClick={() => {
            if (pageNumber > 1) {
              router
                .push(`/feed/${pageNumber - 1}`)
                .then(() => window.scrollTo(0, 0));
            }
          }}
          className={pageNumber === 1 ? styles.disabled : styles.active}
        >
          Previous page
        </div>
        <div># {pageNumber}</div>
        <div
          onClick={() => {
            if (pageNumber < 5) {
              router
                .push(`/feed/${pageNumber + 1}`)
                .then(() => window.scrollTo(0, 0));
            }
          }}
          className={pageNumber === 5 ? styles.disabled : styles.active}
        >
          Previous page
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async (pageContext) => {
  const pageNumber = pageContext.query.slug;
  if (!pageNumber || pageNumber < 1 || pageNumber > 5) {
    return {
      props: {
        pageNumber: 1,
        articles: [],
      },
    };
  }

  const newsURL = `https://newsapi.org/v2/top-headlines?country=se&pageSize=5&page=${pageNumber}`;
  const apiResponse = await fetch(newsURL, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_NEWS_KEY}`,
    },
  });

  const { articles } = await apiResponse.json();

  return {
    props: {
      pageNumber: Number.parseInt(pageNumber),
      articles,
    },
  };
};

export default Feed;
