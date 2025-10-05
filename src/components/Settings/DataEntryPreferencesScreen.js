import React from 'react';
import { View, Text, Pressable, ScrollView, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, ChevronUp, ChevronDown } from 'lucide-react-native';
import { dataEntryPreferencesStyles } from './DataEntryPreferencesStyles';

/**
 * Data Entry Preferences Screen Component
 * Allows users to customize which cards appear in the data entry modal
 */
export function DataEntryPreferencesScreen({ 
  visible, 
  onClose, 
  cardSettings, 
  onToggleCard, 
  onMoveCardUp, 
  onMoveCardDown, 
  onResetToDefaults 
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

  // Get cards in order
  const orderedCards = Object.entries(cardSettings)
    .sort(([, a], [, b]) => a.order - b.order)
    .map(([cardId, settings]) => ({ id: cardId, ...settings, ...cardInfo[cardId] }));

  return (
    <SafeAreaView style={dataEntryPreferencesStyles.container}>
      {/* Header with back button */}
      <View style={dataEntryPreferencesStyles.header}>
        <Pressable 
          style={dataEntryPreferencesStyles.backButton}
          onPress={onClose}
        >
          <ArrowLeft 
            size={24}
            color={dataEntryPreferencesStyles.backText.color}
          />
        </Pressable>

        <Text style={dataEntryPreferencesStyles.title}>Data Entry Preferences</Text>

        <View style={dataEntryPreferencesStyles.placeholder} />
      </View>

      {/* Content */}
      <ScrollView style={dataEntryPreferencesStyles.content}>
        <Text style={dataEntryPreferencesStyles.description}>
          Customize which cards appear in your data entry form. You can show or hide cards and change their order.
        </Text>

        {/* Card List */}
        <View style={dataEntryPreferencesStyles.cardList}>
          {orderedCards.map((card, index) => (
            <View key={card.id} style={dataEntryPreferencesStyles.cardItem}>
              {/* Card Info */}
              <View style={dataEntryPreferencesStyles.cardInfo}>
                <Text style={dataEntryPreferencesStyles.cardTitle}>{card.title}</Text>
                <Text style={dataEntryPreferencesStyles.cardSubtitle}>{card.subtitle}</Text>
                <Text style={dataEntryPreferencesStyles.cardDescription}>{card.description}</Text>
              </View>

              {/* Controls */}
              <View style={dataEntryPreferencesStyles.cardControls}>
                {/* Toggle Switch */}
                <View style={dataEntryPreferencesStyles.toggleContainer}>
                  <Text style={dataEntryPreferencesStyles.toggleLabel}>
                    {card.visible ? 'Visible' : 'Hidden'}
                  </Text>
                  <Switch
                    value={card.visible}
                    onValueChange={() => onToggleCard(card.id)}
                    trackColor={{ false: '#767577', true: '#81b0ff' }}
                    thumbColor={card.visible ? '#f5dd4b' : '#f4f3f4'}
                  />
                </View>

                {/* Ordering Controls */}
                <View style={dataEntryPreferencesStyles.orderControls}>
                  <Pressable 
                    style={[
                      dataEntryPreferencesStyles.orderButton,
                      index === 0 && dataEntryPreferencesStyles.orderButtonDisabled
                    ]}
                    onPress={() => onMoveCardUp(card.id)}
                    disabled={index === 0}
                  >
                    <ChevronUp 
                      size={16}
                      color={index === 0 ? '#ccc' : '#666'}
                    />
                  </Pressable>
                  
                  <Pressable 
                    style={[
                      dataEntryPreferencesStyles.orderButton,
                      index === orderedCards.length - 1 && dataEntryPreferencesStyles.orderButtonDisabled
                    ]}
                    onPress={() => onMoveCardDown(card.id)}
                    disabled={index === orderedCards.length - 1}
                  >
                    <ChevronDown 
                      size={16}
                      color={index === orderedCards.length - 1 ? '#ccc' : '#666'}
                    />
                  </Pressable>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Reset Button */}
        <Pressable 
          style={dataEntryPreferencesStyles.resetButton}
          onPress={onResetToDefaults}
        >
          <Text style={dataEntryPreferencesStyles.resetButtonText}>Reset to Default</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}
