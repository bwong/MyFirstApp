import React from 'react';
import { Modal, View, Text, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
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
  onTogglePin 
}) {
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
            <Text style={modalStyles.modalBackText}>‹</Text>
          </Pressable>
          
          <Text style={modalStyles.modalTitle}>
            {date ? formatLocalCivilDate(date) : 'Date Details'}
          </Text>
          
          <Pressable 
            style={modalStyles.modalCloseButton}
            onPress={onClose}
          >
            <Text style={modalStyles.modalCloseText}>✕</Text>
          </Pressable>
        </View>

        {/* Modal Content - Single Scrolling Form with Collapsible Cards */}
        <ScrollView style={modalStyles.modalContent} contentContainerStyle={modalStyles.modalContentScroll}>
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
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
}
