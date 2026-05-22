import baseMasjids from '../data/masjids';

const CUSTOM_MASJIDS_KEY = 'masjid-finder-custom-masjids';

function toNumber(value, fallback) {
  const nextValue = Number(value);
  return Number.isFinite(nextValue) ? nextValue : fallback;
}

export function normalizeMasjid(masjid, fallbackId) {
  return {
    ...masjid,
    id: toNumber(masjid.id, fallbackId),
    distance: toNumber(masjid.distance, 1),
    lat: toNumber(masjid.lat, 16.8302),
    lng: toNumber(masjid.lng, 75.71),
    capacity: toNumber(masjid.capacity, 0),
    established: toNumber(masjid.established, new Date().getFullYear()),
    amenities: Array.isArray(masjid.amenities)
      ? masjid.amenities
      : String(masjid.amenities || '')
          .split(',')
          .map(item => item.trim())
          .filter(Boolean),
  };
}

export function getCustomMasjids() {
  try {
    const storedMasjids = JSON.parse(localStorage.getItem(CUSTOM_MASJIDS_KEY) || '[]');
    return Array.isArray(storedMasjids)
      ? storedMasjids.map((masjid, index) => normalizeMasjid(masjid, Date.now() + index))
      : [];
  } catch (error) {
    return [];
  }
}

export function saveCustomMasjids(masjids) {
  localStorage.setItem(CUSTOM_MASJIDS_KEY, JSON.stringify(masjids));
}

export function getAllMasjids() {
  return [...baseMasjids, ...getCustomMasjids()];
}

export function createMasjid(masjid) {
  const customMasjids = getCustomMasjids();
  const nextId = Math.max(0, ...baseMasjids.map(item => Number(item.id)), ...customMasjids.map(item => Number(item.id))) + 1;
  const nextMasjid = normalizeMasjid({ ...masjid, id: nextId }, nextId);
  saveCustomMasjids([...customMasjids, nextMasjid]);
  return nextMasjid;
}

export function updateMasjid(id, masjid) {
  const numericId = Number(id);
  const customMasjids = getCustomMasjids();
  const nextMasjids = customMasjids.map(item =>
    Number(item.id) === numericId ? normalizeMasjid({ ...item, ...masjid, id: numericId }, numericId) : item
  );
  saveCustomMasjids(nextMasjids);
}

export function deleteMasjid(id) {
  const numericId = Number(id);
  saveCustomMasjids(getCustomMasjids().filter(masjid => Number(masjid.id) !== numericId));
}
