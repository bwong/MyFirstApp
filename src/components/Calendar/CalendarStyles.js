import { StyleSheet } from 'react-native';
import { colors, spacing, borderRadius, typography, cellSize } from '../../utils/constants';

/**
 * Calendar-specific styles
 */
export const calendarStyles = StyleSheet.create({
  // Calendar container
  calendar: {
    // Add any calendar-specific styles here
  },
  
  // Custom Day Component Styles
  dayContainer: {
    width: cellSize,
    height: cellSize,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderStyle: 'solid',
    borderRadius: borderRadius.sm,
    marginTop: -14,
    position: 'relative',
  },
  dayText: {
    fontSize: typography.sizes.lg,
    color: colors.textPrimary,
    fontWeight: typography.weights.light,
  },
  selectedDay: {
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: borderRadius.sm,
    backgroundColor: 'transparent',
  },
  selectedDayText: {
    color: colors.primary,
    fontWeight: typography.weights.bold,
  },
  
  // Dots Styles
  dotsContainer: {
    position: 'absolute',
    bottom: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 1,
  },
  singleDot: {
    position: 'absolute',
    bottom: 5,
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  moreDotsText: {
    fontSize: typography.sizes.xs,
    color: colors.textSecondary,
    marginLeft: spacing.xs,
  },
});
