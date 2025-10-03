import 'react-native-gesture-handler'; // (keep this at the very top)

import React, { useState, useMemo } from 'react';
import { StyleSheet, View, Text, Pressable, Modal, ScrollView, Switch } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Calendar } from 'react-native-calendars';
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
// import Animated, { useSharedValue, useAnimatedStyle, withSpring, runOnJS } from 'react-native-reanimated';

// Import utilities
import { formatLocalCivilDate } from './src/utils/dateUtils';
import { screenWidth, numDaysInWeek, cellSize, colors, spacing, borderRadius, typography, gestureThresholds } from './src/utils/constants';

// Import custom hooks
import { useCalendarState } from './src/hooks/useCalendarState';
import { useModalState } from './src/hooks/useModalState';
import { useFormState } from './src/hooks/useFormState';

// Custom Day Component for enhanced marking capabilities
function CustomDayComponent({ date, state, marking, onPress, onLongPress }) {
  const isSelected = marking?.selected;
  const hasDots = marking?.dots && marking.dots.length > 0;
  const hasMark = marking?.marked;
  
  // Merge custom styles with default styles
  const containerStyle = [
    styles.dayContainer,
    marking?.customStyles?.container,
    isSelected && styles.selectedDay
  ];
  
  const textStyle = [
    styles.dayText,
    marking?.customStyles?.text,
    isSelected && styles.selectedDayText
  ];

  return (
    <Pressable 
      style={containerStyle}
      onPress={() => onPress && onPress({ dateString: date.dateString, year: date.year, month: date.month, day: date.day })}
      onLongPress={() => onLongPress && onLongPress({ dateString: date.dateString, year: date.year, month: date.month, day: date.day })}
    >
      <Text style={textStyle}>{date.day}</Text>
      
      {/* Render multiple dots */}
      {hasDots && (
        <View style={styles.dotsContainer}>
          {marking.dots.slice(0, 3).map((dot, index) => (
            <View 
              key={dot.key || index}
              style={[
                styles.dot,
                { backgroundColor: dot.color }
              ]} 
            />
          ))}
          {marking.dots.length > 3 && (
            <Text style={styles.moreDotsText}>+{marking.dots.length - 3}</Text>
          )}
        </View>
      )}
      
      {/* Single mark dot */}
      {hasMark && !hasDots && (
        <View style={[styles.singleDot, { backgroundColor: marking.dotColor }]} />
      )}
    </Pressable>
  );
}

// Reusable Collapsible Card
function CollapsibleCard({ title, subtitle, expanded, pinOpen, onToggle, onTogglePin, children }) {
  return (
    <View style={styles.sectionCard}>
      <Pressable onPress={onToggle} style={styles.sectionHeader}>
        <View style={{ flex: 1 }}>
          <Text style={styles.sectionTitle}>{title}</Text>
          {subtitle ? <Text style={styles.sectionSubtitle}>{subtitle}</Text> : null}
        </View>
        <View style={styles.sectionHeaderRight}>
          <View style={styles.pinRow}>
            <Text style={styles.pinLabel}>Keep open</Text>
            <Switch value={pinOpen} onValueChange={onTogglePin} />
          </View>
          <Text style={styles.chevron}>{expanded ? '▾' : '▸'}</Text>
        </View>
      </Pressable>
      {expanded ? (
        <View style={styles.sectionBody}>
          {children}
        </View>
      ) : null}
    </View>
  );
}

export default function App() {
  // Use custom hooks for state management
  const { selected, marks, handleDayPress, clearSelection } = useCalendarState();
  const { modalVisible, modalDate, openModal, closeModal } = useModalState();
  const { cards, handleCardToggle, togglePinOpen } = useFormState();

  const handleLongPress = ({ dateString, year, month, day }) => {
    openModal({ dateString, year, month, day });
  };

  const dismissGesture = Gesture.Pan()
  .runOnJS(true)
  .minDistance(gestureThresholds.minDistance)         // activate after ~10px in any direction
  .failOffsetX([-12, 12])  // ignore horizontal swipes (so month-swipe wins)
  .onUpdate((e) => { /* track translateY for nice animation */ })
  .onEnd((e) => {
    if (e.translationY > gestureThresholds.dismissDistance) { console.log('somebody swiped down'); clearSelection(); }
    if (e.translationY < -gestureThresholds.dismissDistance) { console.log('somebody swiped up'); clearSelection(); }
    
  });


  return (
        <GestureHandlerRootView style={{ flex: 1 }}>

    <SafeAreaProvider>
      {/* edges={['top']} keeps it below the notch but lets bottom extend */}
      <SafeAreaView style={styles.container} edges={['top']}>
        <Calendar 
          enableSwipeMonths 
          onDayPress={handleDayPress}
          markingType={'custom'}
          markedDates={marks}
          style={styles.calendar}
          dayComponent={({ date, state, marking }) => (
            <CustomDayComponent 
              date={date} 
              state={state} 
              marking={marking}
              onPress={handleDayPress}
              onLongPress={handleLongPress}
            />
          )}
          theme={{
            selectedDayBackgroundColor: 'transparent',
            selectedDayTextColor: '#2c7be5',
            todayTextColor: '#2c7be5',
            dayTextColor: '#2d4150',
            textDisabledColor: '#d9e1e8',
            dotColor: '#00adf5',
            selectedDotColor: '#ffffff',
            arrowColor: '#2c7be5',
            monthTextColor: '#2c7be5',
            indicatorColor: '#2c7be5',
            textDayFontWeight: '300',
            textMonthFontWeight: 'bold',
            textDayHeaderFontWeight: '300',
            textDayFontSize: 16,
            textMonthFontSize: 16,
            textDayHeaderFontSize: 13,
          }}
        />
        {/* bottom card */}
        {selected && (
            <GestureDetector gesture={dismissGesture}>

          <View style={[styles.card]}>
            {/* dismiss button */}
             <Pressable onPress={() => {
              console.log('hi pressed X')
              clearSelection()}
            } style={styles.dismissBtn}>
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
        <Modal
          visible={modalVisible}
          animationType="slide"
          presentationStyle="pageSheet"
          onRequestClose={closeModal}
        >
          <SafeAreaView style={styles.modalContainer}>
            {/* Header with back and close buttons */}
            <View style={styles.modalHeader}>
              <Pressable 
                style={styles.modalBackButton}
                onPress={closeModal}
              >
                <Text style={styles.modalBackText}>‹</Text>
              </Pressable>
              
              <Text style={styles.modalTitle}>
                {modalDate ? formatLocalCivilDate(modalDate) : 'Date Details'}
              </Text>
              
              <Pressable 
                style={styles.modalCloseButton}
                onPress={closeModal}
              >
                <Text style={styles.modalCloseText}>✕</Text>
              </Pressable>
            </View>

            {/* Modal Content - Single Scrolling Form with Collapsible Cards */}
            <ScrollView style={styles.modalContent} contentContainerStyle={styles.modalContentScroll}>
              <CollapsibleCard
                title="Cycle Basics"
                subtitle="The Daily Check-In"
                expanded={cards.basics.expanded}
                pinOpen={cards.basics.pinOpen}
                onToggle={() => handleCardToggle('basics')}
                onTogglePin={(value) => togglePinOpen('basics', value)}
              >
                <Text style={styles.sectionText}>Add basic daily entries like flow, energy, mood, notes.</Text>
              </CollapsibleCard>

              <CollapsibleCard
                title="Physical Symptoms"
                subtitle="Body & Wellness"
                expanded={cards.symptoms.expanded}
                pinOpen={cards.symptoms.pinOpen}
                onToggle={() => handleCardToggle('symptoms')}
                onTogglePin={(value) => togglePinOpen('symptoms', value)}
              >
                <Text style={styles.sectionText}>Track cramps, headaches, fatigue, GI issues, etc.</Text>
              </CollapsibleCard>

              <CollapsibleCard
                title="Intimacy"
                subtitle="Detailed Log"
                expanded={cards.intimacy.expanded}
                pinOpen={cards.intimacy.pinOpen}
                onToggle={() => handleCardToggle('intimacy')}
                onTogglePin={(value) => togglePinOpen('intimacy', value)}
              >
                <Text style={styles.sectionText}>Record intimacy details and relevant context.</Text>
              </CollapsibleCard>

              <CollapsibleCard
                title="Fertility Data"
                subtitle="Markers & Tracking"
                expanded={cards.fertility.expanded}
                pinOpen={cards.fertility.pinOpen}
                onToggle={() => handleCardToggle('fertility')}
                onTogglePin={(value) => togglePinOpen('fertility', value)}
              >
                <Text style={styles.sectionText}>Capture BBT, LH tests, cervical fluid, and more.</Text>
              </CollapsibleCard>
            </ScrollView>
          </SafeAreaView>
        </Modal>
      </SafeAreaView>
    </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  
  // Custom Day Component Styles
  dayContainer: {
    width: cellSize,
    height: cellSize,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderStyle: 'solid',
    borderRadius: 5,
    marginTop: -14,
    //marginRight: 14,
    position: 'relative',
  },
  dayText: {
    fontSize: 16,
    color: colors.textPrimary,
    fontWeight: typography.weights.light,
  },
  selectedDay: {
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: borderRadius.sm,
    backgroundColor: 'transparent',
  },
  selectedDayText: {
    color: colors.primary,
    fontWeight: typography.weights.bold,
  },
  
  // Dots Styles
  dotsContainer: {
    position: 'absolute',
    bottom: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 1,
  },
  singleDot: {
    position: 'absolute',
    bottom: 5,
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  moreDotsText: {
    fontSize: typography.sizes.xs,
    color: colors.textSecondary,
    marginLeft: spacing.xs,
  },
  
  // calendar: { flex: 1 },
  card: {
    margin: spacing.lg,
    marginTop: 80,
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.background,
    // iOS shadow
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    // Android elevation
    elevation: 3,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  dismissBtn: {
    position: 'absolute',
    right: 8,
    top: 8,
    padding: 4,
  },
  dismissText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#999',
  },
  cardTitle: { fontSize: 12, color: '#888', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.5 },
  cardText: { fontSize: 16, fontWeight: '600', color: '#222' },
  
  // Modal Styles
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  modalBackButton: {
    padding: 8,
    minWidth: 44,
    alignItems: 'center',
  },
  modalBackText: {
    fontSize: 24,
    color: '#2c7be5',
    fontWeight: 'bold',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222',
    flex: 1,
    textAlign: 'center',
  },
  modalCloseButton: {
    padding: 8,
    minWidth: 44,
    alignItems: 'center',
  },
  modalCloseText: {
    fontSize: 18,
    color: '#666',
    fontWeight: 'bold',
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  modalContentScroll: {
    paddingBottom: 40,
  },
  modalContentTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 16,
  },
  modalContentText: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    marginBottom: 12,
  },

  // Collapsible Section Styles
  sectionCard: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    backgroundColor: '#fff',
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
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  sectionSubtitle: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2,
  },
  chevron: {
    fontSize: 18,
    color: '#9ca3af',
    marginTop: 6,
  },
  sectionBody: {
    marginTop: 12,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
  },
  pinRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pinLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginRight: 8,
  },
  sectionText: {
    fontSize: 14,
    color: '#374151',
  },
});