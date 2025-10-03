import { useState } from 'react';

/**
 * Custom hook for managing form state including collapsible card states
 */
export function useFormState() {
  // Initial state for collapsible cards
  const [cards, setCards] = useState({
    basics: { expanded: true, pinOpen: false },
    symptoms: { expanded: false, pinOpen: false },
    intimacy: { expanded: false, pinOpen: false },
    fertility: { expanded: false, pinOpen: false },
  });

  // Toggle card expansion
  const toggleCard = (cardKey) => {
    setCards(prevCards => ({
      ...prevCards,
      [cardKey]: {
        ...prevCards[cardKey],
        expanded: !prevCards[cardKey].expanded,
      },
    }));
  };

  // Toggle pin open state (when pinned, card stays expanded)
  const togglePinOpen = (cardKey, value) => {
    setCards(prevCards => ({
      ...prevCards,
      [cardKey]: {
        ...prevCards[cardKey],
        pinOpen: value,
        expanded: value ? true : prevCards[cardKey].expanded,
      },
    }));
  };

  // Handle card toggle with pin check
  const handleCardToggle = (cardKey) => {
    const card = cards[cardKey];
    if (card.pinOpen) return; // Don't toggle if pinned open
    
    toggleCard(cardKey);
  };

  // Reset all cards to default state
  const resetCards = () => {
    setCards({
      basics: { expanded: true, pinOpen: false },
      symptoms: { expanded: false, pinOpen: false },
      intimacy: { expanded: false, pinOpen: false },
      fertility: { expanded: false, pinOpen: false },
    });
  };

  // Expand all cards
  const expandAllCards = () => {
    setCards(prevCards => {
      const newCards = {};
      Object.keys(prevCards).forEach(key => {
        newCards[key] = { ...prevCards[key], expanded: true };
      });
      return newCards;
    });
  };

  // Collapse all cards
  const collapseAllCards = () => {
    setCards(prevCards => {
      const newCards = {};
      Object.keys(prevCards).forEach(key => {
        newCards[key] = { ...prevCards[key], expanded: false };
      });
      return newCards;
    });
  };

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
