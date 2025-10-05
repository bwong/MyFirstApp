import React from 'react';
import { Modal, View, Text, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, SaveAll } from 'lucide-react-native';
import { CollapsibleCard } from './CollapsibleCard';
import { modalStyles } from './ModalStyles';
import { formatLocalCivilDate } from '../../utils/dateUtils';

/**
 * Date Modal Component
 * Displays a modal with date information and collapsible form sections
 */
export function DateModal({ 
  visible, 
  date, 
  onClose, 
  cards, 
  onCardToggle, 
  onTogglePin,
  cardSettings 
}) {
  // Define card information
  const cardInfo = {
    basics: {
      title: 'Cycle Basics',
      subtitle: 'The Daily Check-In',
      description: 'Add basic daily entries like flow, energy, mood, notes.'
    },
    symptoms: {
      title: 'Physical Symptoms',
      subtitle: 'Body & Wellness',
      description: 'Track cramps, headaches, fatigue, GI issues, etc.'
    },
    intimacy: {
      title: 'Intimacy',
      subtitle: 'Detailed Log',
      description: 'Record intimacy details and relevant context.'
    },
    fertility: {
      title: 'Fertility Data',
      subtitle: 'Markers & Tracking',
      description: 'Capture BBT, LH tests, cervical fluid, and more.'
    }
  };

  // Render cards based on settings
  const renderCards = () => {
    if (!cardSettings) {
      // Fallback to default rendering if no settings
      return (
        <>
          <CollapsibleCard
            title="Cycle Basics"
            subtitle="The Daily Check-In"
            expanded={cards.basics.expanded}
            pinOpen={cards.basics.pinOpen}
            onToggle={() => onCardToggle('basics')}
            onTogglePin={(value) => onTogglePin('basics', value)}
          >
            <Text style={modalStyles.sectionText}>Add basic daily entries like flow, energy, mood, notes.</Text>
          </CollapsibleCard>

          <CollapsibleCard
            title="Physical Symptoms"
            subtitle="Body & Wellness"
            expanded={cards.symptoms.expanded}
            pinOpen={cards.symptoms.pinOpen}
            onToggle={() => onCardToggle('symptoms')}
            onTogglePin={(value) => onTogglePin('symptoms', value)}
          >
            <Text style={modalStyles.sectionText}>Track cramps, headaches, fatigue, GI issues, etc.</Text>
          </CollapsibleCard>

          <CollapsibleCard
            title="Intimacy"
            subtitle="Detailed Log"
            expanded={cards.intimacy.expanded}
            pinOpen={cards.intimacy.pinOpen}
            onToggle={() => onCardToggle('intimacy')}
            onTogglePin={(value) => onTogglePin('intimacy', value)}
          >
            <Text style={modalStyles.sectionText}>Record intimacy details and relevant context.</Text>
          </CollapsibleCard>

          <CollapsibleCard
            title="Fertility Data"
            subtitle="Markers & Tracking"
            expanded={cards.fertility.expanded}
            pinOpen={cards.fertility.pinOpen}
            onToggle={() => onCardToggle('fertility')}
            onTogglePin={(value) => onTogglePin('fertility', value)}
          >
            <Text style={modalStyles.sectionText}>Capture BBT, LH tests, cervical fluid, and more.</Text>
          </CollapsibleCard>
        </>
      );
    }

    // Get visible cards in order
    const visibleCards = Object.entries(cardSettings)
      .filter(([, settings]) => settings.visible)
      .sort(([, a], [, b]) => a.order - b.order)
      .map(([cardId]) => cardId);

    return visibleCards.map(cardId => {
      const info = cardInfo[cardId];
      const cardData = cards[cardId];
      
      if (!info || !cardData) return null;

      return (
        <CollapsibleCard
          key={cardId}
          title={info.title}
          subtitle={info.subtitle}
          expanded={cardData.expanded}
          pinOpen={cardData.pinOpen}
          onToggle={() => onCardToggle(cardId)}
          onTogglePin={(value) => onTogglePin(cardId, value)}
        >
          <Text style={modalStyles.sectionText}>{info.description}</Text>
        </CollapsibleCard>
      );
    });
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <SafeAreaView style={modalStyles.modalContainer}>
        {/* Header with back and close buttons */}
        <View style={modalStyles.modalHeader}>
          <Pressable 
            style={modalStyles.modalBackButton}
            onPress={onClose}
          >
            <ArrowLeft 
              size={24}
              color={modalStyles.modalBackText.color}
            />
          </Pressable>
          
          <Text style={modalStyles.modalTitle}>
            {date ? formatLocalCivilDate(date) : 'Date Details'}
          </Text>
          
          <Pressable 
            style={modalStyles.modalCloseButton}
            onPress={onClose}
          >
            <SaveAll 
              size={24}
              color={modalStyles.modalCloseText.color}
            />
          </Pressable>
        </View>

        {/* Modal Content - Single Scrolling Form with Collapsible Cards */}
        <ScrollView style={modalStyles.modalContent} contentContainerStyle={modalStyles.modalContentScroll}>
          {renderCards()}
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
}
