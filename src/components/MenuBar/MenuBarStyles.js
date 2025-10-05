import { StyleSheet } from 'react-native';
import { colors, spacing, borderRadius, typography } from '../../utils/constants';

export const menuBarStyles = StyleSheet.create({
  menuBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    paddingBottom: spacing.xl, // Extra padding to clear iOS home indicator
    shadowColor: colors.shadow,
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: -2 },
    elevation: 5,
  },
  menuItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.xs,
  },
  menuItemActive: {
    // Active state styling can be added here
  },
  menuIcon: {
    // No margin needed for icon-only buttons
  },
  menuIconActive: {
    color: colors.primary,
  },
  menuIconInactive: {
    color: colors.textSecondary,
  },
  // Text labels removed - using icon-only design
  addDataButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.xs,
  },
  addDataIcon: {
    // Color will be set dynamically based on state
  },
  // Add data label removed - using icon-only design
});
