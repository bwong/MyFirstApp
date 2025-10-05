import { StyleSheet } from 'react-native';
import { colors, spacing, borderRadius, typography } from '../../utils/constants';

export const dataEntryPreferencesStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    backgroundColor: colors.background,
  },
  backButton: {
    padding: spacing.sm,
    minWidth: 44,
    alignItems: 'center',
  },
  backText: {
    fontSize: typography.sizes.xxxl,
    color: colors.primary,
    fontWeight: typography.weights.bold,
  },
  title: {
    fontSize: typography.sizes.xxl,
    fontWeight: typography.weights.semibold,
    color: colors.textPrimary,
    flex: 1,
    textAlign: 'center',
  },
  placeholder: {
    minWidth: 44, // Same width as back button for centering
  },
  content: {
    flex: 1,
    padding: spacing.xl,
  },
  description: {
    fontSize: typography.sizes.md,
    color: colors.textSecondary,
    lineHeight: 20,
    marginBottom: spacing.xl,
  },
  cardList: {
    marginBottom: spacing.xxl,
  },
  cardItem: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  cardInfo: {
    marginBottom: spacing.md,
  },
  cardTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.semibold,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  cardSubtitle: {
    fontSize: typography.sizes.md,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  cardDescription: {
    fontSize: typography.sizes.sm,
    color: colors.textLight,
    lineHeight: 16,
  },
  cardControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  toggleLabel: {
    fontSize: typography.sizes.md,
    color: colors.textSecondary,
    marginRight: spacing.sm,
  },
  orderControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  orderButton: {
    padding: spacing.sm,
    marginLeft: spacing.xs,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.sm,
  },
  orderButtonDisabled: {
    opacity: 0.5,
  },
  resetButton: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.lg,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  resetButtonText: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.medium,
    color: colors.textPrimary,
  },
});
