import './App.css';

import Header from './components/Header';
import QiblaTracker from './components/QiblaTracker';
import SearchBar from './components/SearchBar';
import MasjidList from './components/MasjidList';
import TasbihCounter from './components/TasbihCounter';
import useGeolocation from './hooks/useGeolocation';
import useMasjidFilter from './hooks/useMasjidFilter';
import useMasjidsApi from './hooks/useMasjidsApi';
import useSelectedMasjid from './hooks/useSelectedMasjid';

export default function App() {
  const { location, locationError, locationLoading, requestLocation } = useGeolocation();
  const { masjids, error: masjidsError } = useMasjidsApi();
  const { selectedMasjid, openMasjid, closeMasjid } = useSelectedMasjid();
  const currentPath = window.location.pathname.replace(/\/$/, '') || '/';
  const isTasbihCounter = currentPath === '/tasbih';
  const isQiblaTracker = currentPath === '/qibla';

  const {
    searchQuery,
    selectedEidTime,
    sortBy,
    filteredMasjids,
    hasActiveFilters,
    stats,
    eidTimeOptions,
    handleSearchChange,
    handleTimeFilter,
    handleSortChange,
    clearFilters,
  } = useMasjidFilter(masjids);

  return (
    <div className="app">
      <Header
        location={location}
        locationLoading={locationLoading}
        onRequestLocation={requestLocation}
        currentView={isTasbihCounter ? 'tasbih' : isQiblaTracker ? 'qibla' : 'user'}
      />

      {isTasbihCounter ? (
        <TasbihCounter />
      ) : isQiblaTracker ? (
        <QiblaTracker
          location={location}
          locationError={locationError}
          locationLoading={locationLoading}
          onRequestLocation={requestLocation}
        />
      ) : (
        <>
          {!selectedMasjid && (
            <SearchBar
              searchQuery={searchQuery}
              selectedEidTime={selectedEidTime}
              sortBy={sortBy}
              resultCount={filteredMasjids.length}
              hasActiveFilters={hasActiveFilters}
              eidTimeOptions={eidTimeOptions}
              onSearchChange={handleSearchChange}
              onTimeFilter={handleTimeFilter}
              onSortChange={handleSortChange}
              onClearFilters={clearFilters}
            />
          )}
          <MasjidList
            masjids={filteredMasjids}
            stats={stats}
            locationError={locationError || masjidsError}
            selectedMasjid={selectedMasjid}
            onOpenMasjid={openMasjid}
            onCloseMasjid={closeMasjid}
          />
        </>
      )}
    </div>
  );
}
