import { useState, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { id } from 'date-fns/locale';
import { FaSearch, FaNewspaper, FaCaretDown, FaTimes } from 'react-icons/fa'; 
import Navbar from './components/Navbar';
import ArticleList from './components/ArticleList';
import Pagination from './components/Pagination';
// 👇 1. Impor SkeletonCard yang baru kita buat
import SkeletonCard from './components/SkeletonCard';

const API_KEY = 'e88f8987481848ad96196d4b4f0856d1';
const BASE_URL = 'https://newsapi.org/v2/everything';
const PAGE_SIZE = 12;

function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true); // Pastikan ini 'true' saat awal
  const [error, setError] = useState(null);

  const [category, setCategory] = useState('');
  const [query, setQuery] = useState('');
  const [date, setDate] = useState('');
  const [language, setLanguage] = useState('en');
  const [country, setCountry] = useState('us'); 

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isEditionOpen, setIsEditionOpen] = useState(false);
  const [modalSearchQuery, setModalSearchQuery] = useState('');

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true); // Set loading ke true SETIAP kali fetch dimulai
      setError(null);
      const params = new URLSearchParams({
        apikey: API_KEY,
        page: page,
        pageSize: PAGE_SIZE,
      });
      if (query) {
        params.append('q', query);
      } else if (category) {
        params.append('q', category);
      } else {
        params.append('q', 'berita'); 
      }
      if (date) {
        params.append('from', date);
        params.append('to', date);
      }
      if (language) {
        params.append('language', language);
      }
      const url = `${BASE_URL}?${params.toString()}`;
      console.log('Fetching URL (NewsAPI):', url);
      try {
        const response = await fetch(url);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(`HTTP error! status: ${response.status} (${errorData.message})`);
        }
        const data = await response.json();
        setArticles(data.articles || []);
      } catch (e) { 
        setError(e.message);
        setArticles([]); 
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, [category, query, date, language, page]);

  const handleCategoryClick = (newCategory) => {
    setCategory(newCategory);
    setQuery(''); 
    setDate(''); 
    setPage(1); 
  };
  const handleSearchSubmit = (searchParams) => {
    setQuery(searchParams.query || '');
    setDate(searchParams.date || '');
    setLanguage(searchParams.language || 'en');
    setCountry(searchParams.country || 'us');
    setCategory(''); 
    setPage(1);
    setIsSearchOpen(false);
    setModalSearchQuery('');
  };
  const openSearch = () => setIsSearchOpen(true);
  const closeSearch = () => {
    setIsSearchOpen(false);
    setModalSearchQuery('');
  };
  const toggleEditionMenu = () => setIsEditionOpen(prev => !prev);
  const handleEditionSelect = (edition) => {
    console.log("Edisi dipilih:", edition);
    setIsEditionOpen(false);
  };
  const handleModalSearchSubmit = (e) => {
    e.preventDefault();
    handleSearchSubmit({ query: modalSearchQuery });
  };
  const handleTrendingClick = (topic) => {
    handleSearchSubmit({ query: topic });
  };
  const handleImageError = (e) => {
    e.target.src = '/placeholder.jpg';
  };
  const handlePrevPage = () => setPage((prev) => Math.max(prev - 1, 1));
  const handleNextPage = () => setPage((prev) => Math.min(prev + 1, totalPages));

  const formatTimeAgo = (dateString) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      return formatDistanceToNow(date, { addSuffix: true, locale: id });
    } catch (error) {
      console.error("Format tanggal error:", error);
      return "beberapa waktu lalu";
    }
  };


  return (
    <div className="app">
      <header className="main-header">
        <div className="header-top-bar">
          <div className="top-left" onClick={openSearch}>
            <FaSearch className="search-icon" />
            <span className="search-text">Cari Berita</span>
          </div>
          <div className="header-logo">
            <span className="logo-text">VoxA</span> 
          </div>
          <div className="top-right" onClick={toggleEditionMenu}>
            <span>Edisi: Indonesia</span>
            <FaCaretDown className="dropdown-icon" />
            {isEditionOpen && (
              <div className="edition-dropdown-menu">
                <div className="edition-item" onClick={() => handleEditionSelect('Singapore')}>Singapore</div>
                <div className="edition-item active" onClick={() => handleEditionSelect('Indonesia')}>Indonesia</div>
                <div className="edition-item" onClick={() => handleEditionSelect('Asia')}>Asia</div>
                <div className="edition-item" onClick={() => handleEditionSelect('US/UK')}>US/UK</div>
              </div>
            )}
          </div>
        </div>

        <Navbar
          activeCategory={category}
          onCategoryClick={handleCategoryClick}
        />
      </header>

      {isSearchOpen && (
        <div className="search-overlay-cna">
          <div className="search-overlay-header">
            <span className="logo-text-overlay">VoxA</span>
            <button className="search-overlay-close-btn" onClick={closeSearch}>
              <FaTimes />
            </button>
          </div>
          <div className="search-overlay-content">
            <form className="cna-search-form" onSubmit={handleModalSearchSubmit}>
              <button type="submit" className="cna-search-submit-btn">
                <FaSearch />
              </button>
              <input
                type="text"
                className="cna-search-input"
                placeholder="Masukkan kata kunci, topik dan lainnya"
                value={modalSearchQuery}
                onChange={(e) => setModalSearchQuery(e.target.value)}
                autoFocus
              />
            </form>
            <div className="trending-topics-container">
              <span className="trending-title">Topik Trending</span>
              <button className="trending-topic-btn" onClick={() => handleTrendingClick('Indonesia')}>Indonesia</button>
              <button className="trending-topic-btn" onClick={() => handleTrendingClick('China')}>China</button>
              <button className="trending-topic-btn" onClick={() => handleTrendingClick('Malaysia')}>Malaysia</button>
            </div>
          </div>
        </div>
      )}

      <main className="main-content-layout">
        <aside className="sidebar-left">
          <h2 className="section-title">Terbaru</h2>
          {/* 👇 2. GANTI KONDISI LOADING DI SINI */}
          {loading ? (
            // Tampilkan 3 skeleton card
            [1, 2, 3].map(n => <SkeletonCard key={n} type="latest" />)
          ) : error ? (
            <p className="error-message">{error}</p>
          ) : (
            articles.slice(0, 3).map((article, index) => (
              <div key={article.url + index} className="latest-news-item">
                <a href={article.url} target="_blank" rel="noopener noreferrer">
                  <h4 className="latest-news-title">{article.title}</h4>
                  <p className="latest-news-source">{article.source.name}</p>
                </a>
              </div>
            ))
          )}
        </aside>

        <section className="main-article-section">
          {/* 👇 3. GANTI KONDISI LOADING DI SINI */}
          {loading ? (
            <SkeletonCard type="hero" />
          ) : error ? (
            <p className="error-message">{error}</p>
          ) : (
            articles.length > 0 && (
              <div className="main-hero-article">
                <img 
                  src={articles[0].urlToImage || '/placeholder.jpg'} 
                  alt={articles[0].title} 
                  className="hero-image"
                  onError={handleImageError} 
                />
                <div className="hero-content">
                  <span className="hero-category">Asia</span>
                  <h2 className="hero-title">{articles[0].title}</h2>
                  <p className="hero-time">
                    {formatTimeAgo(articles[0].publishedAt)}
                  </p>
                </div>
              </div>
            )
          )}
        </section>

        <aside className="sidebar-right">
<<<<<<< HEAD
          {/* 👇 4. GANTI KONDISI LOADING DI SINI */}
          {loading ? (
            // Tampilkan 3 skeleton card
            [1, 2, 3].map(n => <SkeletonCard key={n} type="sidebar" />)
          ) : error ? (
            <p className="error-message">{error}</p>
          ) : (
            articles.slice(1, 4).map((article, index) => (
              <div key={article.url + index} className="sidebar-news-item">
                <img 
                  src={article.urlToImage || '/placeholder.jpg'} 
                  alt={article.title} 
                  className="sidebar-item-image"
                  onError={handleImageError}
                />
                <div className="sidebar-item-content">
                  <span className="sidebar-item-category">Lifestyle</span>
                  <h4 className="sidebar-item-title">{article.title}</h4>
                  <p className="sidebar-item-time">
                    {formatTimeAgo(article.publishedAt)}
                  </p>
                </div>
=======
          {loading && <p>Loading sidebar...</p>}
          {error && <p>Error loading sidebar: {error}</p>}
          {!loading && !error && articles.slice(1, 4).map((article, index) => (
            <div key={article.url + index} className="sidebar-news-item">
              <img 
                src={article.urlToImage || '/placeholder.jpg'} 
                alt={article.title} 
                className="sidebar-item-image"
                onError={handleImageError}
              />
              <div className="sidebar-item-content">
                <span className="sidebar-item-category">Lifestyle</span>
                <h4 className="sidebar-item-title">{article.title}</h4>
                <p className="sidebar-item-time">
                  {formatTimeAgo(article.publishedAt)}
                </p>
>>>>>>> 055763e542d48a2fb1db93d7cff0019ce57ad20f
              </div>
            ))
          )}
        </aside>
      </main>

<<<<<<< HEAD
      {/* ... (Footer Anda) ... */}
=======
>>>>>>> 055763e542d48a2fb1db93d7cff0019ce57ad20f
      <footer>
        <p>&copy; 2025 123140104. VoxA.</p>
      </footer>
    </div>
  );
}

export default App;
