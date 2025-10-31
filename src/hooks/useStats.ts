import { useState, useEffect } from 'react';

interface Stats {
  totalTokensDeployed: number;
  totalTransactions: number;
  activeUsers: number;
  totalVolume: string;
}

const STATS_STORAGE_KEY = 'mintara_stats';
const LAST_UPDATE_KEY = 'mintara_stats_last_update';

// Initialize with realistic starting values
const INITIAL_STATS: Stats = {
  totalTokensDeployed: 10,
  totalTransactions: 10,
  activeUsers: 10,
  totalVolume: '0.5',
};

export const useStats = () => {
  const [stats, setStats] = useState<Stats>(() => {
    // Try to load from localStorage
    const stored = localStorage.getItem(STATS_STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return INITIAL_STATS;
      }
    }
    return INITIAL_STATS;
  });

  // Save to localStorage whenever stats change
  useEffect(() => {
    localStorage.setItem(STATS_STORAGE_KEY, JSON.stringify(stats));
  }, [stats]);

  // Increment stats when certain actions occur
  const incrementTokensDeployed = () => {
    setStats(prev => ({
      ...prev,
      totalTokensDeployed: prev.totalTokensDeployed + 1,
      totalTransactions: prev.totalTransactions + 1,
    }));
  };

  const incrementTransaction = () => {
    setStats(prev => ({
      ...prev,
      totalTransactions: prev.totalTransactions + 1,
    }));
  };

  const incrementActiveUsers = () => {
    setStats(prev => ({
      ...prev,
      activeUsers: prev.activeUsers + 1,
    }));
  };

  const addVolume = (amount: number) => {
    setStats(prev => ({
      ...prev,
      totalVolume: (parseFloat(prev.totalVolume) + amount).toFixed(1),
    }));
  };

  // Simulate organic growth (optional - можно включить для реалистичности)
  useEffect(() => {
    const lastUpdate = localStorage.getItem(LAST_UPDATE_KEY);
    const now = Date.now();
    const DAY_IN_MS = 24 * 60 * 60 * 1000;

    if (lastUpdate) {
      const daysSinceUpdate = Math.floor((now - parseInt(lastUpdate)) / DAY_IN_MS);
      
      if (daysSinceUpdate > 0) {
        // Organic growth per day (more realistic growth)
        setStats(prev => ({
          totalTokensDeployed: prev.totalTokensDeployed + (daysSinceUpdate * 3),
          totalTransactions: prev.totalTransactions + (daysSinceUpdate * 25),
          activeUsers: prev.activeUsers + (daysSinceUpdate * 2),
          totalVolume: (parseFloat(prev.totalVolume) + (daysSinceUpdate * 0.8)).toFixed(1),
        }));
        
        localStorage.setItem(LAST_UPDATE_KEY, now.toString());
      }
    } else {
      localStorage.setItem(LAST_UPDATE_KEY, now.toString());
    }
  }, []);

  return {
    stats,
    incrementTokensDeployed,
    incrementTransaction,
    incrementActiveUsers,
    addVolume,
  };
};
