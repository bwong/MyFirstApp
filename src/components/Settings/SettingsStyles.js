import { StyleSheet } from 'react-native';
import { colors, spacing, borderRadius, typography } from '../../utils/constants';

export const settingsStyles = StyleSheet.create({
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
  section: {
    marginBottom: spacing.xxl,
  },
  sectionTitle: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    color: colors.textPrimary,
    marginBottom: spacing.lg,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.md,
  },
  settingLabel: {
    fontSize: typography.sizes.lg,
    color: colors.textPrimary,
    fontWeight: typography.weights.medium,
  },
  settingDescription: {
    fontSize: typography.sizes.md,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  comingSoon: {
    fontSize: typography.sizes.md,
    color: colors.textLight,
    fontStyle: 'italic',
  },
});
