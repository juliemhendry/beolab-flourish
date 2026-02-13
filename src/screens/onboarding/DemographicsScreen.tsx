import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Switch,
  AccessibilityRole,
  Alert,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Colors } from '../../constants/colors';
import { Typography, Spacing, BorderRadius } from '../../constants/typography';
import { Button } from '../../components/Button';
import { Gender } from '../../types';

type Props = {
  navigation: NativeStackNavigationProp<any>;
};

const GENDER_OPTIONS: { value: Gender; label: string }[] = [
  { value: 'female', label: 'Female' },
  { value: 'male', label: 'Male' },
  { value: 'non-binary', label: 'Non-binary' },
  { value: 'prefer-not-to-say', label: 'Prefer not to say' },
];

export function DemographicsScreen({ navigation }: Props) {
  const [age, setAge] = useState('');
  const [gender, setGender] = useState<Gender | null>(null);
  const [researchConsent, setResearchConsent] = useState(true);

  const handleContinue = () => {
    const ageNum = parseInt(age, 10);
    if (age && (isNaN(ageNum) || ageNum < 18)) {
      Alert.alert(
        'Age requirement',
        'You must be 18 or older to participate in this study.',
        [{ text: 'OK' }]
      );
      return;
    }

    navigation.navigate('Assessment', {
      demographics: {
        age: age ? parseInt(age, 10) : null,
        gender,
      },
      researchConsent,
    });
  };

  const handleSkip = () => {
    navigation.navigate('Assessment', {
      demographics: { age: null, gender: null },
      researchConsent: true,
    });
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>About you</Text>
        <Text style={styles.subtitle}>
          This helps us understand who benefits most from digital pauses. All data is anonymous.
        </Text>

        <View style={styles.field}>
          <Text style={styles.label}>Age</Text>
          <TextInput
            style={styles.input}
            value={age}
            onChangeText={setAge}
            keyboardType="number-pad"
            placeholder="Enter your age"
            placeholderTextColor={Colors.textMuted}
            accessibilityLabel="Age input, must be 18 or older"
            maxLength={3}
          />
          <Text style={styles.hint}>Must be 18 or older to participate</Text>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Gender</Text>
          <View
            style={styles.genderOptions}
            accessibilityRole={'radiogroup' as AccessibilityRole}
          >
            {GENDER_OPTIONS.map((option) => {
              const isSelected = gender === option.value;
              return (
                <TouchableOpacity
                  key={option.value}
                  onPress={() => setGender(option.value)}
                  style={[styles.genderOption, isSelected && styles.genderSelected]}
                  accessibilityRole="radio"
                  accessibilityState={{ selected: isSelected }}
                  accessibilityLabel={option.label}
                  activeOpacity={0.7}
                >
                  <Text
                    style={[styles.genderText, isSelected && styles.genderTextSelected]}
                  >
                    {option.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View style={styles.consentRow}>
          <View style={styles.consentText}>
            <Text style={styles.label}>Share anonymous data to help research</Text>
            <Text style={styles.hint}>
              Contributes to understanding digital wellbeing. No personal information is shared.
            </Text>
          </View>
          <Switch
            value={researchConsent}
            onValueChange={setResearchConsent}
            trackColor={{ false: Colors.border, true: Colors.primary }}
            thumbColor={Colors.white}
            accessibilityLabel="Share anonymous research data"
          />
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button title="Continue" onPress={handleContinue} />
        <TouchableOpacity
          onPress={handleSkip}
          style={styles.skipButton}
          accessibilityLabel="Skip demographics and continue"
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
    marginBottom: Spacing.xl,
    lineHeight: 24,
  },
  field: {
    marginBottom: Spacing.lg,
  },
  label: {
    ...Typography.label,
    color: Colors.textDark,
    marginBottom: Spacing.sm,
  },
  input: {
    backgroundColor: Colors.white,
    borderWidth: 1.5,
    borderColor: Colors.border,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.base,
    paddingVertical: 14,
    fontSize: 16,
    color: Colors.textDark,
  },
  hint: {
    ...Typography.small,
    color: Colors.textMuted,
    marginTop: Spacing.xs,
  },
  genderOptions: {
    gap: Spacing.sm,
  },
  genderOption: {
    paddingVertical: 14,
    paddingHorizontal: Spacing.base,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.white,
    borderWidth: 1.5,
    borderColor: Colors.border,
  },
  genderSelected: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primaryLight,
  },
  genderText: {
    ...Typography.body,
    color: Colors.text,
  },
  genderTextSelected: {
    color: Colors.textDark,
    fontWeight: '500',
  },
  consentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing.base,
    gap: Spacing.base,
  },
  consentText: {
    flex: 1,
  },
  footer: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xl,
    gap: Spacing.md,
    alignItems: 'center',
  },
  skipButton: {
    paddingVertical: Spacing.sm,
  },
  skipText: {
    ...Typography.label,
    color: Colors.textLight,
  },
});
