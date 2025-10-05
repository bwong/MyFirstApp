import { useState, useCallback } from 'react';

/**
 * Custom hook for managing app navigation state
 * Handles screen transitions between calendar and settings
 */
export function useNavigationState() {
  const [settingsModalVisible, setSettingsModalVisible] = useState(false);
  const [datePickerModalVisible, setDatePickerModalVisible] = useState(false);
  const [dataEntryPreferencesVisible, setDataEntryPreferencesVisible] = useState(false);

  // Open settings modal
  const openSettingsModal = useCallback(() => {
    setSettingsModalVisible(true);
  }, []);

  // Close settings modal
  const closeSettingsModal = useCallback(() => {
    setSettingsModalVisible(false);
  }, []);

  // Open date picker modal
  const openDatePickerModal = useCallback(() => {
    setDatePickerModalVisible(true);
  }, []);

  // Close date picker modal
  const closeDatePickerModal = useCallback(() => {
    setDatePickerModalVisible(false);
  }, []);

  // Open data entry preferences screen
  const openDataEntryPreferences = useCallback(() => {
    setDataEntryPreferencesVisible(true);
  }, []);

  // Close data entry preferences screen
  const closeDataEntryPreferences = useCallback(() => {
    setDataEntryPreferencesVisible(false);
  }, []);

  return {
    settingsModalVisible,
    openSettingsModal,
    closeSettingsModal,
    datePickerModalVisible,
    openDatePickerModal,
    closeDatePickerModal,
    dataEntryPreferencesVisible,
    openDataEntryPreferences,
    closeDataEntryPreferences,
  };
}
