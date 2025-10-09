import React, { useState, useRef } from 'react';
import { View, Text, Pressable, TextInput, StyleSheet, Platform } from 'react-native';
import { TimePicker } from './TimePicker';
import { colors, spacing, borderRadius, typography } from '../../utils/constants';

/**
 * FertilityTracker Component
 * Allows users to track fertility-related data
 */

const CERVICAL_FLUID_OPTIONS = [
  { id: 'none', label: 'None' },
  { id: 'dry', label: 'Dry' },
  { id: 'sticky', label: 'Sticky' },
  { id: 'creamy', label: 'Creamy' },
  { id: 'watery', label: 'Watery' },
  { id: 'egg_white', label: 'Egg White' },
];

export function FertilityTracker({ data = {}, onChange, temperatureUnit = 'F', scrollViewRef }) {
  const supplementInputRef = useRef(null);
  const notesInputRef = useRef(null);
  
  /**
   * Update a field in the fertility data
   */
  const updateField = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  /**
   * Handle input focus - scroll to make it visible
   */
  const handleInputFocus = (inputRef) => {
    if (scrollViewRef?.current && inputRef?.current) {
      // Small delay to ensure keyboard is shown
      setTimeout(() => {
        inputRef.current?.measureLayout(
          scrollViewRef.current,
          (x, y) => {
            scrollViewRef.current?.scrollTo({
              y: y - 100, // Offset to show input above keyboard with some padding
              animated: true,
            });
          }
        );
      }, 100);
    }
  };

  /**
   * Add a supplement tag
   */
  const handleAddSupplement = (supplement) => {
    const currentSupplements = data.supplements || [];
    if (!currentSupplements.includes(supplement) && supplement.trim() !== '') {
      updateField('supplements', [...currentSupplements, supplement]);
    }
  };

  /**
   * Remove a supplement tag
   */
  const handleRemoveSupplement = (supplement) => {
    const currentSupplements = data.supplements || [];
    updateField('supplements', currentSupplements.filter(s => s !== supplement));
  };

  const [supplementInput, setSupplementInput] = useState('');

  return (
    <View style={styles.container}>
      {/* BBT Section */}
      <View style={styles.section}>
        <Text style={styles.label}>BBT (Basal Body Temperature)</Text>
        <View style={styles.bbtRow}>
          <TextInput
            style={styles.bbtInput}
            value={data.bbt ? String(data.bbt) : ''}
            onChangeText={(text) => {
              const value = text.replace(/[^0-9.]/g, '');
              updateField('bbt', value);
            }}
            placeholder={`e.g., 98.6`}
            keyboardType="decimal-pad"
            placeholderTextColor={colors.textLight}
          />
          <Text style={styles.unitText}>°{temperatureUnit}</Text>
        </View>
        
        <TimePicker
          value={data.bbt_time}
          onChange={(time) => updateField('bbt_time', time.toISOString())}
          placeholder="Set Time"
        />
      </View>

      {/* Cervical Fluid Selector */}
      <View style={styles.section}>
        <Text style={styles.label}>Cervical Fluid</Text>
        <View style={styles.segmentedControl}>
          {CERVICAL_FLUID_OPTIONS.map((option, index) => {
            const isSelected = data.cervical_fluid === option.id;
            const isFirst = index === 0;
            const isLast = index === CERVICAL_FLUID_OPTIONS.length - 1;
            
            return (
              <Pressable
                key={option.id}
                style={[
                  styles.segment,
                  isFirst && styles.segmentFirst,
                  isLast && styles.segmentLast,
                  isSelected && styles.segmentSelected,
                ]}
                onPress={() => updateField('cervical_fluid', option.id)}
              >
                <Text
                  style={[
                    styles.segmentText,
                    isSelected && styles.segmentTextSelected,
                  ]}
                >
                  {option.label}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      {/* OPK Result */}
      <View style={styles.section}>
        <Text style={styles.label}>OPK Result (Ovulation Predictor Kit)</Text>
        <View style={styles.binarySelector}>
          <Pressable
            style={[
              styles.binaryButton,
              styles.binaryButtonLeft,
              data.opk === 'negative' && styles.binaryButtonSelected,
            ]}
            onPress={() => updateField('opk', 'negative')}
          >
            <Text style={[
              styles.binaryButtonText,
              data.opk === 'negative' && styles.binaryButtonTextSelected,
            ]}>
              Negative
            </Text>
          </Pressable>
          
          <Pressable
            style={[
              styles.binaryButton,
              styles.binaryButtonRight,
              data.opk === 'positive' && styles.binaryButtonSelected,
            ]}
            onPress={() => updateField('opk', 'positive')}
          >
            <Text style={[
              styles.binaryButtonText,
              data.opk === 'positive' && styles.binaryButtonTextSelected,
            ]}>
              Positive
            </Text>
          </Pressable>
        </View>
      </View>

      {/* Pregnancy Test */}
      <View style={styles.section}>
        <Text style={styles.label}>Pregnancy Test</Text>
        <View style={styles.binarySelector}>
          <Pressable
            style={[
              styles.binaryButton,
              styles.binaryButtonLeft,
              data.pregnancy_test === 'negative' && styles.binaryButtonSelected,
            ]}
            onPress={() => updateField('pregnancy_test', 'negative')}
          >
            <Text style={[
              styles.binaryButtonText,
              data.pregnancy_test === 'negative' && styles.binaryButtonTextSelected,
            ]}>
              Negative
            </Text>
          </Pressable>
          
          <Pressable
            style={[
              styles.binaryButton,
              styles.binaryButtonRight,
              data.pregnancy_test === 'positive' && styles.binaryButtonSelected,
            ]}
            onPress={() => updateField('pregnancy_test', 'positive')}
          >
            <Text style={[
              styles.binaryButtonText,
              data.pregnancy_test === 'positive' && styles.binaryButtonTextSelected,
            ]}>
              Positive
            </Text>
          </Pressable>
        </View>
      </View>

      {/* Supplements/Methods */}
      <View style={styles.section}>
        <Text style={styles.label}>Supplements/Methods</Text>
        
        {/* Tag Input */}
        <View style={styles.tagInputRow} ref={supplementInputRef}>
          <TextInput
            style={styles.tagInput}
            value={supplementInput}
            onChangeText={setSupplementInput}
            placeholder="Add supplement..."
            placeholderTextColor={colors.textLight}
            returnKeyType="done"
            onFocus={() => handleInputFocus(supplementInputRef)}
            onSubmitEditing={() => {
              if (supplementInput.trim()) {
                handleAddSupplement(supplementInput.trim());
                setSupplementInput('');
              }
            }}
          />
          <Pressable
            style={styles.addTagButton}
            onPress={() => {
              if (supplementInput.trim()) {
                handleAddSupplement(supplementInput.trim());
                setSupplementInput('');
              }
            }}
          >
            <Text style={styles.addTagButtonText}>Add</Text>
          </Pressable>
        </View>

        {/* Tag List */}
        {data.supplements && data.supplements.length > 0 && (
          <View style={styles.tagList}>
            {data.supplements.map((supplement, index) => (
              <View key={index} style={styles.tag}>
                <Text style={styles.tagText}>{supplement}</Text>
                <Pressable
                  style={styles.tagRemove}
                  onPress={() => handleRemoveSupplement(supplement)}
                >
                  <Text style={styles.tagRemoveText}>×</Text>
                </Pressable>
              </View>
            ))}
          </View>
        )}
      </View>

      {/* Notes Section */}
      <View style={styles.section} ref={notesInputRef}>
        <Text style={styles.label}>Notes (optional)</Text>
        <TextInput
          style={styles.notesInput}
          value={data.notes || ''}
          onChangeText={(text) => updateField('notes', text)}
          placeholder="Add any notes about fertility tracking..."
          multiline
          numberOfLines={3}
          placeholderTextColor={colors.textLight}
          textAlignVertical="top"
          onFocus={() => handleInputFocus(notesInputRef)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
  },
  section: {
    marginBottom: spacing.lg,
  },
  label: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.medium,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  bbtRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  bbtInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.sm,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    fontSize: typography.sizes.md,
    color: colors.textPrimary,
    backgroundColor: colors.background,
  },
  unitText: {
    fontSize: typography.sizes.md,
    color: colors.textSecondary,
    fontWeight: typography.weights.medium,
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
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.xs,
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 1,
    borderRightColor: colors.border,
    backgroundColor: colors.background,
  },
  segmentFirst: {
    // No additional styles needed
  },
  segmentLast: {
    borderRightWidth: 0,
  },
  segmentSelected: {
    backgroundColor: colors.primary,
  },
  segmentText: {
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.medium,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  segmentTextSelected: {
    fontWeight: typography.weights.semibold,
    color: colors.background,
  },
  binarySelector: {
    flexDirection: 'row',
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  binaryButton: {
    flex: 1,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
  binaryButtonLeft: {
    borderRightWidth: 1,
    borderRightColor: colors.border,
  },
  binaryButtonRight: {
    // No additional styles needed
  },
  binaryButtonSelected: {
    backgroundColor: colors.primary,
  },
  binaryButtonText: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.medium,
    color: colors.textSecondary,
  },
  binaryButtonTextSelected: {
    fontWeight: typography.weights.semibold,
    color: colors.background,
  },
  tagInputRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  tagInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.sm,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    fontSize: typography.sizes.md,
    color: colors.textPrimary,
    backgroundColor: colors.background,
  },
  addTagButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.sm,
    justifyContent: 'center',
  },
  addTagButtonText: {
    color: colors.background,
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.semibold,
  },
  tagList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    borderRadius: borderRadius.sm,
  },
  tagText: {
    fontSize: typography.sizes.sm,
    color: colors.background,
    marginRight: spacing.xs,
  },
  tagRemove: {
    paddingHorizontal: spacing.xs,
  },
  tagRemoveText: {
    fontSize: typography.sizes.md,
    color: colors.background,
    fontWeight: typography.weights.bold,
  },
  notesInput: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.sm,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    fontSize: typography.sizes.md,
    color: colors.textPrimary,
    backgroundColor: colors.background,
    minHeight: 80,
    textAlignVertical: 'top',
  },
});

