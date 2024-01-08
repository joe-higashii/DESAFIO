import React, { useState, useEffect } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useTheme } from '../context/ThemeContext';

const DarkModeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <TouchableOpacity onPress={toggleTheme}>
      <Icon name={isDarkMode ? 'sun' : 'moon'} size={20} color={isDarkMode ? '#f39c12' : '#2c3e50'} />
    </TouchableOpacity>
  );
};

export default DarkModeToggle;
