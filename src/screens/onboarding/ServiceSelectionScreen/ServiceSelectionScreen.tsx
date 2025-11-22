import React, { useState } from 'react';
import { View, Text, ScrollView, SafeAreaView } from 'react-native';
import { styles } from './ServiceSelectionScreen.styles';
import { Button } from '../../../components/ui/Button';
import { SearchBar } from '../../../components/ui/SearchBar';
import { CategoryCard } from '../../../components/common/CategoryCard';
import { Header } from '../../../components/common/Header';

const POPULAR_SERVICES = [
  { id: '1', icon: '⚡', label: 'Electrician', count: 245 },
  { id: '2', icon: '🔧', label: 'Plumber', count: 189 },
  { id: '3', icon: '🎨', label: 'Painter', count: 156 },
  { id: '4', icon: '🔨', label: 'Carpenter', count: 203 },
  { id: '5', icon: '👨‍🍳', label: 'Cook', count: 98 },
  { id: '6', icon: '🚗', label: 'Mechanic', count: 167 },
  { id: '7', icon: '🧹', label: 'Cleaner', count: 134 },
  { id: '8', icon: '🏗️', label: 'Mason', count: 112 },
];

export interface ServiceSelectionScreenProps {
  onServiceSelect: (serviceId: string) => void;
  onBrowseAll: () => void;
}

export const ServiceSelectionScreen: React.FC<ServiceSelectionScreenProps> = ({
  onServiceSelect,
  onBrowseAll,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const filteredServices = POPULAR_SERVICES.filter(service =>
    service.label.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleServiceSelect = (serviceId: string) => {
    setSelectedService(serviceId);
  };

  const handleContinue = () => {
    if (selectedService) {
      onServiceSelect(selectedService);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="What service do you need?"
        leftIcon={<Text style={styles.backIcon}>←</Text>}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Search Bar */}
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search for a service..."
          containerStyle={styles.searchBar}
        />

        {/* Popular Services */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Popular Services</Text>
          <View style={styles.servicesGrid}>
            {filteredServices.map(service => (
              <CategoryCard
                key={service.id}
                icon={service.icon}
                label={service.label}
                count={service.count}
                selected={selectedService === service.id}
                onPress={() => handleServiceSelect(service.id)}
              />
            ))}
          </View>
        </View>

        {/* Browse All Option */}
        <View style={styles.browseSection}>
          <Text style={styles.browseText}>Not sure what you need?</Text>
          <Button
            title="Browse All Services"
            variant="outline"
            size="medium"
            onPress={onBrowseAll}
            fullWidth
          />
        </View>
      </ScrollView>

      {/* Fixed Bottom Button */}
      {selectedService && (
        <View style={styles.footer}>
          <Button
            title="Continue"
            variant="primary"
            size="large"
            onPress={handleContinue}
            fullWidth
          />
        </View>
      )}
    </SafeAreaView>
  );
};
