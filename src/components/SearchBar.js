// src/components/SearchBar.js
import React, { memo, useCallback } from 'react';
import './SearchBar.css';

/* ── Constants ── */
const EID_TIME_LABELS = { '07:00': '7:00 AM', '07:30': '7:30 AM', '08:00': '8:00 AM' };
const SORT_OPTIONS = [
  { value: 'distance', label: 'Sort: Nearest'  },
  { value: 'time',     label: 'Sort: Eid Time' },
  { value: 'capacity', label: 'Sort: Capacity' },
];

const SearchIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

/**
 * SearchBar
 * ─────────
 * Sticky filter bar: search input + Eid time dropdown + sort dropdown.
 *
 * Props:
 *   searchQuery      string
 *   selectedEidTime  string ('all' | '07:00' | '07:30' | '08:00')
 *   sortBy           string ('distance' | 'time' | 'capacity')
 *   resultCount      number
 *   hasActiveFilters boolean
 *   onSearchChange   fn(string)
 *   onTimeFilter     fn(string)
 *   onSortChange     fn(string)
 *   onClearFilters   fn()
 *
 * Optimisation: memo + useCallback handlers prevent child re-renders.
 */
const SearchBar = memo(function SearchBar({
  searchQuery,
  selectedEidTime,
  sortBy,
  resultCount,
  hasActiveFilters,
  onSearchChange,
  onTimeFilter,
  onSortChange,
  onClearFilters,
}) {
  const handleInput   = useCallback(e => onSearchChange(e.target.value),  [onSearchChange]);
  const handleTime    = useCallback(e => onTimeFilter(e.target.value),    [onTimeFilter]);
  const handleSort    = useCallback(e => onSortChange(e.target.value),    [onSortChange]);
  const handleClear   = useCallback(() => onSearchChange(''),             [onSearchChange]);

  return (
    <nav className="searchbar" aria-label="Search and filter masjids">
      <div className="searchbar__inner">

        {/* ── Inputs Row ── */}
        <div className="searchbar__row">

          {/* Search */}
          <div className="searchbar__field">
            <span className="searchbar__icon"><SearchIcon /></span>
            <input
              className="searchbar__input"
              type="search"
              placeholder="Search masjid, area, imam…"
              value={searchQuery}
              onChange={handleInput}
              aria-label="Search masjids"
            />
            {searchQuery && (
              <button className="searchbar__clear-x" onClick={handleClear} aria-label="Clear search">×</button>
            )}
          </div>

          {/* Eid time filter */}
          <select
            className="searchbar__select"
            value={selectedEidTime}
            onChange={handleTime}
            aria-label="Filter by Eid prayer time"
          >
            <option value="all">All Eid Times</option>
            {Object.entries(EID_TIME_LABELS).map(([v, l]) => (
              <option key={v} value={v}>Eid @ {l}</option>
            ))}
          </select>

          {/* Sort */}
          <select
            className="searchbar__select"
            value={sortBy}
            onChange={handleSort}
            aria-label="Sort masjids"
          >
            {SORT_OPTIONS.map(o => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>

        {/* ── Active-filter info row ── */}
        {hasActiveFilters && (
          <div className="searchbar__info" role="status" aria-live="polite">
            <span className="searchbar__count">
              <strong>{resultCount}</strong> masjid{resultCount !== 1 ? 's' : ''} found
            </span>
            {selectedEidTime !== 'all' && (
              <span className="searchbar__badge">
                🕌 Eid @ {EID_TIME_LABELS[selectedEidTime]}
              </span>
            )}
            <button className="searchbar__reset" onClick={onClearFilters} aria-label="Clear all filters">
              Clear all ×
            </button>
          </div>
        )}

      </div>
    </nav>
  );
});

export default SearchBar;
