import { useCallback, useEffect, useState } from 'react';
import { getAllMasjids } from '../services/masjidStore';

export default function useMasjidsApi() {
  const [masjids, setMasjids] = useState(getAllMasjids);
  const [loading, setLoading] = useState(false);
  const [error] = useState('');

  const refreshMasjids = useCallback(() => {
    setLoading(true);
    setMasjids(getAllMasjids());
    setLoading(false);
  }, []);

  useEffect(() => {
    refreshMasjids();
  }, [refreshMasjids]);

  return { masjids, loading, error, refreshMasjids };
}
