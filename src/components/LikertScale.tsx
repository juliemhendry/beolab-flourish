import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, AccessibilityRole } from 'react-native';
import { Colors } from '../constants/colors';
import { Typography, Spacing, BorderRadius } from '../constants/typography';
import { LIKERT_OPTIONS } from '../types';

interface LikertScaleProps {
  question: string;
  questionNumber: number;
  totalQuestions: number;
  selectedValue: number | null;
  onSelect: (value: number) => void;
}

export function LikertScale({
  question,
  questionNumber,
  totalQuestions,
  selectedValue,
  onSelect,
}: LikertScaleProps) {
  return (
    <View
      style={styles.container}
      accessibilityRole={'radiogroup' as AccessibilityRole}
      accessibilityLabel={`Question ${questionNumber}: ${question}`}
    >
      <Text style={styles.progress}>
        {questionNumber} of {totalQuestions}
      </Text>
      <Text style={styles.question}>{question}</Text>

      <View style={styles.options}>
        {LIKERT_OPTIONS.map((option) => {
          const isSelected = selectedValue === option.value;
          return (
            <TouchableOpacity
              key={option.value}
              onPress={() => onSelect(option.value)}
              style={[styles.option, isSelected && styles.optionSelected]}
              accessibilityRole="radio"
              accessibilityState={{ selected: isSelected }}
              accessibilityLabel={`${option.label}, ${option.value} of 5`}
              activeOpacity={0.7}
            >
              <View style={[styles.radio, isSelected && styles.radioSelected]}>
                {isSelected && <View style={styles.radioInner} />}
              </View>
              <Text style={[styles.optionText, isSelected && styles.optionTextSelected]}>
                {option.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: Spacing.base,
  },
  progress: {
    ...Typography.small,
    color: Colors.textMuted,
    marginBottom: Spacing.sm,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  question: {
    ...Typography.bodyLarge,
    color: Colors.textDark,
    marginBottom: Spacing.lg,
    fontWeight: '500',
  },
  options: {
    gap: Spacing.sm,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: Spacing.base,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.white,
    borderWidth: 1.5,
    borderColor: Colors.border,
  },
  optionSelected: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primaryLight,
  },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: Colors.border,
    marginRight: Spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelected: {
    borderColor: Colors.primary,
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.primary,
  },
  optionText: {
    ...Typography.body,
    color: Colors.text,
  },
  optionTextSelected: {
    color: Colors.textDark,
    fontWeight: '500',
  },
});
