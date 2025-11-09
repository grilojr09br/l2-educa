import React, { useState, useEffect } from 'react';
import MiniSearch from 'minisearch';
import './DocSearch.css';

const DocSearch = () => {
  const [searchIndex, setSearchIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetch('/l2/search-index.json')
      .then(response => response.json())
      .then(data => {
        setSearchIndex(MiniSearch.loadJSON(data, {
          fields: ['title', 'content'],
          storeFields: ['title'],
        }));
      });
  }, []);

  const handleSearch = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    if (searchIndex && term.length > 2) {
      const searchResults = searchIndex.search(term, { fuzzy: 0.2 });
      setResults(searchResults);
    } else {
      setResults([]);
    }
  };

  return (
    <div className="doc-search">
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search documentation..."
      />
      <ul>
        {results.map(result => (
          <li key={result.id}>
            <a href={`/l2/#/docs/${result.id.replace('.md', '')}`}>{result.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DocSearch;
