import { useState } from 'react';

const SearchForm = ({ onSearchSubmit }) => {
  // State lokal untuk input form
  const [localQuery, setLocalQuery] = useState('');
  const [localDate, setLocalDate] = useState('');
  const [localLang, setLocalLang] = useState('en');
  const [localCountry, setLocalCountry] = useState('us');

  // Handler untuk submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearchSubmit({
      query: localQuery,
      date: localDate,
      language: localLang,
      country: localCountry,
    });
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="search-input">Search</label>
        <input
          id="search-input"
          type="text"
          value={localQuery}
          onChange={(e) => setLocalQuery(e.target.value)}
          placeholder="Berita apa yang anda cari.."
          aria-label="Search Keyword"
          required // Validasi HTML5
        />
      </div>

      <div className="form-group">
        <label htmlFor="date-input">Tanggal Publikasi</label>
        <input
          id="date-input"
          type="date"
          value={localDate}
          onChange={(e) => setLocalDate(e.target.value)}
          aria-label="Filter by date"
        />
      </div>

      <div className="form-group">
        <label htmlFor="lang-select">Bahasa</label>
        <select
          id="lang-select"
          value={localLang}
          onChange={(e) => setLocalLang(e.target.value)}
          aria-label="Select Language"
        >
          <option value="id">Indonesia</option>
          <option value="en">English</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="country-select">Negara</label>
        <select
          id="country-select"
          value={localCountry}
          onChange={(e) => setLocalCountry(e.target.value)}
          aria-label="Select Country"
        >
          <option value="id">Indonesia</option>
          <option value="us">United States</option>
          <option value="gb">United Kingdom</option>
        </select>
      </div>

      <button type="submit">Lakukan Pencarian</button>
    </form>
  );
};

export default SearchForm;