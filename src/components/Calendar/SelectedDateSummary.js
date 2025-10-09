import React from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView } from 'react-native';
import { SquarePen, SquareX } from 'lucide-react-native';
import { colors, spacing, borderRadius, typography } from '../../utils/constants';
import { formatLocalCivilDate } from '../../utils/dateUtils';

/**
 * SelectedDateSummary Component
 * Displays a summary of data for the selected date
 */
export function SelectedDateSummary({ 
  date, 
  cycleData, 
  cardSettings,
  onEdit, 
  onDismiss 
}) {
  if (!date) return null;

  // Extract data from cycleData
  const flowValue = cycleData?.cycle?.flow;
  const intimacyEntries = cycleData?.intimacy?.entries || [];
  const fertilityData = cycleData?.fertility || {};
  
  // Check card visibility from settings
  const isCycleVisible = cardSettings?.basics?.visible !== false; // Default to true if not set
  const isIntimacyVisible = cardSettings?.intimacy?.visible !== false; // Default to true if not set
  const isFertilityVisible = cardSettings?.fertility?.visible !== false; // Default to true if not set
  
  // Check if any VISIBLE data exists
  const hasFertilityData = fertilityData && Object.keys(fertilityData).length > 0;
  const hasVisibleData = 
    (isCycleVisible && flowValue) || 
    (isIntimacyVisible && intimacyEntries.length > 0) ||
    (isFertilityVisible && hasFertilityData);

  /**
   * Format flow value for display
   */
  const getFlowText = () => {
    if (!flowValue || flowValue === 'none') return null;
    return flowValue.charAt(0).toUpperCase() + flowValue.slice(1);
  };

  /**
   * Format time for display
   */
  const formatTime = (timeString) => {
    if (!timeString) return '--:--';
    const date = new Date(timeString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  /**
   * Format activities for display
   */
  const formatActivities = (activities) => {
    if (!activities || activities.length === 0) return 'None';
    
    const activityLabels = {
      sex: 'Sex',
      oral: 'Oral',
      masturbation: 'Masturbation',
      anal: 'Anal',
      handjob: 'Hand Job',
    };
    
    return activities.map(id => activityLabels[id] || id).join(', ');
  };

  return (
    <View style={styles.card}>
      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <Pressable 
          onPress={onEdit} 
          style={styles.actionBtn}
        >
          <SquarePen size={20} color={colors.primary} />
        </Pressable>
        
        <Pressable 
          onPress={onDismiss} 
          style={styles.actionBtn}
        >
          <SquareX size={20} color={colors.textSecondary} />
        </Pressable>
      </View>

      {/* Date Title */}
      <Text style={styles.dateTitle}>
        {formatLocalCivilDate(date)}
      </Text>

      {/* Data Content - Scrollable */}
      <ScrollView 
        style={styles.contentScroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={true}
      >
        {!hasVisibleData ? (
          <Text style={styles.emptyText}>No data recorded</Text>
        ) : (
          <>
            {/* Flow Section - Only show if cycle card is visible */}
            {isCycleVisible && flowValue && flowValue !== 'none' && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Flow</Text>
                <Text style={styles.sectionText}>{getFlowText()}</Text>
              </View>
            )}

            {/* Intimacy Section - Only show if intimacy card is visible */}
            {isIntimacyVisible && intimacyEntries.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>
                  Intimacy ({intimacyEntries.length} {intimacyEntries.length === 1 ? 'entry' : 'entries'})
                </Text>
                {intimacyEntries.map((entry, index) => (
                  <View key={entry.id || index} style={styles.entryItem}>
                    <View style={styles.entryRow}>
                      <Text style={styles.entryTime}>{formatTime(entry.time)}</Text>
                      <Text style={styles.entryDuration}>
                        {entry.duration ? `${entry.duration} min` : ''}
                      </Text>
                    </View>
                    
                    {entry.activities && entry.activities.length > 0 && (
                      <Text style={styles.entryDetail}>
                        Activities: {formatActivities(entry.activities)}
                      </Text>
                    )}
                    
                    {entry.protection && entry.protection !== 'None' && (
                      <Text style={styles.entryDetail}>
                        Protection: {entry.protection}
                      </Text>
                    )}
                    
                    {entry.notes && entry.notes.trim() !== '' && (
                      <Text style={styles.entryNotes}>
                        Note: {entry.notes}
                      </Text>
                    )}
                  </View>
                ))}
              </View>
            )}

            {/* Fertility Section - Only show if fertility card is visible */}
            {isFertilityVisible && hasFertilityData && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Fertility Data</Text>
                
                {fertilityData.bbt && (
                  <Text style={styles.sectionText}>
                    BBT: {fertilityData.bbt}°F {fertilityData.bbt_time && `(${formatTime(fertilityData.bbt_time)})`}
                  </Text>
                )}
                
                {fertilityData.cervical_fluid && fertilityData.cervical_fluid !== 'none' && (
                  <Text style={styles.sectionText}>
                    Cervical Fluid: {fertilityData.cervical_fluid.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </Text>
                )}
                
                {fertilityData.opk && (
                  <Text style={styles.sectionText}>
                    OPK: {fertilityData.opk.charAt(0).toUpperCase() + fertilityData.opk.slice(1)}
                  </Text>
                )}
                
                {fertilityData.pregnancy_test && (
                  <Text style={styles.sectionText}>
                    Pregnancy Test: {fertilityData.pregnancy_test.charAt(0).toUpperCase() + fertilityData.pregnancy_test.slice(1)}
                  </Text>
                )}
                
                {fertilityData.supplements && fertilityData.supplements.length > 0 && (
                  <Text style={styles.sectionText}>
                    Supplements: {fertilityData.supplements.join(', ')}
                  </Text>
                )}
                
                {fertilityData.notes && fertilityData.notes.trim() !== '' && (
                  <Text style={styles.entryNotes}>
                    Note: {fertilityData.notes}
                  </Text>
                )}
              </View>
            )}
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: spacing.md,
    marginTop: spacing.md,
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.background,
    // iOS shadow
    shadowColor: colors.shadow,
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    // Android elevation
    elevation: 3,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  actionButtons: {
    position: 'absolute',
    right: spacing.sm,
    top: spacing.sm,
    flexDirection: 'row',
    gap: spacing.xs,
    zIndex: 1,
  },
  actionBtn: {
    padding: spacing.xs,
  },
  dateTitle: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.semibold,
    color: colors.textPrimary,
    marginBottom: spacing.md,
    paddingRight: 70, // Space for both buttons
  },
  contentScroll: {
    flex: 1, // Take up available space
  },
  content: {
    paddingBottom: spacing.md,
  },
  emptyText: {
    fontSize: typography.sizes.md,
    color: colors.textLight,
    fontStyle: 'italic',
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.semibold,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  sectionText: {
    fontSize: typography.sizes.md,
    color: colors.textSecondary,
  },
  entryItem: {
    marginBottom: spacing.md,
    paddingLeft: spacing.sm,
    borderLeftWidth: 2,
    borderLeftColor: colors.border,
  },
  entryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  entryTime: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.semibold,
    color: colors.textPrimary,
  },
  entryDuration: {
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
  },
  entryDetail: {
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  entryNotes: {
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
    fontStyle: 'italic',
    marginTop: spacing.xs,
  },
});

