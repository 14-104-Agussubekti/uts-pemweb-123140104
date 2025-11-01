import { useState } from 'react';

// Form ini sekarang akan ada di dalam modal
const SearchForm = ({ onSearchSubmit }) => {
  const [localQuery, setLocalQuery] = useState('');
  const [localDate, setLocalDate] = useState('');
  const [localLang, setLocalLang] = useState('en');
  const [localCountry, setLocalCountry] = useState('us');

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
    // 'search-form' akan kita style ulang agar pas di modal
    <form className="search-form" onSubmit={handleSubmit}>
      <h2>Pencarian Lanjutan</h2>
      <p>Cari artikel berdasarkan keyword, tanggal, bahasa, atau negara.</p>

      <div className="form-group">
        <label htmlFor="search-input">Keyword</label>
        <input
          id="search-input"
          type="text"
          value={localQuery}
          onChange={(e) => setLocalQuery(e.target.value)}
          placeholder="Cari artikel..."
          aria-label="Search Keyword"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="date-input">Tanggal</label>
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
          <option value="en">English</option>
          <option value="id">Indonesia</option>
          <option value="de">German</option>
          <option value="es">Spanish</option>
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
          <option value="us">United States</option>
          <option value="id">Indonesia</option>
          <option value="gb">United Kingdom</option>
          <option value="au">Australia</option>
        </select>
      </div>

      <button type="submit">Cari</button>
    </form>
  );
};

export default SearchForm;