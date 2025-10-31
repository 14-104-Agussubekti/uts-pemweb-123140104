import React from 'react';

const PLACEHOLDER_IMAGE = '/placeholder.jpg'; 

const ArticleItem = ({ article }) => {
  // Destructuring props dari NewsAPI.org
  const { title, urlToImage, source, publishedAt, url } = article;

  // Format tanggal
  const formattedDate = new Date(publishedAt).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <article className="card">
      <a href={url} target="_blank" rel="noopener noreferrer">
        <img
          src={urlToImage || PLACEHOLDER_IMAGE}
          alt={title || 'Article thumbnail'}
          className="card-image"
        />
        <div className="card-content">
          <h3 className="card-title">{title}</h3>
          <p className="card-source">Sumber: {source.name || 'Tidak diketahui'}</p>
          <p className="card-date">Publikasi: {formattedDate}</p>
        </div>
      </a>
    </article>
  );
};

export default ArticleItem;