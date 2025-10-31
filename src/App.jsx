import { useState, useEffect } from 'react';
import { FaNewspaper } from 'react-icons/fa'; 
import Navbar from './components/Navbar';
import SearchForm from './components/SearchForm';
import ArticleList from './components/ArticleList';
import Pagination from './components/Pagination';

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
      <header>
      
        <h1>VoxA</h1>
        <p className="app-description">Menyuarakan fakta, menghadirkan wawasan.</p>

        <Navbar
          activeCategory={category}
          onCategoryClick={handleCategoryClick}
        />
        <SearchForm onSearchSubmit={handleSearchSubmit} />
      </header>

      <main>
        <ArticleList articles={articles} loading={loading} error={error} />
      </main>

      {!loading && !error && articles.length > 0 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPrevPage={handlePrevPage}
          onNextPage={handleNextPage}
        />
      )}

      <footer>
        <p>&copy; 2025 123140104. VoxA.</p>
      </footer>
    </div>
  );
}

export default App;