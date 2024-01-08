import { StyleSheet } from 'react-native';

export const getStyles = (isDarkMode: any) => {
    return StyleSheet.create({
      container: {
        backgroundColor: isDarkMode ? '#333' : '#FFF',
      },
      text: {
        color: isDarkMode ? '#FFF' : '#333',
      },
    });
  };
  