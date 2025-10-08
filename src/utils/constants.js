import { Dimensions } from 'react-native';

// Screen dimensions
export const screenWidth = Dimensions.get("window").width;
export const numDaysInWeek = 7;
export const cellSize = screenWidth / numDaysInWeek; // square width & height

// Color palette
export const colors = {
  primary: '#2c7be5',
  primaryLight: '#e6f2ff',
  primaryDark: '#1e5bb8',
  
  // Text colors
  textPrimary: '#222',
  textSecondary: '#666',
  textMuted: '#999',
  textLight: '#e6f2ff',
  
  // Background colors
  background: '#fff',
  backgroundLight: '#f8f9fa',
  backgroundMuted: '#f0f0f0',
  
  // Border colors
  border: '#e0e0e0',
  borderLight: '#f0f0f0',
  borderMuted: '#e5e7eb',
  
  // Status colors
  success: '#16a34a',
  warning: '#f59e0b',
  error: '#f43f5e',
  info: '#2563eb',
  
  // Dot colors for calendar marks
  dotColors: {
    workout: '#2563eb',
    event: '#f59e0b',
    period: '#f43f53',
    meeting: '#8b5cf6',
    deadline: '#ef4444',
    birthday: '#f97316',
    reminder: '#10b981',
    appointment: '#06b6d4',
    task1: '#6366f1',
    task2: '#ec4899',
  }
};

// Spacing and sizing
export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
};

export const borderRadius = {
  sm: 5,
  md: 8,
  lg: 12,
  xl: 16,
};

// Typography
export const typography = {
  sizes: {
    xs: 10,
    sm: 12,
    md: 14,
    lg: 16,
    xl: 18,
    xxl: 24,
  },
  weights: {
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  }
};

// Calendar configuration
export const calendarConfig = {
  cellSize,
  numDaysInWeek,
  screenWidth,
};

// Gesture thresholds
export const gestureThresholds = {
  minDistance: 10,
  swipeDistance: 50,
  dismissDistance: 60,
};

// Flow colors (matching FlowSelector)
export const flowColors = {
  none: null,                    // No background
  spotting: '#FED7E2',          // Light Pink
  light: '#FBB6CE',             // Pink
  medium: '#F687B3',            // Red-Pink
  heavy: '#D53F8C',             // Deep Red/Pink
};
