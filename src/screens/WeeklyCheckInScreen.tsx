import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as Haptics from 'expo-haptics';
import { Colors } from '../constants/colors';
import { Typography, Spacing, BorderRadius } from '../constants/typography';
import { Button } from '../components/Button';
import { useApp } from '../context/AppContext';
import { getStudyWeekNumber } from '../utils/scoring';

type Props = {
  navigation: NativeStackNavigationProp<any>;
};

const SCALE_LABELS: Record<number, string> = {
  0: 'Not at all',
  5: 'Somewhat',
  10: 'Completely',
};

export function WeeklyCheckInScreen({ navigation }: Props) {
  const { data, saveWeeklyCheckIn } = useApp();
  const [rating, setRating] = useState<number | null>(null);
  const [saved, setSaved] = useState(false);

  const weekNumber = getStudyWeekNumber(data.firstOpenDate);

  const handleSave = async () => {
    if (rating === null) return;
    if (Platform.OS !== 'web') Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    await saveWeeklyCheckIn(rating, weekNumber);
    setSaved(true);
  };

  if (saved) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.container}>
          <View style={styles.confirmContent}>
            <Text style={styles.confirmTitle}>Saved</Text>
            <Text style={styles.confirmText}>
              Week {weekNumber} check-in recorded. Keep going.
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
            accessibilityLabel="Go back to settings"
          >
            <Text style={styles.backText}>Back to settings</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.weekLabel}>Week {weekNumber}</Text>
          <Text style={styles.question}>
            How in control of your technology use did you feel this week?
          </Text>

          <View style={styles.scaleContainer}>
            <View style={styles.scaleRow}>
              {Array.from({ length: 11 }, (_, i) => {
                const isSelected = rating === i;
                return (
                  <TouchableOpacity
                    key={i}
                    onPress={() => {
                      if (Platform.OS !== 'web') Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                      setRating(i);
                    }}
                    style={[
                      styles.scaleButton,
                      isSelected && styles.scaleButtonSelected,
                    ]}
                    accessibilityLabel={`Rating ${i} out of 10${SCALE_LABELS[i] ? `, ${SCALE_LABELS[i]}` : ''}`}
                    accessibilityRole="radio"
                    accessibilityState={{ selected: isSelected }}
                  >
                    <Text
                      style={[
                        styles.scaleNumber,
                        isSelected && styles.scaleNumberSelected,
                      ]}
                    >
                      {i}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <View style={styles.labelsRow}>
              <Text style={styles.scaleLabel}>Not at all</Text>
              <Text style={styles.scaleLabel}>Completely</Text>
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <Button
            title="Save"
            onPress={handleSave}
            disabled={rating === null}
            accessibilityHint="Save your weekly rating"
          />
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
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  weekLabel: {
    ...Typography.small,
    color: Colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 1,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  question: {
    ...Typography.h3,
    color: Colors.textDark,
    textAlign: 'center',
    marginBottom: Spacing.xxl,
    lineHeight: 28,
  },
  scaleContainer: {
    gap: Spacing.md,
  },
  scaleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 4,
  },
  scaleButton: {
    width: 30,
    height: 44,
    borderRadius: BorderRadius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  scaleButtonSelected: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  scaleNumber: {
    ...Typography.label,
    color: Colors.text,
  },
  scaleNumberSelected: {
    color: Colors.white,
  },
  labelsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  scaleLabel: {
    ...Typography.small,
    color: Colors.textMuted,
  },
  footer: {
    paddingBottom: Spacing.xl,
  },
  confirmContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: Spacing.md,
  },
  confirmTitle: {
    ...Typography.h2,
    color: Colors.primary,
  },
  confirmText: {
    ...Typography.body,
    color: Colors.textLight,
    textAlign: 'center',
    lineHeight: 24,
  },
  backButton: {
    alignSelf: 'center',
    paddingVertical: Spacing.base,
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  backText: {
    ...Typography.label,
    color: Colors.primary,
  },
});
