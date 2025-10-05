import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Storage utility functions for persisting user preferences
 */

const STORAGE_KEYS = {
  CARD_SETTINGS: 'cardSettings',
};

/**
 * Save data to AsyncStorage
 * @param {string} key - Storage key
 * @param {any} data - Data to save
 */
export const saveToStorage = async (key, data) => {
  try {
    const jsonData = JSON.stringify(data);
    await AsyncStorage.setItem(key, jsonData);
    return true;
  } catch (error) {
    console.error('Error saving to storage:', error);
    return false;
  }
};

/**
 * Load data from AsyncStorage
 * @param {string} key - Storage key
 * @param {any} defaultValue - Default value if key doesn't exist
 * @returns {any} Loaded data or default value
 */
export const loadFromStorage = async (key, defaultValue = null) => {
  try {
    const jsonData = await AsyncStorage.getItem(key);
    if (jsonData !== null) {
      return JSON.parse(jsonData);
    }
    return defaultValue;
  } catch (error) {
    console.error('Error loading from storage:', error);
    return defaultValue;
  }
};

/**
 * Remove data from AsyncStorage
 * @param {string} key - Storage key
 */
export const removeFromStorage = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error('Error removing from storage:', error);
    return false;
  }
};

/**
 * Save card settings to storage
 * @param {Object} cardSettings - Card settings object
 */
export const saveCardSettings = async (cardSettings) => {
  return await saveToStorage(STORAGE_KEYS.CARD_SETTINGS, cardSettings);
};

/**
 * Load card settings from storage
 * @param {Object} defaultSettings - Default card settings
 * @returns {Object} Card settings
 */
export const loadCardSettings = async (defaultSettings) => {
  return await loadFromStorage(STORAGE_KEYS.CARD_SETTINGS, defaultSettings);
};
