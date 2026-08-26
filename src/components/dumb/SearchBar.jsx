import React from 'react';
import { Search, X, Loader2 } from 'lucide-react';

export const SearchBar = ({ searchId, setSearchId, onSearch, onClear, isSearching }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchId.trim()) {
      onSearch(searchId.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="search-bar-container">
      <div className="search-input-wrapper">
        <Search className="search-icon" size={18} />
        <input
          type="text"
          placeholder="Search employee by Name or ID..."
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          className="search-input"
          aria-label="Search by Employee Name or ID"
        />
        {searchId && (
          <button
            type="button"
            onClick={() => {
              setSearchId('');
              onClear();
            }}
            className="clear-search-btn"
            title="Clear search"
            aria-label="Clear search"
          >
            <X size={16} />
          </button>
        )}
      </div>
      <button type="submit" disabled={isSearching || !searchId.trim()} className="btn btn-primary">
        {isSearching ? <Loader2 className="animate-spin" size={16} /> : 'Search'}
      </button>
    </form>
  );
};
