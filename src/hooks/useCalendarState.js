import { useState, useMemo, useCallback } from 'react';
import { createDateString } from '../utils/dateUtils';

/**
 * Custom hook for managing calendar state including selected dates and marks
 */
export function useCalendarState() {
  const [selected, setSelected] = useState(null);

  // Static marks configuration - this could be moved to a separate config file later
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

  // Computed marks with selected date styling
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
          },
          text: {
            color: '#2c7be5',
            fontWeight: 'bold',
          },
        },
      },
    };
  }, [selected]);

  // Calendar event handlers
  const handleDayPress = ({ dateString, year, month, day }) => {
    setSelected({ key: dateString, year, month, day });
  };

  const clearSelection = useCallback(() => {
    setSelected(null);
  }, []);

  // Navigate to current day (today)
  const navigateToCurrentDay = useCallback(() => {
    const today = new Date();
    const currentDate = {
      year: today.getFullYear(),
      month: today.getMonth() + 1, // getMonth() returns 0-11, we need 1-12
      day: today.getDate(),
      key: createDateString({
        year: today.getFullYear(),
        month: today.getMonth() + 1,
        day: today.getDate(),
      }),
    };
    setSelected(currentDate);
  }, []);

  return {
    selected,
    marks,
    staticMarks,
    handleDayPress,
    clearSelection,
    navigateToCurrentDay,
    setSelected,
  };
}
