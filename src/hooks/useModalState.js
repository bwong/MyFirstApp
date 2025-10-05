import { useState, useCallback } from 'react';
import { createDateString } from '../utils/dateUtils';

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

  // Open modal for current day (today)
  const openModalForCurrentDay = useCallback(() => {
    const today = new Date();
    const currentDate = {
      year: today.getFullYear(),
      month: today.getMonth() + 1, // getMonth() returns 0-11, we need 1-12
      day: today.getDate(),
      dateString: createDateString({
        year: today.getFullYear(),
        month: today.getMonth() + 1,
        day: today.getDate(),
      }),
    };
    openModal(currentDate);
  }, [openModal]);

  return {
    modalVisible,
    modalDate,
    openModal,
    closeModal,
    toggleModal,
    openModalForCurrentDay,
    setModalVisible,
    setModalDate,
  };
}
