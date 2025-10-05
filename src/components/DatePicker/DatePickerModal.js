import React, { useState, useCallback, useEffect } from 'react';
import { Modal, View, Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft } from 'lucide-react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { datePickerModalStyles } from './DatePickerModalStyles';
import { formatLocalCivilDate } from '../../utils/dateUtils';

/**
 * Date Picker Modal Component
 * Allows users to select a date and navigate to it on the calendar
 */
export function DatePickerModal({ visible, onClose, onDateSelected }) {
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Reset to current date whenever modal becomes visible
  useEffect(() => {
    if (visible) {
      setSelectedDate(new Date());
    }
  }, [visible]);

  const handleGoToToday = useCallback(() => {
    const today = new Date();
    const dateObj = {
      year: today.getFullYear(),
      month: today.getMonth() + 1, // getMonth() returns 0-11, we need 1-12
      day: today.getDate(),
    };
    
    onDateSelected(dateObj);
    onClose();
  }, [onDateSelected, onClose]);

  const handleDateChange = (event, date) => {
    if (date) {
      setSelectedDate(date);
    }
  };

  const handleGoToDate = () => {
    if (!selectedDate) return;
    
    const dateObj = {
      year: selectedDate.getFullYear(),
      month: selectedDate.getMonth() + 1, // getMonth() returns 0-11, we need 1-12
      day: selectedDate.getDate(),
    };
    
    onDateSelected(dateObj);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <SafeAreaView style={datePickerModalStyles.modalContainer}>
        {/* Header with back button */}
        <View style={datePickerModalStyles.modalHeader}>
          <Pressable 
            style={datePickerModalStyles.modalBackButton}
            onPress={onClose}
          >
            <ArrowLeft 
              size={24}
              color={datePickerModalStyles.modalBackText.color}
            />
          </Pressable>
          
          <Text style={datePickerModalStyles.modalTitle}>Select a Date</Text>
          
          <View style={datePickerModalStyles.modalCloseButton} />
        </View>

        {/* Modal Content */}
        <View style={datePickerModalStyles.modalContent}>
          {/* Selected Date Display */}
          <Text style={datePickerModalStyles.selectedDateText}>
            {selectedDate ? formatLocalCivilDate({
              year: selectedDate.getFullYear(),
              month: selectedDate.getMonth() + 1,
              day: selectedDate.getDate(),
            }) : 'Select a date'}
          </Text>

          {/* Date Picker */}
          <View style={datePickerModalStyles.datePickerContainer}>
            <DateTimePicker
              value={selectedDate || new Date()}
              mode="date"
              display="default"
              onChange={handleDateChange}
              maximumDate={new Date(2100, 11, 31)} // Allow future dates
              minimumDate={new Date(1900, 0, 1)} // Allow past dates
            />
          </View>

                  {/* Action Buttons */}
                  <View style={datePickerModalStyles.buttonContainer}>
                    {/* Go to Today Button (Outlined) */}
                    <Pressable 
                      style={datePickerModalStyles.outlinedButton}
                      onPress={handleGoToToday}
                    >
                      <Text style={datePickerModalStyles.outlinedButtonText}>Go to Today</Text>
                    </Pressable>

                    {/* Go to Date Button (Primary) */}
                    <Pressable 
                      style={datePickerModalStyles.actionButton}
                      onPress={handleGoToDate}
                    >
                      <Text style={datePickerModalStyles.actionButtonText}>Go to Date</Text>
                    </Pressable>
                  </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
}
