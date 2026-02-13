import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { Colors } from '../../constants/colors';
import { Typography, Spacing, BorderRadius } from '../../constants/typography';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { useApp } from '../../context/AppContext';
import { getBandLabel, getBandDescription } from '../../utils/scoring';
import { AssessmentResult, Demographics } from '../../types';

type Props = {
  navigation: NativeStackNavigationProp<any>;
  route: RouteProp<any>;
};

export function ResultScreen({ navigation, route }: Props) {
  const { completeOnboarding } = useApp();
  const { demographics, assessment, researchConsent } = route.params as {
    demographics: Demographics;
    assessment: AssessmentResult;
    researchConsent: boolean;
  };

  const handleBegin = async () => {
    await completeOnboarding(demographics, assessment);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>Your baseline</Text>

          <Card style={styles.scoreCard}>
            <Text style={styles.scoreNumber}>{assessment.total}</Text>
            <Text style={styles.scoreOf}>out of 25</Text>
            <View style={styles.bandContainer}>
              <Text style={styles.bandLabel}>{getBandLabel(assessment.band)}</Text>
            </View>
          </Card>

          <Text style={styles.description}>
            {getBandDescription(assessment.band)}
          </Text>

          <Card variant="flat" style={styles.noteCard}>
            <Text style={styles.noteTitle}>What does this measure?</Text>
            <Text style={styles.noteText}>
              This score captures your <Text style={styles.bold}>perception</Text> of control over technology — how you feel about your phone use, not how much time you spend on it.
            </Text>
            <Text style={styles.noteText}>
              You will retake this assessment after 4 weeks to see if anything has changed.
            </Text>
          </Card>
        </View>

        <View style={styles.footer}>
          <Button
            title="Let's begin"
            onPress={handleBegin}
            accessibilityHint="Start the 4-week study with daily pauses"
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
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
  },
  content: {
    flex: 1,
    paddingTop: Spacing.xl,
  },
  title: {
    ...Typography.h2,
    color: Colors.textDark,
    marginBottom: Spacing.lg,
  },
  scoreCard: {
    alignItems: 'center',
    paddingVertical: Spacing.xl,
    marginBottom: Spacing.lg,
  },
  scoreNumber: {
    fontSize: 56,
    fontWeight: '300',
    color: Colors.primary,
    lineHeight: 64,
  },
  scoreOf: {
    ...Typography.body,
    color: Colors.textLight,
    marginBottom: Spacing.md,
  },
  bandContainer: {
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.pill,
  },
  bandLabel: {
    ...Typography.label,
    color: Colors.primary,
  },
  description: {
    ...Typography.body,
    color: Colors.text,
    lineHeight: 24,
    marginBottom: Spacing.lg,
  },
  noteCard: {
    gap: Spacing.sm,
  },
  noteTitle: {
    ...Typography.label,
    color: Colors.textDark,
  },
  noteText: {
    ...Typography.caption,
    color: Colors.textLight,
    lineHeight: 20,
  },
  bold: {
    fontWeight: '600',
  },
  footer: {
    paddingBottom: Spacing.xl,
  },
});
