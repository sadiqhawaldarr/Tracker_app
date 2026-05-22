import './App.css';

import AdminDashboard from './components/AdminDashboard';
import Header from './components/Header';
import QiblaPreview from './components/QiblaPreview';
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
  const { masjids, error: masjidsError, refreshMasjids } = useMasjidsApi();
  const { selectedMasjid, openMasjid, closeMasjid } = useSelectedMasjid();
  const currentPath = window.location.pathname.replace(/\/$/, '') || '/';
  const isAdminDashboard = currentPath === '/admin';
  const isTasbihCounter = currentPath === '/tasbih';
  const isQiblaTracker = currentPath === '/qibla';

  const {
    searchQuery,
    selectedEidTime,
    sortBy,
    filteredMasjids,
    hasActiveFilters,
    stats,
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
        currentView={isAdminDashboard ? 'admin' : isTasbihCounter ? 'tasbih' : isQiblaTracker ? 'qibla' : 'user'}
      />

      {isAdminDashboard ? (
        <AdminDashboard allMasjids={masjids} onDataChanged={refreshMasjids} />
      ) : isTasbihCounter ? (
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
              onSearchChange={handleSearchChange}
              onTimeFilter={handleTimeFilter}
              onSortChange={handleSortChange}
              onClearFilters={clearFilters}
            />
          )}

          {!selectedMasjid && <QiblaPreview />}

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
