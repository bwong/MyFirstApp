import 'react-native-gesture-handler'; // (keep this at the very top)

import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

// Import utilities
import { colors, gestureThresholds } from './src/utils/constants';

// Import custom hooks
import { useCalendarState } from './src/hooks/useCalendarState';
import { useModalState } from './src/hooks/useModalState';
import { useFormState } from './src/hooks/useFormState';
import { useNavigationState } from './src/hooks/useNavigationState';
import { useSettingsState } from './src/hooks/useSettingsState';
import { useCycleData } from './src/hooks/useCycleData';

// Import calendar components
import { CalendarView } from './src/components/Calendar/CalendarView';
import { SelectedDateSummary } from './src/components/Calendar/SelectedDateSummary';

// Import modal components
import { DateModal } from './src/components/Modal/DateModal';

// Import menu and settings components
import { MenuBar } from './src/components/MenuBar/MenuBar';
import { SettingsScreen } from './src/components/Settings/SettingsScreen';
import { DatePickerModal } from './src/components/DatePicker/DatePickerModal';



export default function App() {
  // Use custom hooks for state management
  const { getFlowForDate, setFlowForDate, getIntimacyForDate, setIntimacyForDate, getFertilityForDate, setFertilityForDate, getDataForDate, cycleData } = useCycleData();
  const { modalVisible, modalDate, openModal, closeModal, openModalForCurrentDay } = useModalState();
  const { cards, handleCardToggle, togglePinOpen } = useFormState();
  const { settingsModalVisible, openSettingsModal, closeSettingsModal, datePickerModalVisible, openDatePickerModal, closeDatePickerModal, dataEntryPreferencesVisible, openDataEntryPreferences, closeDataEntryPreferences } = useNavigationState();
  const { cardSettings, toggleCardVisibility, moveCardUp, moveCardDown, resetToDefaults, isLoading: settingsLoading } = useSettingsState();
  const { selected, marks, currentMonth, handleDayPress, clearSelection, navigateToCurrentDay, navigateToDate } = useCalendarState(cycleData, cardSettings);

  const handleLongPress = ({ dateString, year, month, day }) => {
    openModal({ dateString, year, month, day });
  };

  const handleEditSelectedDate = () => {
    if (selected) {
      openModal({
        dateString: selected.key,
        year: selected.year,
        month: selected.month,
        day: selected.day,
      });
    }
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
            {selected && !settingsLoading && (
              <GestureDetector gesture={dismissGesture}>
                <View collapsable={false}>
                  <SelectedDateSummary
                    date={selected}
                    cycleData={getDataForDate(selected.key)}
                    cardSettings={cardSettings}
                    onEdit={handleEditSelectedDate}
                    onDismiss={clearSelection}
                  />
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
              flowValue={modalDate ? getFlowForDate(modalDate.dateString) : 'none'}
              onFlowChange={(value) => modalDate && setFlowForDate(modalDate.dateString, value)}
              intimacyEntries={modalDate ? getIntimacyForDate(modalDate.dateString) : []}
              onIntimacyEntriesChange={(entries) => modalDate && setIntimacyForDate(modalDate.dateString, entries)}
              fertilityData={modalDate ? getFertilityForDate(modalDate.dateString) : {}}
              onFertilityChange={(data) => modalDate && setFertilityForDate(modalDate.dateString, data)}
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
});