import React, { memo, useCallback } from 'react';
import { useTranslation } from '../i18n';
import './SearchBar.css';

const SORT_OPTIONS = [
  { value: 'distance', labelKey: 'sortNearest' },
  { value: 'time', labelKey: 'sortTime' },
  { value: 'capacity', labelKey: 'sortCapacity' },
];

const formatEidTime = (time, t) => {
  if (!time) return t('notSet');
  const [hours = '0', minutes = '00'] = time.split(':');
  const numericHours = Number(hours);
  const period = numericHours >= 12 ? t('pm') : t('am');
  const displayHours = numericHours % 12 || 12;
  return `${displayHours}:${minutes} ${period}`;
};

const SearchIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

const SearchBar = memo(function SearchBar({
  searchQuery,
  selectedEidTime,
  sortBy,
  resultCount,
  hasActiveFilters,
  eidTimeOptions = [],
  onSearchChange,
  onTimeFilter,
  onSortChange,
  onClearFilters,
}) {
  const { t } = useTranslation();
  const handleInput = useCallback(e => onSearchChange(e.target.value), [onSearchChange]);
  const handleTime = useCallback(e => onTimeFilter(e.target.value), [onTimeFilter]);
  const handleSort = useCallback(e => onSortChange(e.target.value), [onSortChange]);
  const handleClear = useCallback(() => onSearchChange(''), [onSearchChange]);

  return (
    <nav className="searchbar" aria-label={t('searchNavLabel')}>
      <div className="searchbar__inner">
        <div className="searchbar__row">
          <div className="searchbar__field">
            <span className="searchbar__icon"><SearchIcon /></span>
            <input
              className="searchbar__input"
              type="search"
              placeholder={t('searchPlaceholder')}
              value={searchQuery}
              onChange={handleInput}
              aria-label={t('searchMasjids')}
            />
            {searchQuery && (
              <button className="searchbar__clear-x" onClick={handleClear} aria-label={t('clearSearch')}>x</button>
            )}
          </div>

          <select
            className="searchbar__select"
            value={selectedEidTime}
            onChange={handleTime}
            aria-label={t('filterByEidTime')}
          >
            <option value="all">{t('allEidTimes')}</option>
            {eidTimeOptions.map(time => (
              <option key={time} value={time}>{t('eidAt', { time: formatEidTime(time, t) })}</option>
            ))}
          </select>

          <select
            className="searchbar__select"
            value={sortBy}
            onChange={handleSort}
            aria-label={t('sortMasjids')}
          >
            {SORT_OPTIONS.map(option => (
              <option key={option.value} value={option.value}>{t(option.labelKey)}</option>
            ))}
          </select>
        </div>

        {hasActiveFilters && (
          <div className="searchbar__info" role="status" aria-live="polite">
            <span className="searchbar__count">
              {t('resultFound', { count: resultCount })}
            </span>
            {selectedEidTime !== 'all' && (
              <span className="searchbar__badge">
                {t('eidAt', { time: formatEidTime(selectedEidTime, t) })}
              </span>
            )}
            <button className="searchbar__reset" onClick={onClearFilters} aria-label={t('clearAll')}>
              {t('clearAll')}
            </button>
          </div>
        )}
      </div>
    </nav>
  );
});

export default SearchBar;
