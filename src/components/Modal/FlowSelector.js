import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { colors, spacing, borderRadius, typography } from '../../utils/constants';

/**
 * Flow Selector Component
 * Segmented control for selecting menstrual flow level
 */

const FLOW_OPTIONS = [
  { id: 'none', label: 'None', color: '#E5E7EB' },      // Gray
  { id: 'spotting', label: 'Spotting', color: '#FED7E2' }, // Light Pink
  { id: 'light', label: 'Light', color: '#FBB6CE' },     // Pink
  { id: 'medium', label: 'Medium', color: '#F687B3' },   // Red-Pink
  { id: 'heavy', label: 'Heavy', color: '#D53F8C' },     // Deep Red/Pink
];

export function FlowSelector({ value, onChange }) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Flow</Text>
      <View style={styles.segmentedControl}>
        {FLOW_OPTIONS.map((option, index) => {
          const isSelected = value === option.id;
          const isFirst = index === 0;
          const isLast = index === FLOW_OPTIONS.length - 1;
          
          return (
            <Pressable
              key={option.id}
              style={[
                styles.segment,
                isFirst && styles.segmentFirst,
                isLast && styles.segmentLast,
                isSelected && { backgroundColor: option.color },
                !isSelected && styles.segmentUnselected,
              ]}
              onPress={() => onChange(option.id)}
            >
              <Text
                style={[
                  styles.segmentText,
                  isSelected && styles.segmentTextSelected,
                  isSelected && option.id === 'heavy' && styles.segmentTextWhite,
                ]}
              >
                {option.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
  },
  label: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.medium,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  segmentedControl: {
    flexDirection: 'row',
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  segment: {
    flex: 1,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xs,
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 1,
    borderRightColor: colors.border,
  },
  segmentFirst: {
    // No additional styles needed, handled by parent borderRadius
  },
  segmentLast: {
    borderRightWidth: 0,
  },
  segmentUnselected: {
    backgroundColor: colors.background,
  },
  segmentText: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  segmentTextSelected: {
    fontWeight: typography.weights.semibold,
    color: colors.textPrimary,
  },
  segmentTextWhite: {
    color: '#FFFFFF', // White text for heavy flow (dark background)
  },
});

