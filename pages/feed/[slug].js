import React from 'react';
import styles from '../../styles/feed.module.css';
import { Toolbar } from '../../components/toolbar';
import Paginator from '../../components/Paginator';

const Feed = ({ pageNumber, articles }) => {
  return (
    <div className='page-contaier'>
      <Toolbar />

      <Paginator pageNumber={pageNumber} />

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

      <Paginator pageNumber={pageNumber} />
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
