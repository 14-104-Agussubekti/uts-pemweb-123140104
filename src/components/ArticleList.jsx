import React from 'react';
import ArticleItem from './ArticleItem';

const ArticleList = ({ articles, loading, error }) => {
  // 1. Kondisi Loading
  if (loading) {
    return <div className="loading-message">Loading articles...</div>;
  }

  // 2. Kondisi Error
  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  // 3. Kondisi Data Kosong
  if (articles.length === 0) {
    return <div className="no-articles-message">Tidak ada artikel ditemukan.</div>;
  }

  // 4. Kondisi Data Sukses
  return (
    <section className="article-list">
      {articles.map((article) => (
        // Tambahkan 'key' prop yang unik. Kita gunakan 'article.url'
        <ArticleItem key={article.url} article={article} />
      ))}
    </section>
  );
};

export default ArticleList;