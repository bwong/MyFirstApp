import { useState, useCallback } from 'react';

/**
 * Custom hook for managing app navigation state
 * Handles screen transitions between calendar and settings
 */
export function useNavigationState() {
  const [settingsModalVisible, setSettingsModalVisible] = useState(false);

  // Open settings modal
  const openSettingsModal = useCallback(() => {
    setSettingsModalVisible(true);
  }, []);

  // Close settings modal
  const closeSettingsModal = useCallback(() => {
    setSettingsModalVisible(false);
  }, []);

  return {
    settingsModalVisible,
    openSettingsModal,
    closeSettingsModal,
  };
}
