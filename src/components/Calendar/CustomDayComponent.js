import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { colors, typography, cellSize } from '../../utils/constants';

/**
 * Custom Day Component for enhanced marking capabilities
 * Renders individual calendar day cells with custom styling and multiple marks support
 */
export function CustomDayComponent({ date, state, marking, onPress, onLongPress }) {
  const isSelected = marking?.selected;
  const hasDots = marking?.dots && marking.dots.length > 0;
  const hasMark = marking?.marked;
  
  // Merge custom styles with default styles
  const containerStyle = [
    styles.dayContainer,
    marking?.customStyles?.container,
    isSelected && styles.selectedDay
  ];
  
  const textStyle = [
    styles.dayText,
    marking?.customStyles?.text,
    isSelected && styles.selectedDayText
  ];

  return (
    <Pressable 
      style={containerStyle}
      onPress={() => onPress && onPress({ dateString: date.dateString, year: date.year, month: date.month, day: date.day })}
      onLongPress={() => onLongPress && onLongPress({ dateString: date.dateString, year: date.year, month: date.month, day: date.day })}
    >
      <Text style={textStyle}>{date.day}</Text>
      
      {/* Render multiple dots */}
      {hasDots && (
        <View style={styles.dotsContainer}>
          {marking.dots.slice(0, 3).map((dot, index) => (
            <View 
              key={dot.key || index}
              style={[
                styles.dot,
                { backgroundColor: dot.color }
              ]} 
            />
          ))}
          {marking.dots.length > 3 && (
            <Text style={styles.moreDotsText}>+{marking.dots.length - 3}</Text>
          )}
        </View>
      )}
      
      {/* Single mark dot */}
      {hasMark && !hasDots && (
        <View style={[styles.singleDot, { backgroundColor: marking.dotColor }]} />
      )}
    </Pressable>
  );
}

// Styles for the CustomDayComponent
const styles = {
  dayContainer: {
    width: cellSize,
    height: cellSize,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderStyle: 'solid',
    borderRadius: 5,
    marginTop: -14,
    position: 'relative',
  },
  dayText: {
    fontSize: 16,
    color: colors.textPrimary,
    fontWeight: typography.weights.light,
  },
  selectedDay: {
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 5,
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
    marginLeft: 2,
  },
};
