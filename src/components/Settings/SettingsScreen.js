import React from 'react';
import { Modal, View, Text, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, ChevronRight } from 'lucide-react-native';
import { settingsStyles } from './SettingsStyles';
import { DataEntryPreferencesScreen } from './DataEntryPreferencesScreen';

/**
 * Settings Modal Component
 * Displays app settings and configuration options in a modal
 */
export function SettingsScreen({ 
  visible, 
  onClose, 
  onDataEntryPreferencesPress,
  showDataEntryPreferences = false,
  cardSettings,
  onToggleCard,
  onMoveCardUp,
  onMoveCardDown,
  onResetToDefaults,
  onBackToSettings
}) {
  // Show Data Entry Preferences screen if requested
  if (showDataEntryPreferences) {
    return (
      <Modal
        visible={visible}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={onClose}
      >
        <DataEntryPreferencesScreen
          visible={true}
          onClose={onBackToSettings}
          cardSettings={cardSettings}
          onToggleCard={onToggleCard}
          onMoveCardUp={onMoveCardUp}
          onMoveCardDown={onMoveCardDown}
          onResetToDefaults={onResetToDefaults}
        />
      </Modal>
    );
  }

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <SafeAreaView style={settingsStyles.container}>
      {/* Header with back button */}
      <View style={settingsStyles.header}>
        <Pressable 
          style={settingsStyles.backButton}
          onPress={onClose}
        >
          <ArrowLeft 
            size={24}
            color={settingsStyles.backText.color}
          />
        </Pressable>

        <Text style={settingsStyles.title}>Settings</Text>

        <View style={settingsStyles.placeholder} />
      </View>

      {/* Settings Content */}
      <ScrollView style={settingsStyles.content}>
        {/* Calendar Settings */}
        <View style={settingsStyles.section}>
          <Text style={settingsStyles.sectionTitle}>Calendar</Text>
          
          <View style={settingsStyles.settingItem}>
            <View style={{ flex: 1 }}>
              <Text style={settingsStyles.settingLabel}>Default View</Text>
              <Text style={settingsStyles.settingDescription}>
                Choose your preferred calendar view
              </Text>
            </View>
            <Text style={settingsStyles.comingSoon}>Coming Soon</Text>
          </View>

          <View style={settingsStyles.settingItem}>
            <View style={{ flex: 1 }}>
              <Text style={settingsStyles.settingLabel}>Week Start Day</Text>
              <Text style={settingsStyles.settingDescription}>
                Set which day the week begins
              </Text>
            </View>
            <Text style={settingsStyles.comingSoon}>Coming Soon</Text>
          </View>
        </View>

        {/* Data Settings */}
        <View style={settingsStyles.section}>
          <Text style={settingsStyles.sectionTitle}>Data & Privacy</Text>
          
          <View style={settingsStyles.settingItem}>
            <View style={{ flex: 1 }}>
              <Text style={settingsStyles.settingLabel}>Data Export</Text>
              <Text style={settingsStyles.settingDescription}>
                Export your data for backup
              </Text>
            </View>
            <Text style={settingsStyles.comingSoon}>Coming Soon</Text>
          </View>

          <View style={settingsStyles.settingItem}>
            <View style={{ flex: 1 }}>
              <Text style={settingsStyles.settingLabel}>Data Backup</Text>
              <Text style={settingsStyles.settingDescription}>
                Automatic cloud backup settings
              </Text>
            </View>
            <Text style={settingsStyles.comingSoon}>Coming Soon</Text>
          </View>
        </View>

        {/* App Settings */}
        <View style={settingsStyles.section}>
          <Text style={settingsStyles.sectionTitle}>App Preferences</Text>
          
          <View style={settingsStyles.settingItem}>
            <View style={{ flex: 1 }}>
              <Text style={settingsStyles.settingLabel}>Theme</Text>
              <Text style={settingsStyles.settingDescription}>
                Light or dark mode preference
              </Text>
            </View>
            <Text style={settingsStyles.comingSoon}>Coming Soon</Text>
          </View>

          <View style={settingsStyles.settingItem}>
            <View style={{ flex: 1 }}>
              <Text style={settingsStyles.settingLabel}>Notifications</Text>
              <Text style={settingsStyles.settingDescription}>
                Reminder and alert settings
              </Text>
            </View>
            <Text style={settingsStyles.comingSoon}>Coming Soon</Text>
          </View>
        </View>

        {/* Data Entry Settings */}
        <View style={settingsStyles.section}>
          <Text style={settingsStyles.sectionTitle}>Data Entry</Text>
          
          <Pressable 
            style={settingsStyles.navigationItem}
            onPress={onDataEntryPreferencesPress}
          >
            <View style={{ flex: 1 }}>
              <Text style={settingsStyles.settingLabel}>Data Entry Preferences</Text>
              <Text style={settingsStyles.settingDescription}>
                Customize which cards appear in the data entry form
              </Text>
            </View>
            <ChevronRight 
              size={20}
              color={settingsStyles.comingSoon.color}
            />
          </Pressable>
        </View>
      </ScrollView>
      </SafeAreaView>
    </Modal>
  );
}
