import 'react-native-gesture-handler'; // (keep this at the very top)

import React from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

// Import utilities
import { formatLocalCivilDate } from './src/utils/dateUtils';
import { colors, spacing, borderRadius, typography, gestureThresholds } from './src/utils/constants';

// Import custom hooks
import { useCalendarState } from './src/hooks/useCalendarState';
import { useModalState } from './src/hooks/useModalState';
import { useFormState } from './src/hooks/useFormState';
import { useNavigationState } from './src/hooks/useNavigationState';
import { useSettingsState } from './src/hooks/useSettingsState';

// Import calendar components
import { CalendarView } from './src/components/Calendar/CalendarView';

// Import modal components
import { DateModal } from './src/components/Modal/DateModal';

// Import menu and settings components
import { MenuBar } from './src/components/MenuBar/MenuBar';
import { SettingsScreen } from './src/components/Settings/SettingsScreen';
import { DatePickerModal } from './src/components/DatePicker/DatePickerModal';



export default function App() {
  // Use custom hooks for state management
  const { selected, marks, currentMonth, handleDayPress, clearSelection, navigateToCurrentDay, navigateToDate } = useCalendarState();
  const { modalVisible, modalDate, openModal, closeModal, openModalForCurrentDay } = useModalState();
  const { cards, handleCardToggle, togglePinOpen } = useFormState();
  const { settingsModalVisible, openSettingsModal, closeSettingsModal, datePickerModalVisible, openDatePickerModal, closeDatePickerModal, dataEntryPreferencesVisible, openDataEntryPreferences, closeDataEntryPreferences } = useNavigationState();
  const { cardSettings, toggleCardVisibility, moveCardUp, moveCardDown, resetToDefaults } = useSettingsState();

  const handleLongPress = ({ dateString, year, month, day }) => {
    openModal({ dateString, year, month, day });
  };

  // Menu bar navigation handlers
  const handleHomePress = () => {
    openDatePickerModal();
  };

  const handleAddDataPress = () => {
    if (selected) {
      // If a date is selected, open modal for that date
      openModal({
        dateString: selected.key,
        year: selected.year,
        month: selected.month,
        day: selected.day,
      });
    } else {
      // If no date selected, open modal for current day
      openModalForCurrentDay();
    }
  };

  const handleSettingsPress = () => {
    openSettingsModal();
  };

  const dismissGesture = Gesture.Pan()
    .runOnJS(true)
    .minDistance(gestureThresholds.minDistance)         // activate after ~10px in any direction
    .failOffsetX([-12, 12])  // ignore horizontal swipes (so month-swipe wins)
    .onUpdate((e) => { /* track translateY for nice animation */ })
    .onEnd((e) => {
      if (e.translationY > gestureThresholds.dismissDistance) { 
        console.log('somebody swiped down'); 
        clearSelection(); 
      }
      if (e.translationY < -gestureThresholds.dismissDistance) { 
        console.log('somebody swiped up'); 
        clearSelection(); 
      }
    });


  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        {/* edges={['top']} keeps it below the notch but lets bottom extend */}
        <SafeAreaView style={styles.container} edges={['top']}>
          <View style={styles.contentWrapper}>
            <CalendarView 
              marks={marks}
              current={currentMonth}
              onDayPress={handleDayPress}
              onLongPress={handleLongPress}
              enableSwipeMonths={true}
            />
            
            {/* Bottom card for selected date */}
            {selected && (
              <GestureDetector gesture={dismissGesture}>
                <View style={styles.card}>
                  {/* Dismiss button */}
                  <Pressable 
                    onPress={() => {
                      console.log('hi pressed X');
                      clearSelection();
                    }} 
                    style={styles.dismissBtn}
                  >
                    <Text style={styles.dismissText}>×</Text>
                  </Pressable>

                  <Text style={styles.cardTitle}>Selected date</Text>
                  <Text style={styles.cardText}>
                    hello, the data for the selected day is{' '}
                    {formatLocalCivilDate(selected)}
                  </Text>
                </View>
              </GestureDetector>
            )}

            {/* Long Press Modal */}
            <DateModal
              visible={modalVisible}
              date={modalDate}
              onClose={closeModal}
              cards={cards}
              onCardToggle={handleCardToggle}
              onTogglePin={togglePinOpen}
              cardSettings={cardSettings}
            />

            {/* Settings Modal */}
            <SettingsScreen
              visible={settingsModalVisible}
              onClose={closeSettingsModal}
              onDataEntryPreferencesPress={openDataEntryPreferences}
              showDataEntryPreferences={dataEntryPreferencesVisible}
              cardSettings={cardSettings}
              onToggleCard={toggleCardVisibility}
              onMoveCardUp={moveCardUp}
              onMoveCardDown={moveCardDown}
              onResetToDefaults={resetToDefaults}
              onBackToSettings={closeDataEntryPreferences}
            />


            {/* Date Picker Modal */}
            <DatePickerModal
              visible={datePickerModalVisible}
              onClose={closeDatePickerModal}
              onDateSelected={navigateToDate}
            />
          </View>

          {/* Menu Bar */}
          <MenuBar
            onHomePress={handleHomePress}
            onAddDataPress={handleAddDataPress}
            onSettingsPress={handleSettingsPress}
          />
        </SafeAreaView>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: colors.background 
  },
  contentWrapper: {
    flex: 1,
    paddingBottom: 100, // Space for the menu bar with extra iOS home indicator clearance
  },
  card: {
    margin: spacing.lg,
    marginTop: 80,
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
  dismissBtn: {
    position: 'absolute',
    right: spacing.sm,
    top: spacing.sm,
    padding: spacing.xs,
  },
  dismissText: {
    fontSize: typography.sizes.xxl,
    fontWeight: typography.weights.bold,
    color: colors.textLight,
  },
  cardTitle: { 
    fontSize: typography.sizes.md, 
    color: colors.textSecondary, 
    marginBottom: spacing.xs, 
    textTransform: 'uppercase', 
    letterSpacing: 0.5 
  },
  cardText: { 
    fontSize: typography.sizes.xl, 
    fontWeight: typography.weights.semibold, 
    color: colors.textPrimary 
  },
});