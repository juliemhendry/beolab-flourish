import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { Colors } from '../../constants/colors';
import { Typography, Spacing } from '../../constants/typography';
import { Button } from '../../components/Button';
import { LikertScale } from '../../components/LikertScale';
import { ASSESSMENT_QUESTIONS } from '../../types';
import { calculateBand } from '../../utils/scoring';

type Props = {
  navigation: NativeStackNavigationProp<any>;
  route: RouteProp<any>;
};

export function AssessmentScreen({ navigation, route }: Props) {
  const { demographics, researchConsent } = route.params as any;
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState<(number | null)[]>(
    new Array(ASSESSMENT_QUESTIONS.length).fill(null)
  );

  const answeredCount = scores.filter((s) => s !== null).length;
  const allAnswered = answeredCount === ASSESSMENT_QUESTIONS.length;

  const handleSelect = (value: number) => {
    const newScores = [...scores];
    newScores[currentQuestion] = value;
    setScores(newScores);

    // Auto-advance to next unanswered question after brief delay
    setTimeout(() => {
      if (currentQuestion < ASSESSMENT_QUESTIONS.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      }
    }, 300);
  };

  const handleContinue = () => {
    const finalScores = scores.map((s) => s ?? 3); // Default unanswered to neutral
    const total = finalScores.reduce((a, b) => a + b, 0);
    const band = calculateBand(total);

    navigation.navigate('Result', {
      demographics,
      researchConsent,
      assessment: {
        date: new Date().toISOString(),
        scores: finalScores,
        total,
        band,
      },
    });
  };

  const handleSkip = () => {
    // Default all to neutral (3) if skipping
    const defaultScores = new Array(5).fill(3);
    const total = 15;
    navigation.navigate('Result', {
      demographics,
      researchConsent,
      assessment: {
        date: new Date().toISOString(),
        scores: defaultScores,
        total,
        band: 'mixed' as const,
      },
    });
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
      >
        <Text style={styles.title}>Baseline assessment</Text>
        <Text style={styles.subtitle}>
          Rate how much you agree with each statement about your technology use right now.
        </Text>

        <View style={styles.progressRow}>
          {ASSESSMENT_QUESTIONS.map((_, i) => (
            <TouchableOpacity
              key={i}
              onPress={() => setCurrentQuestion(i)}
              style={[
                styles.progressDot,
                scores[i] !== null && styles.progressDotFilled,
                i === currentQuestion && styles.progressDotActive,
              ]}
              accessibilityLabel={`Question ${i + 1}${scores[i] !== null ? ', answered' : ', not answered'}`}
            />
          ))}
        </View>

        <LikertScale
          question={ASSESSMENT_QUESTIONS[currentQuestion]}
          questionNumber={currentQuestion + 1}
          totalQuestions={ASSESSMENT_QUESTIONS.length}
          selectedValue={scores[currentQuestion]}
          onSelect={handleSelect}
        />

        <View style={styles.navRow}>
          {currentQuestion > 0 && (
            <TouchableOpacity
              onPress={() => setCurrentQuestion(currentQuestion - 1)}
              style={styles.navButton}
              accessibilityLabel="Previous question"
            >
              <Text style={styles.navText}>Previous</Text>
            </TouchableOpacity>
          )}
          <View style={styles.spacer} />
          {currentQuestion < ASSESSMENT_QUESTIONS.length - 1 && (
            <TouchableOpacity
              onPress={() => setCurrentQuestion(currentQuestion + 1)}
              style={styles.navButton}
              accessibilityLabel="Next question"
            >
              <Text style={styles.navText}>Next</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Text style={styles.answeredText}>
          {answeredCount} of {ASSESSMENT_QUESTIONS.length} answered
        </Text>
        <Button
          title="See your result"
          onPress={handleContinue}
          disabled={answeredCount === 0}
          accessibilityHint={
            allAnswered
              ? 'View your baseline score'
              : `${ASSESSMENT_QUESTIONS.length - answeredCount} questions remaining, unanswered will default to neutral`
          }
        />
        <TouchableOpacity
          onPress={handleSkip}
          style={styles.skipButton}
          accessibilityLabel="Skip assessment"
        >
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.lg,
  },
  title: {
    ...Typography.h2,
    color: Colors.textDark,
    marginBottom: Spacing.sm,
  },
  subtitle: {
    ...Typography.body,
    color: Colors.textLight,
    marginBottom: Spacing.lg,
    lineHeight: 24,
  },
  progressRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  progressDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.border,
  },
  progressDotFilled: {
    backgroundColor: Colors.primary,
  },
  progressDotActive: {
    borderWidth: 2,
    borderColor: Colors.primaryDark,
  },
  navRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Spacing.lg,
  },
  navButton: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.base,
  },
  navText: {
    ...Typography.label,
    color: Colors.primary,
  },
  spacer: {
    flex: 1,
  },
  footer: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xl,
    gap: Spacing.md,
    alignItems: 'center',
  },
  answeredText: {
    ...Typography.small,
    color: Colors.textMuted,
  },
  skipButton: {
    paddingVertical: Spacing.sm,
  },
  skipText: {
    ...Typography.label,
    color: Colors.textLight,
  },
});
