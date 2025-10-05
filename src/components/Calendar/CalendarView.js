import React, { useEffect, useState } from 'react';
import { Calendar } from 'react-native-calendars';
import { CustomDayComponent } from './CustomDayComponent';
import { calendarStyles } from './CalendarStyles';
import { colors, typography } from '../../utils/constants';

/**
 * Main Calendar View Component
 * Wraps the react-native-calendars Calendar with custom day components and theming
 */
export function CalendarView({ 
  marks, 
  onDayPress, 
  onLongPress,
  enableSwipeMonths = true,
  current = null
}) {
  // Internal state to track the current month for navigation
  // Initialize with current prop or today's date
  const getInitialMonth = () => {
    if (current && typeof current === 'string' && current.length > 0) {
      return current;
    }
    // Fallback to today's date
    const today = new Date();
    return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-01`;
  };
  
  const [currentMonth, setCurrentMonth] = useState(getInitialMonth());
  
  // Update internal state when current prop changes
  useEffect(() => {
    if (current && typeof current === 'string' && current.length > 0) {
      console.log('CalendarView: Updating currentMonth to:', current);
      setCurrentMonth(current);
    }
  }, [current]);
  
  // Debug logging (can be removed after testing)
  console.log('CalendarView - current prop:', current);
  console.log('CalendarView - currentMonth state:', currentMonth);
  
  return (
    <Calendar 
      key={currentMonth || 'default'} // Force re-render when month changes
      enableSwipeMonths={enableSwipeMonths}
      onDayPress={onDayPress}
      markingType={'custom'}
      markedDates={marks}
      current={currentMonth}
      style={calendarStyles.calendar}
      dayComponent={({ date, state, marking }) => (
        <CustomDayComponent 
          date={date} 
          state={state} 
          marking={marking}
          onPress={onDayPress}
          onLongPress={onLongPress}
        />
      )}
      theme={{
        selectedDayBackgroundColor: 'transparent',
        selectedDayTextColor: colors.primary,
        todayTextColor: colors.primary,
        dayTextColor: colors.textPrimary,
        textDisabledColor: '#d9e1e8',
        dotColor: '#00adf5',
        selectedDotColor: '#ffffff',
        arrowColor: colors.primary,
        monthTextColor: colors.primary,
        indicatorColor: colors.primary,
        textDayFontWeight: typography.weights.light,
        textMonthFontWeight: typography.weights.bold,
        textDayHeaderFontWeight: typography.weights.light,
        textDayFontSize: typography.sizes.lg,
        textMonthFontSize: typography.sizes.lg,
        textDayHeaderFontSize: typography.sizes.md,
      }}
    />
  );
}
