import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { colors, spacing, borderRadius, typography } from '../../utils/constants';

/**
 * Reusable Collapsible Card Component
 * Displays a collapsible section with header, pin toggle, and content area
 */
export function CollapsibleCard({ title, subtitle, expanded, onToggle, children }) {
  return (
    <View style={styles.sectionCard}>
      <Pressable onPress={onToggle} style={styles.sectionHeader}>
        <View style={{ flex: 1 }}>
          <Text style={styles.sectionTitle}>{title}</Text>
          {subtitle ? <Text style={styles.sectionSubtitle}>{subtitle}</Text> : null}
        </View>
        <View style={styles.sectionHeaderRight}>
          <Text style={styles.chevron}>{expanded ? '▾' : '▸'}</Text>
        </View>
      </Pressable>
      {expanded ? (
        <View style={styles.sectionBody}>
          {children}
        </View>
      ) : null}
    </View>
  );
}

// Styles for the CollapsibleCard
const styles = {
  sectionCard: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionHeaderRight: {
    alignItems: 'flex-end',
    gap: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  sectionSubtitle: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2,
  },
  chevron: {
    fontSize: 18,
    color: '#9ca3af',
    marginTop: 6,
  },
  sectionBody: {
    marginTop: 12,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
  },
  pinRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pinLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginRight: 8,
  },
};
