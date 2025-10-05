import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { CalendarDays, CirclePlus, Settings } from 'lucide-react-native';
import { menuBarStyles } from './MenuBarStyles';
import { colors } from '../../utils/constants';

/**
 * MenuBar Component
 * Bottom navigation bar with Home, Add Data, and Settings options
 */
export function MenuBar({ 
  onHomePress, 
  onAddDataPress, 
  onSettingsPress 
}) {
  return (
    <View style={menuBarStyles.menuBar}>
      {/* Home Button */}
      <Pressable 
        style={menuBarStyles.menuItem}
        onPress={onHomePress}
        accessibilityLabel="Home - Navigate to current day"
        accessibilityRole="button"
      >
        <CalendarDays 
          size={24}
          color={colors.textSecondary}
          style={menuBarStyles.menuIcon}
        />
      </Pressable>

      {/* Add Data Button */}
      <Pressable 
        style={menuBarStyles.addDataButton}
        onPress={onAddDataPress}
        accessibilityLabel="Add Data - Open data entry form"
        accessibilityRole="button"
      >
        <CirclePlus 
          size={24}
          color={colors.textSecondary}
          style={menuBarStyles.addDataIcon}
        />
      </Pressable>

      {/* Settings Button */}
      <Pressable 
        style={menuBarStyles.menuItem}
        onPress={onSettingsPress}
        accessibilityLabel="Settings - Open app settings"
        accessibilityRole="button"
      >
        <Settings 
          size={24}
          color={colors.textSecondary}
          style={menuBarStyles.menuIcon}
        />
      </Pressable>
    </View>
  );
}
