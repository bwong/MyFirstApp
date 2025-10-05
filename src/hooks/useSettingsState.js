import { useState, useEffect, useCallback } from 'react';
import { saveCardSettings, loadCardSettings } from '../utils/storageUtils';

/**
 * Default card settings - all cards visible in default order
 */
const DEFAULT_CARD_SETTINGS = {
  basics: {
    visible: true,
    order: 0,
  },
  symptoms: {
    visible: true,
    order: 1,
  },
  intimacy: {
    visible: true,
    order: 2,
  },
  fertility: {
    visible: true,
    order: 3,
  },
};

/**
 * Custom hook for managing card settings with persistent storage
 */
export function useSettingsState() {
  const [cardSettings, setCardSettings] = useState(DEFAULT_CARD_SETTINGS);
  const [isLoading, setIsLoading] = useState(true);

  // Load settings from storage on mount
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const savedSettings = await loadCardSettings(DEFAULT_CARD_SETTINGS);
        
        // Migrate settings if new cards are added
        const migratedSettings = migrateSettings(savedSettings, DEFAULT_CARD_SETTINGS);
        
        setCardSettings(migratedSettings);
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading card settings:', error);
        setCardSettings(DEFAULT_CARD_SETTINGS);
        setIsLoading(false);
      }
    };

    loadSettings();
  }, []);

  // Save settings to storage whenever they change
  useEffect(() => {
    if (!isLoading) {
      saveCardSettings(cardSettings);
    }
  }, [cardSettings, isLoading]);

  /**
   * Migrate settings to handle new cards added in app updates
   * @param {Object} savedSettings - Previously saved settings
   * @param {Object} defaultSettings - Current default settings
   * @returns {Object} Migrated settings
   */
  const migrateSettings = useCallback((savedSettings, defaultSettings) => {
    const migrated = { ...defaultSettings };
    
    // Keep existing user preferences
    Object.keys(savedSettings).forEach(cardId => {
      if (migrated[cardId]) {
        migrated[cardId] = { ...migrated[cardId], ...savedSettings[cardId] };
      }
    });
    
    return migrated;
  }, []);

  /**
   * Toggle card visibility
   * @param {string} cardId - Card identifier
   */
  const toggleCardVisibility = useCallback((cardId) => {
    setCardSettings(prev => ({
      ...prev,
      [cardId]: {
        ...prev[cardId],
        visible: !prev[cardId].visible,
      },
    }));
  }, []);

  /**
   * Move card up in order
   * @param {string} cardId - Card identifier
   */
  const moveCardUp = useCallback((cardId) => {
    setCardSettings(prev => {
      const currentOrder = prev[cardId].order;
      if (currentOrder === 0) return prev; // Already at top
      
      const newSettings = { ...prev };
      
      // Find the card above and swap orders
      Object.keys(newSettings).forEach(id => {
        if (newSettings[id].order === currentOrder - 1) {
          newSettings[id].order = currentOrder;
          newSettings[cardId].order = currentOrder - 1;
        }
      });
      
      return newSettings;
    });
  }, []);

  /**
   * Move card down in order
   * @param {string} cardId - Card identifier
   */
  const moveCardDown = useCallback((cardId) => {
    setCardSettings(prev => {
      const currentOrder = prev[cardId].order;
      const maxOrder = Math.max(...Object.values(prev).map(s => s.order));
      
      if (currentOrder === maxOrder) return prev; // Already at bottom
      
      const newSettings = { ...prev };
      
      // Find the card below and swap orders
      Object.keys(newSettings).forEach(id => {
        if (newSettings[id].order === currentOrder + 1) {
          newSettings[id].order = currentOrder;
          newSettings[cardId].order = currentOrder + 1;
        }
      });
      
      return newSettings;
    });
  }, []);

  /**
   * Reset all settings to default
   */
  const resetToDefaults = useCallback(() => {
    setCardSettings(DEFAULT_CARD_SETTINGS);
  }, []);

  /**
   * Get visible cards in order
   * @returns {Array} Array of card IDs in order
   */
  const getVisibleCardsInOrder = useCallback(() => {
    return Object.entries(cardSettings)
      .filter(([, settings]) => settings.visible)
      .sort(([, a], [, b]) => a.order - b.order)
      .map(([cardId]) => cardId);
  }, [cardSettings]);

  /**
   * Get all cards in order (visible and hidden)
   * @returns {Array} Array of card IDs in order
   */
  const getAllCardsInOrder = useCallback(() => {
    return Object.entries(cardSettings)
      .sort(([, a], [, b]) => a.order - b.order)
      .map(([cardId]) => cardId);
  }, [cardSettings]);

  return {
    cardSettings,
    isLoading,
    toggleCardVisibility,
    moveCardUp,
    moveCardDown,
    resetToDefaults,
    getVisibleCardsInOrder,
    getAllCardsInOrder,
  };
}
