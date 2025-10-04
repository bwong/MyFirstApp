import { useState, useCallback } from 'react';

/**
 * Custom hook for managing modal state including visibility and selected date
 */
export function useModalState() {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalDate, setModalDate] = useState(null);

  // Open modal with a specific date
  const openModal = useCallback(({ dateString, year, month, day }) => {
    setModalDate({ dateString, year, month, day });
    setModalVisible(true);
  }, []);

  // Close modal and clear date
  const closeModal = useCallback(() => {
    setModalVisible(false);
    setModalDate(null);
  }, []);

  // Toggle modal visibility
  const toggleModal = useCallback(() => {
    setModalVisible(!modalVisible);
  }, [modalVisible]);

  return {
    modalVisible,
    modalDate,
    openModal,
    closeModal,
    toggleModal,
    setModalVisible,
    setModalDate,
  };
}
