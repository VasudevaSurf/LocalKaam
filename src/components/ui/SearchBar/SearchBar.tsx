import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  ViewStyle,
  TextInputProps,
} from 'react-native';
import { styles } from './SearchBar.styles';
import { colors } from '../../../theme';

export interface SearchBarProps extends TextInputProps {
  onSearch?: (query: string) => void;
  onClear?: () => void;
  containerStyle?: ViewStyle;
  showFilterButton?: boolean;
  onFilterPress?: () => void;
  filterCount?: number;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  onClear,
  containerStyle,
  showFilterButton = false,
  onFilterPress,
  filterCount = 0,
  ...textInputProps
}) => {
  const [query, setQuery] = useState('');

  const handleChangeText = (text: string) => {
    setQuery(text);
    onSearch?.(text);
  };

  const handleClear = () => {
    setQuery('');
    onClear?.();
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.searchContainer}>
        {/* Search Icon */}
        <View style={styles.searchIcon}>
          <Text style={styles.iconText}>🔍</Text>
        </View>

        {/* Input */}
        <TextInput
          style={styles.input}
          value={query}
          onChangeText={handleChangeText}
          placeholder="Search for services..."
          placeholderTextColor={colors.gray[400]}
          returnKeyType="search"
          {...textInputProps}
        />

        {/* Clear Button */}
        {query.length > 0 && (
          <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
            <Text style={styles.iconText}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Filter Button */}
      {showFilterButton && (
        <TouchableOpacity style={styles.filterButton} onPress={onFilterPress}>
          <Text style={styles.iconText}>⚙️</Text>
          {filterCount > 0 && (
            <View style={styles.filterBadge}>
              <Text style={styles.filterBadgeText}>{filterCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      )}
    </View>
  );
};
