import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Colors } from '../../constants/colors';
import { Typography, Spacing } from '../../constants/typography';
import { Button } from '../../components/Button';

type Props = {
  navigation: NativeStackNavigationProp<any>;
};

export function WelcomeScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.logoContainer}>
            <Text style={styles.logo}>beó</Text>
            <View style={styles.labBadge}>
              <Text style={styles.labText}>LAB</Text>
            </View>
          </View>

          <Text style={styles.tagline}>
            A research study exploring how brief offline moments can help you feel more in control of your technology use.
          </Text>

          <View style={styles.details}>
            <Text style={styles.detailItem}>28 evidence-based pauses</Text>
            <Text style={styles.detailDivider}>·</Text>
            <Text style={styles.detailItem}>4 weeks</Text>
            <Text style={styles.detailDivider}>·</Text>
            <Text style={styles.detailItem}>2 minutes or less</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Button
            title="Get started"
            onPress={() => navigation.navigate('Demographics')}
            accessibilityHint="Proceed to demographic information"
          />

          <Text style={styles.disclaimer}>
            This is a research study, not a medical app.{'\n'}
            Your data is anonymous and helps improve digital wellbeing research.
          </Text>
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
    alignItems: 'center',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: Spacing.lg,
    gap: Spacing.sm,
  },
  logo: {
    fontSize: 48,
    fontWeight: '600',
    color: Colors.primary,
    letterSpacing: -1,
  },
  labBadge: {
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: 4,
  },
  labText: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.primary,
    letterSpacing: 2,
  },
  tagline: {
    ...Typography.bodyLarge,
    color: Colors.text,
    textAlign: 'center',
    maxWidth: 320,
    marginBottom: Spacing.xl,
    lineHeight: 28,
  },
  details: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  detailItem: {
    ...Typography.caption,
    color: Colors.textLight,
  },
  detailDivider: {
    color: Colors.textMuted,
  },
  footer: {
    paddingBottom: Spacing.xl,
    gap: Spacing.base,
  },
  disclaimer: {
    ...Typography.small,
    color: Colors.textMuted,
    textAlign: 'center',
    lineHeight: 18,
  },
});
