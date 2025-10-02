import 'react-native-gesture-handler'; // (keep this at the very top)

import React, { useState, useMemo } from 'react';
import { StyleSheet, View, Text, Pressable, Dimensions } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Calendar } from 'react-native-calendars';
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
// import Animated, { useSharedValue, useAnimatedStyle, withSpring, runOnJS } from 'react-native-reanimated';

const screenWidth = Dimensions.get("window").width;
const numDaysInWeek = 7;
const cellSize = screenWidth / numDaysInWeek; // square width & height

function formatLocalCivilDate({ year, month, day }) {
  // Construct local midnight; no UTC conversion → no off-by-one.
  const d = new Date(year, month - 1, day);
  return new Intl.DateTimeFormat(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    // no timeZone specified → uses device's local zone
  }).format(d);
}

// Custom Day Component for enhanced marking capabilities
function CustomDayComponent({ date, state, marking, onPress }) {
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

export default function App() {


const staticMarks = {
  "2025-09-20": { 
    customStyles: {
      container: {
        backgroundColor: 'transparent',
      },
      text: {
        color: '#2d4150',
      },
    },
    marked: true, 
    dotColor: "#16a34a" 
  },
  "2025-09-21": { 
    customStyles: {
      container: {
        backgroundColor: 'transparent',
      },
      text: {
        color: '#2d4150',
      },
    },
    marked: true, 
    dotColor: "#f43f5e" 
  },
  "2025-09-22": {
    customStyles: {
      container: {
        backgroundColor: 'transparent',
      },
      text: {
        color: '#2d4150',
      },
    },
    dots: [
      { key: "workout", color: "#2563eb" },
      { key: "event", color: "#f59e0b" },
      { key: "period", color: "#f43f53"},
    ],
  },
  "2025-09-23": {
    customStyles: {
      container: {
        backgroundColor: 'transparent',
      },
      text: {
        color: '#2d4150',
      },
    },
    dots: [
      { key: "meeting", color: "#8b5cf6" },
      { key: "deadline", color: "#ef4444" },
      { key: "birthday", color: "#f97316" },
      { key: "reminder", color: "#10b981" },
      { key: "appointment", color: "#06b6d4" },
    ],
  },
  "2025-09-24": {
    customStyles: {
      container: {
        backgroundColor: 'transparent',
      },
      text: {
        color: '#2d4150',
      },
    },
    dots: [
      { key: "task1", color: "#6366f1" },
      { key: "task2", color: "#ec4899" },
    ],
  },
};

  const [selected, setSelected] = useState(null);

  const marks = useMemo(() => {
  if (!selected) return staticMarks;

  const selKey = selected.key;
  const existing = staticMarks[selKey] ?? {};

  return {
    ...staticMarks,
    [selKey]: {
      ...existing, // keep any static marking (dots, etc.)
      customStyles: {
        container: {
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: '#2c7be5',
          borderRadius: 5,
          //height: 35,
          //width: 35,
        },
        text: {
          color: '#2c7be5',
          fontWeight: 'bold',
        },
      },
    },
  };
}, [selected]);

  const dismissGesture = Gesture.Pan()
  .runOnJS(true)
  .minDistance(10)         // activate after ~10px in any direction
  .failOffsetX([-12, 12])  // ignore horizontal swipes (so month-swipe wins)
  .onUpdate((e) => { /* track translateY for nice animation */ })
  .onEnd((e) => {
    if (e.translationY > 60) { console.log('somebody swiped down'); setSelected(null); }
    if (e.translationY < -60) { console.log('somebody swiped up'); setSelected(null); }
    
  });


  return (
        <GestureHandlerRootView style={{ flex: 1 }}>

    <SafeAreaProvider>
      {/* edges={['top']} keeps it below the notch but lets bottom extend */}
      <SafeAreaView style={styles.container} edges={['top']}>
        <Calendar 
          enableSwipeMonths 
          onDayPress={({ dateString, year, month, day }) =>
            setSelected({ key: dateString, year, month, day })
          }
          markingType={'custom'}
          markedDates={marks}
          style={styles.calendar}
          dayComponent={({ date, state, marking }) => (
            <CustomDayComponent 
              date={date} 
              state={state} 
              marking={marking}
              onPress={({ dateString, year, month, day }) =>
                setSelected({ key: dateString, year, month, day })
              }
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
              setSelected(null)}
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
      </SafeAreaView>
    </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  
  // Custom Day Component Styles
  dayContainer: {
    width: cellSize,
    height: cellSize,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderStyle: 'solid',
    borderRadius: 5,
    marginTop: -14,
    //marginRight: 14,
    position: 'relative',
  },
  dayText: {
    fontSize: 16,
    color: '#2d4150',
    fontWeight: '300',
  },
  selectedDay: {
    borderWidth: 1,
    borderColor: '#2c7be5',
    borderRadius: 5,
    backgroundColor: 'transparent',
  },
  selectedDayText: {
    color: '#2c7be5',
    fontWeight: 'bold',
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
    fontSize: 8,
    color: '#666',
    marginLeft: 2,
  },
  
  // calendar: { flex: 1 },
  card: {
    margin: 16,
    marginTop: 80,
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#ffffff',
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
});