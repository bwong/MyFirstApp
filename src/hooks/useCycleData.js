import { useState, useEffect, useCallback } from 'react';
import { loadFromStorage, saveToStorage } from '../utils/storageUtils';

const STORAGE_KEY = 'cycle_data';

/**
 * Custom hook for managing cycle data with persistent storage
 * 
 * Data Structure:
 * {
 *   "2025-10-02": {
 *     date: "2025-10-02",
 *     cycle: { flow: "medium" },
 *     wellness: null,
 *     intimacy: null,
 *     fertility: null,
 *     created_at: "2025-10-02T10:30:00Z",
 *     updated_at: "2025-10-02T10:35:00Z",
 *     version: "1.0.0"
 *   }
 * }
 */
export function useCycleData() {
  const [cycleData, setCycleData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // Load data from storage on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const savedData = await loadFromStorage(STORAGE_KEY, {});
        setCycleData(savedData);
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading cycle data:', error);
        setCycleData({});
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // Save data to storage whenever it changes
  useEffect(() => {
    if (!isLoading) {
      saveToStorage(STORAGE_KEY, cycleData);
    }
  }, [cycleData, isLoading]);

  /**
   * Get data for a specific date
   * @param {string} dateString - Date in YYYY-MM-DD format
   * @returns {Object|null} Date entry or null if no data
   */
  const getDataForDate = useCallback((dateString) => {
    if (!dateString) return null;
    return cycleData[dateString] || null;
  }, [cycleData]);

  /**
   * Get flow value for a specific date
   * @param {string} dateString - Date in YYYY-MM-DD format
   * @returns {string} Flow value or 'none'
   */
  const getFlowForDate = useCallback((dateString) => {
    if (!dateString) return 'none';
    const data = cycleData[dateString];
    return data?.cycle?.flow || 'none';
  }, [cycleData]);

  /**
   * Update cycle data for a specific date
   * @param {string} dateString - Date in YYYY-MM-DD format
   * @param {string} category - Category (cycle, wellness, intimacy, fertility)
   * @param {Object} data - Data to update
   */
  const updateDateData = useCallback((dateString, category, data) => {
    if (!dateString || !category) return;

    setCycleData(prev => {
      const existingEntry = prev[dateString];
      const now = new Date().toISOString();

      // Create new entry or update existing
      const updatedEntry = {
        ...existingEntry,
        date: dateString,
        [category]: {
          ...(existingEntry?.[category] || {}),
          ...data,
        },
        created_at: existingEntry?.created_at || now,
        updated_at: now,
        version: '1.0.0',
      };

      // Remove null/undefined fields from category data
      Object.keys(updatedEntry[category]).forEach(key => {
        if (updatedEntry[category][key] === null || updatedEntry[category][key] === undefined) {
          delete updatedEntry[category][key];
        }
      });

      // Remove empty category objects
      if (Object.keys(updatedEntry[category]).length === 0) {
        delete updatedEntry[category];
      }

      return {
        ...prev,
        [dateString]: updatedEntry,
      };
    });
  }, []);

  /**
   * Set flow value for a specific date
   * @param {string} dateString - Date in YYYY-MM-DD format
   * @param {string} value - Flow value
   */
  const setFlowForDate = useCallback((dateString, value) => {
    if (!dateString) return;

    // If setting to 'none', remove the flow field
    if (value === 'none') {
      updateDateData(dateString, 'cycle', { flow: null });
    } else {
      updateDateData(dateString, 'cycle', { flow: value });
    }
  }, [updateDateData]);

  /**
   * Clear all data for a specific date
   * @param {string} dateString - Date in YYYY-MM-DD format
   */
  const clearDataForDate = useCallback((dateString) => {
    if (!dateString) return;

    setCycleData(prev => {
      const newData = { ...prev };
      delete newData[dateString];
      return newData;
    });
  }, []);

  /**
   * Get all dates with data
   * @returns {Array} Array of date strings
   */
  const getAllDatesWithData = useCallback(() => {
    return Object.keys(cycleData);
  }, [cycleData]);

  /**
   * Get all entries as array (for filtering, export, etc.)
   * @returns {Array} Array of date entries
   */
  const getAllEntries = useCallback(() => {
    return Object.values(cycleData).sort((a, b) => a.date.localeCompare(b.date));
  }, [cycleData]);

  /**
   * Get entries within a date range
   * @param {string} startDate - Start date (YYYY-MM-DD)
   * @param {string} endDate - End date (YYYY-MM-DD)
   * @returns {Array} Array of date entries
   */
  const getEntriesInRange = useCallback((startDate, endDate) => {
    return Object.values(cycleData)
      .filter(entry => entry.date >= startDate && entry.date <= endDate)
      .sort((a, b) => a.date.localeCompare(b.date));
  }, [cycleData]);

  /**
   * Export all data (for backup/export feature)
   * @returns {Object} All cycle data
   */
  const exportData = useCallback(() => {
    return {
      version: '1.0.0',
      exported_at: new Date().toISOString(),
      data: cycleData,
    };
  }, [cycleData]);

  /**
   * Import data (for restore/sync feature)
   * @param {Object} importedData - Data to import
   * @param {boolean} merge - Whether to merge with existing data
   */
  const importData = useCallback((importedData, merge = true) => {
    if (!importedData?.data) return;

    if (merge) {
      setCycleData(prev => ({
        ...prev,
        ...importedData.data,
      }));
    } else {
      setCycleData(importedData.data);
    }
  }, []);

  return {
    cycleData,
    isLoading,
    getDataForDate,
    getFlowForDate,
    setFlowForDate,
    updateDateData,
    clearDataForDate,
    getAllDatesWithData,
    getAllEntries,
    getEntriesInRange,
    exportData,
    importData,
  };
}

