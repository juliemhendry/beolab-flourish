import React, { useEffect, useState, useRef, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, AccessibilityInfo, Platform } from 'react-native';
import * as Haptics from 'expo-haptics';
import { Colors } from '../constants/colors';
import { Typography, Spacing, BorderRadius } from '../constants/typography';

interface TimerProps {
  durationSeconds: number;
  onComplete: () => void;
  onDoneEarly: () => void;
  instruction: string;
}

export function Timer({ durationSeconds, onComplete, onDoneEarly, instruction }: TimerProps) {
  const [remaining, setRemaining] = useState(durationSeconds);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Start countdown
    intervalRef.current = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          if (Platform.OS !== 'web') Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          onComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Animate progress
    Animated.timing(progressAnim, {
      toValue: 0,
      duration: durationSeconds * 1000,
      useNativeDriver: false,
    }).start();

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [durationSeconds, onComplete, progressAnim]);

  const formatTime = useCallback((seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }, []);

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.container} accessibilityRole="timer">
      <Text
        style={styles.instruction}
        accessibilityLabel={instruction}
      >
        {instruction}
      </Text>

      <View style={styles.timerContainer}>
        <Text
          style={styles.time}
          accessibilityLabel={`${remaining} seconds remaining`}
          accessibilityLiveRegion="polite"
        >
          {formatTime(remaining)}
        </Text>
      </View>

      <View style={styles.progressTrack}>
        <Animated.View style={[styles.progressBar, { width: progressWidth }]} />
      </View>

      <TouchableOpacity
        onPress={onDoneEarly}
        style={styles.doneEarly}
        accessibilityLabel="Done early, finish this pause"
        accessibilityRole="button"
      >
        <Text style={styles.doneEarlyText}>Done early</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
  },
  instruction: {
    ...Typography.bodyLarge,
    color: Colors.text,
    textAlign: 'center',
    marginBottom: Spacing.xxl,
    paddingHorizontal: Spacing.base,
    lineHeight: 28,
  },
  timerContainer: {
    marginBottom: Spacing.xl,
  },
  time: {
    ...Typography.timer,
    color: Colors.textDark,
  },
  progressTrack: {
    width: '80%',
    height: 4,
    backgroundColor: Colors.border,
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: Spacing.xxl,
  },
  progressBar: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 2,
  },
  doneEarly: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
  },
  doneEarlyText: {
    ...Typography.label,
    color: Colors.textLight,
    textDecorationLine: 'underline',
  },
});
