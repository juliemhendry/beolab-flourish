import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';
import { Colors } from '../constants/colors';
import { Typography, Spacing, BorderRadius } from '../constants/typography';
import { useApp } from '../context/AppContext';
import { FeelingResponse, FEELING_OPTIONS, FEELING_QUESTIONS } from '../types';

type Props = {
  navigation: NativeStackNavigationProp<any>;
  route: RouteProp<any>;
};

export function FeelingScreen({ navigation, route }: Props) {
  const { recordPause } = useApp();
  const { pauseId, doneEarly } = route.params as { pauseId: string; doneEarly: boolean };
  const [saved, setSaved] = useState(false);

  const question = useMemo(
    () => FEELING_QUESTIONS[Math.floor(Math.random() * FEELING_QUESTIONS.length)],
    []
  );

  const handleSelect = async (feeling: FeelingResponse) => {
    if (Platform.OS !== 'web') Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    await recordPause(pauseId, feeling, doneEarly);
    setSaved(true);
  };

  if (saved) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.container}>
          <View style={styles.confirmContent}>
            <Text style={styles.confirmCheck}>Recorded</Text>
            <Text style={styles.confirmText}>
              Your response has been saved. Every pause counts.
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('Home')}
            style={styles.returnButton}
            accessibilityLabel="Return to home screen"
          >
            <Text style={styles.returnText}>Back to home</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.question}>{question}</Text>

          <View style={styles.options}>
            {FEELING_OPTIONS.map((option) => (
              <TouchableOpacity
                key={option.value}
                onPress={() => handleSelect(option.value)}
                style={styles.option}
                accessibilityLabel={`I feel ${option.label}`}
                accessibilityRole="button"
                activeOpacity={0.7}
              >
                <View
                  style={[
                    styles.iconCircle,
                    option.value === 'worse' && styles.iconWorse,
                    option.value === 'same' && styles.iconSame,
                    option.value === 'better' && styles.iconBetter,
                  ]}
                >
                  <Text style={styles.iconText}>
                    {option.value === 'worse' ? '↓' : option.value === 'same' ? '–' : '↑'}
                  </Text>
                </View>
                <Text style={styles.optionLabel}>{option.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
  },
  question: {
    ...Typography.h2,
    color: Colors.textDark,
    textAlign: 'center',
    marginBottom: Spacing.xxl,
  },
  options: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: Spacing.xl,
  },
  option: {
    alignItems: 'center',
    gap: Spacing.md,
    minWidth: 80,
  },
  iconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWorse: {
    backgroundColor: '#FDEAEA',
  },
  iconSame: {
    backgroundColor: '#F0F0EE',
  },
  iconBetter: {
    backgroundColor: Colors.primaryLight,
  },
  iconText: {
    fontSize: 28,
    fontWeight: '500',
    color: Colors.textDark,
  },
  optionLabel: {
    ...Typography.label,
    color: Colors.text,
  },
  confirmContent: {
    alignItems: 'center',
    gap: Spacing.md,
  },
  confirmCheck: {
    ...Typography.h2,
    color: Colors.primary,
    marginBottom: Spacing.sm,
  },
  confirmText: {
    ...Typography.body,
    color: Colors.textLight,
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: 280,
  },
  returnButton: {
    alignSelf: 'center',
    paddingVertical: Spacing.base,
    paddingHorizontal: Spacing.lg,
    marginTop: Spacing.xl,
  },
  returnText: {
    ...Typography.label,
    color: Colors.primary,
  },
});
