import { useState, useMemo, useCallback } from 'react';
import { createDateString } from '../utils/dateUtils';
import { colors, flowColors } from '../utils/constants';

/**
 * Custom hook for managing calendar state including selected dates and marks
 */
export function useCalendarState(cycleData = {}) {
  const [selected, setSelected] = useState(null);
  
  // Initialize currentMonth with today's date
  const getCurrentMonthString = () => {
    const today = new Date();
    return createDateString({
      year: today.getFullYear(),
      month: today.getMonth() + 1,
      day: 1, // First day of the month
    });
  };
  
  const [currentMonth, setCurrentMonth] = useState(getCurrentMonthString()); // Track current calendar month

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

  // Computed marks with selected date styling and flow colors
  const marks = useMemo(() => {
    // Start with static marks
    const baseMarks = { ...staticMarks };
    
    // Add flow background colors from cycleData
    Object.keys(cycleData).forEach(dateString => {
      const entry = cycleData[dateString];
      const flowValue = entry?.cycle?.flow;
      const flowColor = flowValue && flowValue !== 'none' ? flowColors[flowValue] : null;
      
      if (flowColor) {
        // Add or update mark with flow color
        const existingMark = baseMarks[dateString] || {};
        baseMarks[dateString] = {
          ...existingMark,
          customStyles: {
            container: {
              backgroundColor: flowColor,
              borderRadius: 0, // No rounded corners for flow background
            },
            text: {
              color: colors.textPrimary,
            },
          },
        };
      }
    });
    
    // Apply selection outline if a date is selected
    if (selected) {
      const selKey = selected.key;
      const existing = baseMarks[selKey] ?? {};
      const flowValue = cycleData[selKey]?.cycle?.flow;
      const flowColor = flowValue && flowValue !== 'none' ? flowColors[flowValue] : null;
      
      baseMarks[selKey] = {
        ...existing,
        customStyles: {
          container: {
            backgroundColor: flowColor || 'transparent',
            borderWidth: 1,
            borderColor: '#2c7be5',
            borderRadius: flowColor ? 0 : 5, // No rounded corners if flow color exists
          },
          text: {
            color: '#2c7be5',
            fontWeight: 'bold',
          },
        },
      };
    }
    
    return baseMarks;
  }, [selected, cycleData]);

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

  // Navigate to a specific date
  const navigateToDate = useCallback(({ year, month, day }) => {
    if (!year || !month || !day) return;
    
    const dateObj = {
      year,
      month,
      day,
      key: createDateString({ year, month, day }),
    };
    setSelected(dateObj);
    
    // Also navigate the calendar to show the selected month
    const monthString = createDateString({ year, month, day: 1 });
    if (monthString) {
      setCurrentMonth(monthString);
    }
  }, []);

  return {
    selected,
    marks,
    staticMarks,
    currentMonth,
    handleDayPress,
    clearSelection,
    navigateToCurrentDay,
    navigateToDate,
    setSelected,
  };
}
