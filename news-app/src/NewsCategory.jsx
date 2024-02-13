// src/NewsCategory.jsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const NewsCategory = () => {
  const [articles, setArticles] = useState([]);
  const { url } = useParams();

  useEffect(() => {
    fetchData('/top-headlines?country=us&category=business');
  }, []); // Fetch business news on component mount

  useEffect(() => {
    if (url) {
      fetchArticle(url);
    }
  }, [url]); // Fetch article when URL changes

  const fetchData = async (url) => {
    try {
      const response = await axios.get(`https://newsapi.org/v2${url}&apiKey=bd9f7dcc7ad64265851afaa869e9aae5`);
      setArticles(response.data.articles);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchArticle = async (articleUrl) => {
    try {
      const response = await axios.get(`https://newsapi.org/v2/everything?url=${articleUrl}&apiKey=XXXXXXXXXXXX`);
      setArticles([response.data]);
    } catch (error) {
      console.error('Error fetching article:', error);
    }
  };

  const handleCategoryClick = (url) => {
    fetchData(url);
  };

  return (
    <div>
      <h2>News Categories</h2>
      <ul>
        <li>
          <Link to="#" onClick={() => handleCategoryClick('/top-headlines?country=us&category=business')}>
            Business
          </Link>
        </li>
        {/* Add more categories as needed */}
      </ul>

      <div className="cards">
        {articles.map((article) => (
          <div key={article.url} className="card">
            <div className="image">
              <img src={article.urlToImage || 'https://via.placeholder.com/150'} alt="Default News Image" />
            </div>
            <div className="information">
              <div>
                <p className="title">{article.title}</p>
                <p className="description">{article.description}</p>
                <p className="time">
                  <span>{article.publishedAt && article.publishedAt.replace('Z', '').split('T')[1]}</span>
                  <span>{article.publishedAt && article.publishedAt.replace('Z', '').split('T')[0]}</span>
                </p>
              </div>
              <div className="other">
                <span className="source">{article.source && article.source.name}</span>
                <Link className="url" to={`/news/${encodeURIComponent(article.url)}`} target="_blank">
                  Read Article <i className="bi bi-arrow-right"></i>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsCategory;
