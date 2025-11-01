import { useState, useEffect } from 'react';
import { FaSearch, FaNewspaper, FaCaretDown } from 'react-icons/fa'; // Menambahkan FaSearch dan FaCaretDown
import Navbar from './components/Navbar';
import SearchForm from './components/SearchForm';
import ArticleList from './components/ArticleList';
import Pagination from './components/Pagination';

// --- PENGATURAN API (NEWSAPI.ORG) ---
const API_KEY = 'e88f8987481848ad96196d4b4f0856d1';
const BASE_URL = 'https://newsapi.org/v2/everything';
const PAGE_SIZE = 12;

function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [category, setCategory] = useState('');
  const [query, setQuery] = useState('');
  const [date, setDate] = useState('');
  const [language, setLanguage] = useState('en');
  const [country, setCountry] = useState('us'); 

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
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
        setTotalPages(Math.ceil(data.totalResults / PAGE_SIZE) || 1);
        
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

  const handleSearchSubmit = (filters) => {
    setQuery(filters.query);
    setDate(filters.date);
    setLanguage(filters.language);
    setCountry(filters.country); 
    setCategory(''); 
    setPage(1); 
  };

  const handlePrevPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  return (
    <div className="app">
      <header className="main-header">
        <div className="header-top-bar">
          {/* Kiri: Search (kita akan implementasikan nanti) */}
          <div className="top-left">
            <FaSearch className="search-icon" />
            <span className="search-text">Cari Berita</span>
          </div>

          {/* Tengah: Logo */}
          <div className="header-logo">
            {/* Untuk sekarang, gunakan teks placeholder. Ganti dengan <img> nanti */}
            <span className="logo-text">CNA</span> 
          </div>

          {/* Kanan: Dropdown Edisi */}
          <div className="top-right">
            <span>Edisi: Indonesia</span>
            <FaCaretDown className="dropdown-icon" />
          </div>
        </div>

        {/* Navigasi Utama */}
        <Navbar
          activeCategory={category}
          onCategoryClick={handleCategoryClick}
        />
        
        {/* Formulir Pencarian (Kita simpan di sini, tapi mungkin akan disembunyikan/dipindahkan) */}
        {/* <SearchForm onSearchSubmit={handleSearchSubmit} /> */}
      </header>

      <main className="main-content-layout">
        {/* Kolom Kiri: Berita Terbaru */}
        <aside className="sidebar-left">
          <h2 className="section-title">Terbaru</h2>
          {/* Untuk sekarang, ini akan kosong atau menampilkan ArticleList sederhana */}
          {loading && <p>Loading latest...</p>}
          {error && <p>Error loading latest: {error}</p>}
          {!loading && !error && articles.slice(0, 3).map((article, index) => (
            <div key={article.url + index} className="latest-news-item">
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                <h4 className="latest-news-title">{article.title}</h4>
                <p className="latest-news-source">{article.source.name}</p>
              </a>
            </div>
          ))}
        </aside>

        {/* Kolom Tengah: Berita Utama Besar */}
        <section className="main-article-section">
          {loading && <p>Loading main article...</p>}
          {error && <p>Error loading main: {error}</p>}
          {!loading && !error && articles.length > 0 && (
            <div className="main-hero-article">
              <img src={articles[0].urlToImage || '/placeholder.png'} alt={articles[0].title} className="hero-image" />
              <div className="hero-content">
                <span className="hero-category">Asia</span> {/* Placeholder */}
                <h2 className="hero-title">{articles[0].title}</h2>
                <p className="hero-time">satu hari yang lalu</p> {/* Placeholder */}
              </div>
            </div>
          )}
        </section>

        {/* Kolom Kanan: Berita Samping dengan Gambar */}
        <aside className="sidebar-right">
          {loading && <p>Loading sidebar...</p>}
          {error && <p>Error loading sidebar: {error}</p>}
          {!loading && !error && articles.slice(1, 4).map((article, index) => (
            <div key={article.url + index} className="sidebar-news-item">
              <img src={article.urlToImage || '/placeholder.png'} alt={article.title} className="sidebar-item-image" />
              <div className="sidebar-item-content">
                <span className="sidebar-item-category">Lifestyle</span> {/* Placeholder */}
                <h4 className="sidebar-item-title">{article.title}</h4>
                <p className="sidebar-item-time">22 jam yang lalu</p> {/* Placeholder */}
              </div>
            </div>
          ))}
        </aside>
      </main>

      {/* Pagination (kita mungkin akan mengubah posisi/gayanya nanti) */}
      {!loading && !error && articles.length > 0 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPrevPage={handlePrevPage}
          onNextPage={handleNextPage}
        />
      )}

      <footer>
        <p>&copy; 2025 News Portal. Dibuat dengan React & Vite.</p>
      </footer>
    </div>
  );
}

export default App;