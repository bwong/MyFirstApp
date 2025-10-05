import { StyleSheet } from 'react-native';
import { colors, spacing, borderRadius, typography } from '../../utils/constants';

export const datePickerModalStyles = StyleSheet.create({
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
    fontSize: typography.sizes.xxxl,
    color: colors.primary,
    fontWeight: typography.weights.bold,
  },
  modalTitle: {
    fontSize: typography.sizes.xxl,
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
    fontSize: typography.sizes.xxl,
    color: colors.textSecondary,
    fontWeight: typography.weights.bold,
  },
  modalContent: {
    flex: 1,
    padding: spacing.xl,
    justifyContent: 'center',
  },
  datePickerContainer: {
    alignItems: 'center',
    marginBottom: spacing.xxl,
  },
  actionButton: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.lg,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,
    alignItems: 'center',
    shadowColor: colors.primary,
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  actionButtonText: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.semibold,
    color: colors.background,
  },
  selectedDateText: {
    fontSize: typography.sizes.lg,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
});
