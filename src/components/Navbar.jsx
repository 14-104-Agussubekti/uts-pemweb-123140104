import React from 'react';

const CATEGORIES = ['Technology', 'Business', 'Sports'];

const Navbar = ({ activeCategory, onCategoryClick }) => {
  return (
    <nav id="navbar">
      <ul>
        <li>
          <button
            className={activeCategory === '' ? 'active' : ''}
            onClick={() => onCategoryClick('')}
          >
            Beranda
          </button>
        </li>
        
        {CATEGORIES.map((cat) => {
          const categoryValue = cat.toLowerCase();
          return (
            <li key={categoryValue}>
              <button
                className={activeCategory === categoryValue ? 'active' : ''}
                onClick={() => onCategoryClick(categoryValue)}
              >
                {cat}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navbar;