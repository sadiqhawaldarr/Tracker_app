import { useCallback, useState } from 'react';

export default function useSelectedMasjid() {
  const [selectedMasjid, setSelectedMasjid] = useState(null);

  const openMasjid = useCallback(masjid => {
    setSelectedMasjid(masjid);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const closeMasjid = useCallback(() => {
    setSelectedMasjid(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return { selectedMasjid, openMasjid, closeMasjid };
}
