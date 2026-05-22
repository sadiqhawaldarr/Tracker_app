import { useCallback, useDeferredValue, useMemo, useState } from 'react';

export default function useMasjidFilter(masjids) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEidTime, setSelectedEidTime] = useState('all');
  const [sortBy, setSortBy] = useState('distance');
  const deferredSearchQuery = useDeferredValue(searchQuery);

  const filteredMasjids = useMemo(() => {
    let list = [...masjids];

    if (deferredSearchQuery.trim()) {
      const query = deferredSearchQuery.toLowerCase();
      list = list.filter(
        masjid =>
          masjid.name.toLowerCase().includes(query) ||
          masjid.area.toLowerCase().includes(query) ||
          masjid.address.toLowerCase().includes(query) ||
          masjid.imam.toLowerCase().includes(query)
      );
    }

    if (selectedEidTime !== 'all') {
      list = list.filter(masjid => masjid.eidTime === selectedEidTime);
    }

    if (sortBy === 'distance') {
      list.sort((a, b) => a.distance - b.distance);
    } else if (sortBy === 'time') {
      list.sort((a, b) => a.eidTime.localeCompare(b.eidTime));
    } else if (sortBy === 'capacity') {
      list.sort((a, b) => b.capacity - a.capacity);
    }

    return list;
  }, [masjids, deferredSearchQuery, selectedEidTime, sortBy]);

  const stats = useMemo(() => {
    const counts = {};
    masjids.forEach(masjid => {
      counts[masjid.eidTime] = (counts[masjid.eidTime] || 0) + 1;
    });
    return counts;
  }, [masjids]);

  const clearFilters = useCallback(() => {
    setSearchQuery('');
    setSelectedEidTime('all');
    setSortBy('distance');
  }, []);

  return {
    searchQuery,
    selectedEidTime,
    sortBy,
    filteredMasjids,
    hasActiveFilters: searchQuery.trim() !== '' || selectedEidTime !== 'all',
    stats,
    handleSearchChange: setSearchQuery,
    handleTimeFilter: setSelectedEidTime,
    handleSortChange: setSortBy,
    clearFilters,
  };
}
