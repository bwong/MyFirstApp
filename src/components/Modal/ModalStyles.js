import { StyleSheet } from 'react-native';
import { colors, spacing, borderRadius, typography } from '../../utils/constants';

/**
 * Modal-specific styles
 */
export const modalStyles = StyleSheet.create({
  // Modal container
  modalContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  modalBackButton: {
    padding: spacing.sm,
    minWidth: 44,
    alignItems: 'center',
  },
  modalBackText: {
    fontSize: typography.sizes.xxl,
    color: colors.primary,
    fontWeight: typography.weights.bold,
  },
  modalTitle: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.semibold,
    color: colors.textPrimary,
    flex: 1,
    textAlign: 'center',
  },
  modalCloseButton: {
    padding: spacing.sm,
    minWidth: 44,
    alignItems: 'center',
  },
  modalCloseText: {
    fontSize: typography.sizes.xl,
    color: colors.textSecondary,
    fontWeight: typography.weights.bold,
  },
  modalContent: {
    flex: 1,
    padding: spacing.xl,
  },
  modalContentScroll: {
    paddingBottom: 40,
  },
  modalContentTitle: {
    fontSize: typography.sizes.xxl,
    fontWeight: typography.weights.bold,
    color: colors.textPrimary,
    marginBottom: spacing.lg,
  },
  modalContentText: {
    fontSize: typography.sizes.lg,
    color: colors.textSecondary,
    lineHeight: 24,
    marginBottom: spacing.md,
  },
  
  // Collapsible Section Styles
  sectionCard: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    backgroundColor: colors.background,
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
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    color: colors.textPrimary,
  },
  sectionSubtitle: {
    fontSize: typography.sizes.sm,
    color: colors.textMuted,
    marginTop: 2,
  },
  chevron: {
    fontSize: typography.sizes.xl,
    color: '#9ca3af',
    marginTop: 6,
  },
  sectionBody: {
    marginTop: spacing.md,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
  },
  pinRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pinLabel: {
    fontSize: typography.sizes.sm,
    color: colors.textMuted,
    marginRight: spacing.sm,
  },
  sectionText: {
    fontSize: typography.sizes.md,
    color: '#374151',
  },
});
