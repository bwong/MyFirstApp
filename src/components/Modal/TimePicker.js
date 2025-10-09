import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { colors, spacing, borderRadius, typography } from '../../utils/constants';

/**
 * TimePicker Component
 * Reusable time picker with platform-specific behavior
 */
export function TimePicker({ value, onChange, label, placeholder = 'Set Time' }) {
  const [showPicker, setShowPicker] = useState(false);

  /**
   * Format time for display
   */
  const formatTime = (timeValue) => {
    if (!timeValue) return placeholder;
    const date = typeof timeValue === 'string' ? new Date(timeValue) : timeValue;
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  /**
   * Handle time change from picker
   */
  const handleTimeChange = (event, selectedTime) => {
    // Close picker on Android
    if (Platform.OS === 'android') {
      setShowPicker(false);
    }
    
    // Only update if user selected a time (not cancelled)
    if (event.type === 'set' && selectedTime) {
      onChange(selectedTime);
    } else if (event.type === 'dismissed') {
      setShowPicker(false);
    }
  };

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      
      <Pressable 
        style={styles.timeButton}
        onPress={() => setShowPicker(true)}
      >
        <Text style={[
          styles.timeButtonText,
          !value && styles.timeButtonPlaceholder
        ]}>
          {formatTime(value)} ⏰
        </Text>
      </Pressable>
      
      {showPicker && (
        <View style={styles.timePickerContainer}>
          <DateTimePicker
            value={value ? (typeof value === 'string' ? new Date(value) : value) : new Date()}
            mode="time"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={handleTimeChange}
            style={styles.timePicker}
          />
          {Platform.OS === 'ios' && (
            <Pressable 
              style={styles.setTimeButton}
              onPress={() => setShowPicker(false)}
            >
              <Text style={styles.setTimeButtonText}>Set Time</Text>
            </Pressable>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.sm,
  },
  label: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.medium,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  timeButton: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.sm,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.background,
  },
  timeButtonText: {
    fontSize: typography.sizes.sm,
    color: colors.textPrimary,
  },
  timeButtonPlaceholder: {
    color: colors.textLight,
  },
  timePickerContainer: {
    marginTop: spacing.sm,
    alignItems: 'center',
  },
  timePicker: {
    width: '100%',
  },
  setTimeButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.xl,
    borderRadius: borderRadius.md,
    marginTop: spacing.sm,
    alignSelf: 'center',
  },
  setTimeButtonText: {
    color: colors.background,
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.semibold,
  },
});

