import { useState, useCallback, useMemo } from 'react';

/**
 * Custom hook for managing form state including collapsible card states
 * State persists across modal sessions until explicitly reset
 */
export function useFormState() {
  // Create initial state that persists across re-renders
  const initialState = useMemo(() => ({
    basics: { expanded: true, pinOpen: false },
    symptoms: { expanded: false, pinOpen: false },
    intimacy: { expanded: false, pinOpen: false },
    fertility: { expanded: false, pinOpen: false },
  }), []);

  // Initial state for collapsible cards - this will persist across modal sessions
  const [cards, setCards] = useState(initialState);


  // Toggle card expansion
  const toggleCard = useCallback((cardKey) => {
    setCards(prevCards => ({
      ...prevCards,
      [cardKey]: {
        ...prevCards[cardKey],
        expanded: !prevCards[cardKey].expanded,
      },
    }));
  }, []);

  // Toggle pin open state (when pinned, card stays expanded)
  const togglePinOpen = useCallback((cardKey, value) => {
    setCards(prevCards => ({
      ...prevCards,
      [cardKey]: {
        ...prevCards[cardKey],
        pinOpen: value,
        expanded: value ? true : prevCards[cardKey].expanded,
      },
    }));
  }, []);

  // Handle card toggle with pin check
  const handleCardToggle = useCallback((cardKey) => {
    setCards(prevCards => {
      const card = prevCards[cardKey];
      if (card.pinOpen) return prevCards; // Don't toggle if pinned open
      
      return {
        ...prevCards,
        [cardKey]: {
          ...card,
          expanded: !card.expanded,
        },
      };
    });
  }, []);

  // Reset all cards to default state
  const resetCards = useCallback(() => {
    setCards(initialState);
  }, [initialState]);

  // Expand all cards
  const expandAllCards = useCallback(() => {
    setCards(prevCards => {
      const newCards = {};
      Object.keys(prevCards).forEach(key => {
        newCards[key] = { ...prevCards[key], expanded: true };
      });
      return newCards;
    });
  }, []);

  // Collapse all cards
  const collapseAllCards = useCallback(() => {
    setCards(prevCards => {
      const newCards = {};
      Object.keys(prevCards).forEach(key => {
        newCards[key] = { ...prevCards[key], expanded: false };
      });
      return newCards;
    });
  }, []);

  return {
    cards,
    toggleCard,
    togglePinOpen,
    handleCardToggle,
    resetCards,
    expandAllCards,
    collapseAllCards,
    setCards,
  };
}
