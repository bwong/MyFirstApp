import React from 'react';
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
  enableSwipeMonths = true 
}) {
  return (
    <Calendar 
      enableSwipeMonths={enableSwipeMonths}
      onDayPress={onDayPress}
      markingType={'custom'}
      markedDates={marks}
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
