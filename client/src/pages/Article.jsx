import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import articleContent from './article-content';
import Articles from '../components/Articles';
import NotFound from './NotFound';

const Article = () => {
  const { name } = useParams();
  const [articleInfo, setArticleInfo] = useState({ comments: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetch(`/api/articles/${name}`);
        const body = await result.json();
        console.log(body);
        setArticleInfo(body);
      } catch (error) {
        console.error('Error fetching article:', error);
      }
    };
    fetchData();
  }, [name]);

  const article = articleContent.find((article) => article.name === name);

  if (!article) return <NotFound />;

  const otherArticles = articleContent.filter(
    (article) => article.name !== name
  );

  return (
    <>
      <h1 className='sm:text-4xl text-2xl font-bold my-6 text-gray-900'>
        {article.title}
      </h1>
      {article.content.map((paragraph) => (
        <p
          className='mx-auto leading-relaxed text-base mb-4'
          key={paragraph.Id}
        >
          {paragraph.text}
          <p className='my-5 text-center'>Thanks! For Reading</p>
        </p>
      ))}
      <h2 className='sm:text-2xl text-xl font-bold my-4 text-gray-900'>
        Other Articles
      </h2>
      <div className='flex flex-wrap -m-4'>
        <Articles articles={otherArticles} />
      </div>
    </>
  );
};

export default Article;
