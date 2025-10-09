import React, { useState } from 'react';
import { View, Text, Pressable, TextInput, ScrollView, StyleSheet } from 'react-native';
import { TimePicker } from './TimePicker';
import { colors, spacing, borderRadius, typography } from '../../utils/constants';

/**
 * IntimacyTracker Component
 * Allows users to track intimacy entries with time, activities, protection, duration, and notes
 */

const ACTIVITY_OPTIONS = [
  { id: 'sex', label: 'Sex' },
  { id: 'oral', label: 'Oral' },
  { id: 'masturbation', label: 'Masturbation' },
  { id: 'anal', label: 'Anal' },
  { id: 'handjob', label: 'Hand Job' },
];

const PROTECTION_OPTIONS = [
  'None',
  'Condom',
  'Pill',
  'Patch',
  'IUD',
  'Withdrawal',
  'Fertility Awareness',
];

export function IntimacyTracker({ entries = [], onEntriesChange }) {
  /**
   * Add a new entry
   */
  const handleAddEntry = () => {
    const newEntry = {
      id: Date.now().toString(),
      time: new Date(), // Current time as default
      activities: [],
      protection: 'None',
      duration: '',
      notes: '',
    };
    onEntriesChange([newEntry, ...entries]); // Add to beginning (latest first)
  };

  /**
   * Remove an entry
   */
  const handleRemoveEntry = (entryId) => {
    onEntriesChange(entries.filter(e => e.id !== entryId));
  };

  /**
   * Update an entry field
   */
  const handleUpdateEntry = (entryId, field, value) => {
    onEntriesChange(entries.map(entry => 
      entry.id === entryId ? { ...entry, [field]: value } : entry
    ));
  };

  /**
   * Toggle activity selection
   */
  const handleToggleActivity = (entryId, activityId) => {
    const entry = entries.find(e => e.id === entryId);
    if (!entry) return;

    const activities = entry.activities.includes(activityId)
      ? entry.activities.filter(a => a !== activityId)
      : [...entry.activities, activityId];

    handleUpdateEntry(entryId, 'activities', activities);
  };

  if (entries.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No intimacy entries for this date</Text>
        <Pressable style={styles.addButton} onPress={handleAddEntry}>
          <Text style={styles.addButtonText}>+ Add Entry</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Pressable style={styles.addButton} onPress={handleAddEntry}>
        <Text style={styles.addButtonText}>+ Add Entry</Text>
      </Pressable>

      <ScrollView style={styles.entriesList}>
        {entries.map((entry, index) => (
          <View key={entry.id} style={styles.entryCard}>
            {/* Header with entry number and remove button */}
            <View style={styles.entryHeader}>
              <Text style={styles.entryTitle}>Entry {entries.length - index}</Text>
              <Pressable 
                style={styles.removeButton}
                onPress={() => handleRemoveEntry(entry.id)}
              >
                <Text style={styles.removeButtonText}>Remove</Text>
              </Pressable>
            </View>

            {/* Time Picker */}
            <TimePicker
              value={entry.time}
              onChange={(time) => handleUpdateEntry(entry.id, 'time', time)}
              label="Time"
              placeholder="Set Time"
            />

            {/* Activities */}
            <View style={styles.field}>
              <Text style={styles.label}>Activities (select all that apply)</Text>
              <View style={styles.checkboxGrid}>
                {ACTIVITY_OPTIONS.map(activity => (
                  <Pressable
                    key={activity.id}
                    style={styles.checkboxItem}
                    onPress={() => handleToggleActivity(entry.id, activity.id)}
                  >
                    <View style={[
                      styles.checkbox,
                      entry.activities.includes(activity.id) && styles.checkboxChecked
                    ]}>
                      {entry.activities.includes(activity.id) && (
                        <Text style={styles.checkmark}>✓</Text>
                      )}
                    </View>
                    <Text style={styles.checkboxLabel}>{activity.label}</Text>
                  </Pressable>
                ))}
              </View>
            </View>

            {/* Protection */}
            <View style={styles.field}>
              <Text style={styles.label}>Protection/Contraception</Text>
              <View style={styles.protectionGrid}>
                {PROTECTION_OPTIONS.map(option => (
                  <Pressable
                    key={option}
                    style={[
                      styles.protectionButton,
                      entry.protection === option && styles.protectionButtonSelected
                    ]}
                    onPress={() => handleUpdateEntry(entry.id, 'protection', option)}
                  >
                    <Text style={[
                      styles.protectionButtonText,
                      entry.protection === option && styles.protectionButtonTextSelected
                    ]}>
                      {option}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>

            {/* Duration */}
            <View style={styles.field}>
              <Text style={styles.label}>Duration (minutes)</Text>
              <TextInput
                style={styles.input}
                value={entry.duration}
                onChangeText={(text) => handleUpdateEntry(entry.id, 'duration', text)}
                placeholder="Enter duration"
                keyboardType="numeric"
                placeholderTextColor={colors.textLight}
              />
            </View>

            {/* Notes */}
            <View style={styles.field}>
              <Text style={styles.label}>Notes (optional)</Text>
              <TextInput
                style={[styles.input, styles.notesInput]}
                value={entry.notes}
                onChangeText={(text) => handleUpdateEntry(entry.id, 'notes', text)}
                placeholder="Add any notes..."
                multiline
                numberOfLines={3}
                placeholderTextColor={colors.textLight}
              />
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
  },
  emptyText: {
    fontSize: typography.sizes.md,
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  addButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  addButtonText: {
    color: colors.background,
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.semibold,
  },
  entriesList: {
    maxHeight: 400, // Limit height for scrolling
  },
  entryCard: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  entryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  entryTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.semibold,
    color: colors.textPrimary,
  },
  removeButton: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
  },
  removeButtonText: {
    color: colors.danger,
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
  },
  field: {
    marginBottom: spacing.md,
  },
  label: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.medium,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  checkboxGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  checkboxItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: spacing.md,
    marginBottom: spacing.sm,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: 4,
    marginRight: spacing.xs,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  checkmark: {
    color: colors.background,
    fontSize: 14,
    fontWeight: 'bold',
  },
  checkboxLabel: {
    fontSize: typography.sizes.sm,
    color: colors.textPrimary,
  },
  protectionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
  protectionButton: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.sm,
    backgroundColor: colors.background,
  },
  protectionButtonSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  protectionButtonText: {
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
  },
  protectionButtonTextSelected: {
    color: colors.background,
    fontWeight: typography.weights.semibold,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.sm,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    fontSize: typography.sizes.md,
    color: colors.textPrimary,
    backgroundColor: colors.background,
  },
  notesInput: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
});

