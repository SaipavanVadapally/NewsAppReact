// src/App.jsx
import React, { useEffect, useState } from 'react';

import './App.scss';

const App = () => {
  const [articles, setArticles] = useState([]);
  const [activeCategory, setActiveCategory] = useState('/top-headlines?country=us&category=business');

  const baseUrl = "https://newsapi.org/v2/";
  const apiKey = "bd9f7dcc7ad64265851afaa869e9aae5";
  const backupImage = "https://images.unsplash.com/photo-1495020689067-958852a7765e?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169";

  const dataRequest = async (url) => {
    try {
      const response = await fetch(baseUrl + url + "&apiKey=" + apiKey);
      const json = await response.json();
      return json;
    } catch (error) {
      console.error(error);
    }
  };

  const urlRequest = (url) => {
    dataRequest(url).then((data) => {
      setArticles(data.articles);
    });
  };

  const handleCategoryClick = (url) => {
    setActiveCategory(url);
  };

  useEffect(() => {
    urlRequest(activeCategory);
  }, [activeCategory]);

  return (
    <main>
      <div className="outer-wrap">
        <div className="inner-wrap">
          <section className="heading">
            <p className="title">AajKaSamachar Using React</p>
            <p className="subtitle">Your Custom News Portal With Selected Categories And Updates!</p>
          </section>
          <section className="news">
            <div className="category">
              <span
                className={activeCategory === '/top-headlines?country=us&category=business' ? 'active' : ''}
                onClick={() => handleCategoryClick('/top-headlines?country=us&category=business')}
                data-id="/top-headlines?country=us&category=business"
              >
                US
              </span>
              <span
                className={activeCategory === '/top-headlines?country=IN&category=business' ? 'active' : ''}
                onClick={() => handleCategoryClick('/top-headlines?country=IN&category=business')}
                data-id="/top-headlines?country=IN&category=business"
              >
                India
              </span>
              <span
                className={activeCategory === '/top-headlines?country=AU&category=business' ? 'active' : ''}
                onClick={() => handleCategoryClick('/top-headlines?country=AU&category=business')}
                data-id="/top-headlines?country=AU&category=business"
              >
                Australia
              </span>
              <span
                className={activeCategory === '/top-headlines?country=de&category=business' ? 'active' : ''}
                onClick={() => handleCategoryClick('/top-headlines?country=de&category=business')}
                data-id="/top-headlines?country=de&category=business"
              >
                Germany
              </span>
               
              {/* Add more categories as needed */}
            </div>
            <div className="cards">
              {articles?.map((item) => (
                <div key={item.url} className="card">
                  <div className="image">
                    <img src={item.urlToImage || backupImage} alt="Default News Image" />
                  </div>
                  <div className="information">
                    <div>
                      <p className="title">{item.title}</p>
                      <p className="description">{item.description}</p>
                      <p className="time">
                        <span>{item.publishedAt.replace("Z", "").split("T")[1]}</span>
                        <span>{item.publishedAt.replace("Z", "").split("T")[0]}</span>
                      </p>
                    </div>
                    <div className="other">
                      <span className="source">{item.source.name}</span>
                      <a className="url" href={item.url} target="_blank" rel="noopener noreferrer">
                        Read Article <i className="bi bi-arrow-right"></i>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default App;
