import React from 'react';

// Komponen ini akan menampilkan UI placeholder
// berdasarkan 'type' yang kita berikan (hero, sidebar, atau latest)
const SkeletonCard = ({ type }) => {
  // Skeleton untuk Berita Utama (Hero)
  if (type === 'hero') {
    return (
      <div className="skeleton-card hero-skeleton">
        <div className="skeleton-image shimmer"></div>
        <div className="skeleton-content">
          <div className="skeleton-text short shimmer"></div>
          <div className="skeleton-text shimmer"></div>
          <div className="skeleton-text long shimmer"></div>
          <div className="skeleton-text medium shimmer"></div>
        </div>
      </div>
    );
  }

  // Skeleton untuk Sidebar Kanan
  if (type === 'sidebar') {
    return (
      <div className="skeleton-card sidebar-skeleton">
        <div className="skeleton-image-small shimmer"></div>
        <div className="skeleton-content">
          <div className="skeleton-text short shimmer"></div>
          <div className="skeleton-text shimmer"></div>
          <div className="skeleton-text medium shimmer"></div>
        </div>
      </div>
    );
  }

  // Skeleton untuk Sidebar Kiri (Latest)
  return (
    <div className="skeleton-card latest-skeleton">
      <div className="skeleton-text shimmer"></div>
      <div className="skeleton-text long shimmer"></div>
      <div className="skeleton-text short shimmer"></div>
    </div>
  );
};

export default SkeletonCard;