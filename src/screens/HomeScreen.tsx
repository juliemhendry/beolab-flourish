import React, { useState, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as Haptics from 'expo-haptics';
import { Colors } from '../constants/colors';
import { Typography, Spacing, BorderRadius } from '../constants/typography';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Timer } from '../components/Timer';
import { PAUSES, CATEGORIES } from '../constants/pauses';
import { useApp } from '../context/AppContext';
import { Pause } from '../types';

type Props = {
  navigation: NativeStackNavigationProp<any>;
};

export function HomeScreen({ navigation }: Props) {
  const { data } = useApp();
  const [timerActive, setTimerActive] = useState(false);
  const [currentPause, setCurrentPause] = useState<Pause>(() => getRandomPause());
  const [doneEarly, setDoneEarly] = useState(false);

  function getRandomPause(exclude?: string): Pause {
    const available = exclude
      ? PAUSES.filter((p) => p.id !== exclude)
      : PAUSES;
    return available[Math.floor(Math.random() * available.length)];
  }

  const handleNewPause = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setCurrentPause((prev) => getRandomPause(prev.id));
  }, []);

  const handleBegin = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setDoneEarly(false);
    setTimerActive(true);
  }, []);

  const handleTimerComplete = useCallback(() => {
    setTimerActive(false);
    setDoneEarly(false);
    navigation.navigate('Feeling', { pauseId: currentPause.id, doneEarly: false });
  }, [currentPause.id, navigation]);

  const handleDoneEarly = useCallback(() => {
    setTimerActive(false);
    setDoneEarly(true);
    navigation.navigate('Feeling', { pauseId: currentPause.id, doneEarly: true });
  }, [currentPause.id, navigation]);

  const category = useMemo(
    () => CATEGORIES.find((c) => c.key === currentPause.category),
    [currentPause.category]
  );

  if (timerActive) {
    return (
      <SafeAreaView style={styles.safe}>
        <Timer
          durationSeconds={currentPause.durationSeconds}
          onComplete={handleTimerComplete}
          onDoneEarly={handleDoneEarly}
          instruction={currentPause.instruction}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.logoRow}>
            <Text style={styles.logo}>beó</Text>
            <View style={styles.labBadge}>
              <Text style={styles.labText}>LAB</Text>
            </View>
          </View>
        </View>

        <Card style={styles.pauseCard}>
          {category && (
            <View style={[styles.categoryBadge, { backgroundColor: category.color + '18' }]}>
              <Text style={[styles.categoryText, { color: category.color }]}>
                {category.label}
              </Text>
            </View>
          )}

          <Text style={styles.pauseTitle}>{currentPause.title}</Text>

          <Text style={styles.instruction}>{currentPause.instruction}</Text>

          <View style={styles.citationContainer}>
            <Text style={styles.citation}>{currentPause.citation}</Text>
          </View>

          <Button
            title={`Begin · ${currentPause.durationLabel}`}
            onPress={handleBegin}
            accessibilityHint={`Start a ${currentPause.durationLabel} ${currentPause.title} pause`}
          />
        </Card>

        <TouchableOpacity
          onPress={handleNewPause}
          style={styles.anotherButton}
          accessibilityLabel="Show a different pause"
          accessibilityHint="Loads a random pause from a different category"
          activeOpacity={0.6}
        >
          <Text style={styles.anotherText}>Tap for another</Text>
        </TouchableOpacity>

        {data.completedPauses.length > 0 && (
          <Text style={styles.statsPreview}>
            {data.completedPauses.length} pause{data.completedPauses.length !== 1 ? 's' : ''} completed
          </Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xxl,
  },
  header: {
    paddingTop: Spacing.base,
    paddingBottom: Spacing.lg,
    alignItems: 'center',
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: Spacing.sm,
  },
  logo: {
    fontSize: 28,
    fontWeight: '600',
    color: Colors.primary,
    letterSpacing: -0.5,
  },
  labBadge: {
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 3,
  },
  labText: {
    fontSize: 9,
    fontWeight: '600',
    color: Colors.primary,
    letterSpacing: 1.5,
  },
  pauseCard: {
    gap: Spacing.base,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.pill,
  },
  categoryText: {
    ...Typography.small,
    fontWeight: '600',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  pauseTitle: {
    ...Typography.h2,
    color: Colors.textDark,
  },
  instruction: {
    ...Typography.bodyLarge,
    color: Colors.text,
    lineHeight: 28,
  },
  citationContainer: {
    paddingTop: Spacing.xs,
  },
  citation: {
    ...Typography.small,
    color: Colors.textMuted,
    fontStyle: 'italic',
  },
  anotherButton: {
    alignSelf: 'center',
    paddingVertical: Spacing.base,
    paddingHorizontal: Spacing.lg,
    marginTop: Spacing.md,
  },
  anotherText: {
    ...Typography.label,
    color: Colors.primary,
  },
  statsPreview: {
    ...Typography.small,
    color: Colors.textMuted,
    textAlign: 'center',
    marginTop: Spacing.sm,
  },
});
