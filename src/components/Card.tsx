import React, { ReactNode } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { Colors } from '../constants/colors';
import { BorderRadius, Spacing } from '../constants/typography';

interface CardProps {
  children: ReactNode;
  style?: ViewStyle;
  variant?: 'elevated' | 'flat';
}

export function Card({ children, style, variant = 'elevated' }: CardProps) {
  return (
    <View style={[styles.base, variant === 'elevated' ? styles.elevated : styles.flat, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
  },
  elevated: {
    backgroundColor: Colors.white,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 16,
    elevation: 2,
  },
  flat: {
    backgroundColor: Colors.background,
  },
});
