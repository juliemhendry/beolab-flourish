import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Switch,
  TouchableOpacity,
  Alert,
  Linking,
  Platform,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Colors } from '../constants/colors';
import { Typography, Spacing, BorderRadius } from '../constants/typography';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { useApp } from '../context/AppContext';
import { PAUSES, CATEGORIES } from '../constants/pauses';
import {
  calculateStreak,
  calculateFeltBetterPercent,
  getBandLabel,
} from '../utils/scoring';
import { exportUserData } from '../utils/dataExport';

type Props = {
  navigation: NativeStackNavigationProp<any>;
};

export function SettingsScreen({ navigation }: Props) {
  const {
    data,
    toggleReminders,
    toggleResearchConsent,
    toggleFavourite,
    resetAllData,
  } = useApp();

  const [exporting, setExporting] = useState(false);

  const latestAssessment = data.assessments[data.assessments.length - 1];
  const streak = calculateStreak(data.completedPauses);
  const feltBetter = calculateFeltBetterPercent(data.completedPauses);
  const favourites = (data.favouritePauses || []);
  const favouritePauses = PAUSES.filter((p) => favourites.includes(p.id));

  const handleExport = async () => {
    setExporting(true);
    try {
      await exportUserData(data);
    } catch (e) {
      if (Platform.OS === 'web') {
        window.alert('Unable to export data. Please try again.');
      } else {
        Alert.alert('Export failed', 'Unable to export data. Please try again.');
      }
    }
    setExporting(false);
  };

  const handleReset = () => {
    if (Platform.OS === 'web') {
      const confirmed = window.confirm(
        'This will permanently delete all your data including assessment history, completed pauses, favourites, and settings. This cannot be undone.'
      );
      if (confirmed) {
        resetAllData();
      }
    } else {
      Alert.alert(
        'Reset all data',
        'This will permanently delete all your data including assessment history, completed pauses, favourites, and settings. This cannot be undone.',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Reset',
            style: 'destructive',
            onPress: async () => {
              await resetAllData();
            },
          },
        ]
      );
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Settings</Text>

        {/* Current Score */}
        {latestAssessment && (
          <Card style={styles.section}>
            <Text style={styles.sectionTitle}>Current score</Text>
            <View style={styles.scoreRow}>
              <Text style={styles.scoreValue}>{latestAssessment.total}</Text>
              <Text style={styles.scoreOf}>/25</Text>
            </View>
            <Text style={styles.bandText}>
              {getBandLabel(latestAssessment.band)}
            </Text>
          </Card>
        )}

        {/* Stats */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>Your progress</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{streak}</Text>
              <Text style={styles.statLabel}>Day streak</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>
                {data.completedPauses.length}
              </Text>
              <Text style={styles.statLabel}>Total pauses</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{feltBetter}%</Text>
              <Text style={styles.statLabel}>Felt better</Text>
            </View>
          </View>
        </Card>

        {/* Favourites */}
        {favouritePauses.length > 0 && (
          <Card style={styles.section}>
            <Text style={styles.sectionTitle}>Favourites</Text>
            {favouritePauses.map((pause) => {
              const cat = CATEGORIES.find((c) => c.key === pause.category);
              return (
                <View key={pause.id} style={styles.favRow}>
                  <View style={styles.favInfo}>
                    <Text style={styles.favTitle}>{pause.title}</Text>
                    <Text style={[styles.favCategory, cat ? { color: cat.color } : null]}>
                      {cat?.label || pause.category} · {pause.durationLabel}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => toggleFavourite(pause.id)}
                    style={styles.favRemove}
                    accessibilityLabel={`Remove ${pause.title} from favourites`}
                    hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                  >
                    <Text style={styles.favRemoveIcon}>{'\u2665'}</Text>
                  </TouchableOpacity>
                </View>
              );
            })}
          </Card>
        )}

        {/* Actions */}
        <Card style={styles.section}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate('Assessment', {
              demographics: data.demographics,
              researchConsent: data.researchConsent,
              isRetake: true,
            })}
            accessibilityLabel="Retake assessment"
          >
            <Text style={styles.menuText}>Retake assessment</Text>
            <Text style={styles.menuArrow}>{'\u203A'}</Text>
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate('WeeklyCheckIn')}
            accessibilityLabel="Weekly check-in"
          >
            <Text style={styles.menuText}>Weekly check-in</Text>
            <Text style={styles.menuArrow}>{'\u203A'}</Text>
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate('Demographics', {
              isEdit: true,
              currentDemographics: data.demographics,
            })}
            accessibilityLabel="Edit demographics"
          >
            <Text style={styles.menuText}>Demographics</Text>
            <Text style={styles.menuArrow}>{'\u203A'}</Text>
          </TouchableOpacity>
        </Card>

        {/* Assessment History */}
        {data.assessments.length > 0 && (
          <Card style={styles.section}>
            <Text style={styles.sectionTitle}>Assessment history</Text>
            {data.assessments.map((a, i) => (
              <View key={i} style={styles.historyRow}>
                <Text style={styles.historyDate}>
                  {new Date(a.date).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </Text>
                <Text style={styles.historyScore}>{a.total}/25</Text>
                <Text style={styles.historyBand}>{getBandLabel(a.band)}</Text>
              </View>
            ))}
          </Card>
        )}

        {/* Toggles */}
        <Card style={styles.section}>
          <View style={styles.toggleRow}>
            <View style={styles.toggleText}>
              <Text style={styles.menuText}>Reminders</Text>
              <Text style={styles.toggleHint}>
                Daily pauses at 9am, 1pm, 7pm{'\n'}Weekly check-in Sundays at 6pm
              </Text>
            </View>
            <Switch
              value={data.remindersEnabled}
              onValueChange={toggleReminders}
              trackColor={{ false: Colors.border, true: Colors.primary }}
              thumbColor={Colors.white}
              accessibilityLabel="Toggle reminders for daily pauses and weekly check-in"
            />
          </View>

          <View style={styles.divider} />

          <View style={styles.toggleRow}>
            <View style={styles.toggleText}>
              <Text style={styles.menuText}>Research data</Text>
              <Text style={styles.toggleHint}>Share anonymous data to help research</Text>
            </View>
            <Switch
              value={data.researchConsent}
              onValueChange={toggleResearchConsent}
              trackColor={{ false: Colors.border, true: Colors.primary }}
              thumbColor={Colors.white}
              accessibilityLabel="Toggle anonymous research data sharing"
            />
          </View>
        </Card>

        {/* Data & Legal */}
        <Card style={styles.section}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={handleExport}
            disabled={exporting}
            accessibilityLabel="Export your data as JSON"
          >
            <Text style={styles.menuText}>
              {exporting ? 'Exporting...' : 'Export my data'}
            </Text>
            <Text style={styles.menuArrow}>{'\u203A'}</Text>
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => Linking.openURL('https://beo.llc/privacy')}
            accessibilityLabel="View privacy policy"
          >
            <Text style={styles.menuText}>Privacy policy</Text>
            <Text style={styles.menuArrow}>{'\u203A'}</Text>
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => Linking.openURL('https://beo.llc/terms')}
            accessibilityLabel="View terms of use"
          >
            <Text style={styles.menuText}>Terms of use</Text>
            <Text style={styles.menuArrow}>{'\u203A'}</Text>
          </TouchableOpacity>
        </Card>

        {/* Danger Zone */}
        <View style={styles.dangerSection}>
          <Button
            title="Reset all data"
            onPress={handleReset}
            variant="ghost"
            style={styles.resetButton}
          />
        </View>

        <Text style={styles.versionText}>
          beo lab v1.0.0{'\n'}
          lab@beo.llc
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.xxl,
  },
  title: {
    ...Typography.h2,
    color: Colors.textDark,
    marginBottom: Spacing.lg,
  },
  section: {
    marginBottom: Spacing.base,
  },
  sectionTitle: {
    ...Typography.label,
    color: Colors.textDark,
    marginBottom: Spacing.md,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    fontSize: 12,
  },
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: Spacing.xs,
  },
  scoreValue: {
    fontSize: 40,
    fontWeight: '300',
    color: Colors.primary,
  },
  scoreOf: {
    ...Typography.body,
    color: Colors.textLight,
    marginLeft: Spacing.xs,
  },
  bandText: {
    ...Typography.caption,
    color: Colors.textLight,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    ...Typography.h2,
    color: Colors.primary,
    marginBottom: 2,
  },
  statLabel: {
    ...Typography.small,
    color: Colors.textMuted,
  },
  favRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  favInfo: {
    flex: 1,
  },
  favTitle: {
    ...Typography.body,
    color: Colors.textDark,
    fontWeight: '500',
  },
  favCategory: {
    ...Typography.small,
    color: Colors.textMuted,
    marginTop: 2,
  },
  favRemove: {
    padding: Spacing.xs,
    marginLeft: Spacing.md,
  },
  favRemoveIcon: {
    fontSize: 20,
    color: Colors.primary,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.md,
  },
  menuText: {
    ...Typography.body,
    color: Colors.textDark,
  },
  menuArrow: {
    fontSize: 20,
    color: Colors.textMuted,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.borderLight,
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
  },
  toggleText: {
    flex: 1,
    marginRight: Spacing.base,
  },
  toggleHint: {
    ...Typography.small,
    color: Colors.textMuted,
    marginTop: 2,
  },
  historyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    gap: Spacing.md,
  },
  historyDate: {
    ...Typography.caption,
    color: Colors.textLight,
    width: 100,
  },
  historyScore: {
    ...Typography.label,
    color: Colors.textDark,
    width: 50,
  },
  historyBand: {
    ...Typography.small,
    color: Colors.textMuted,
    flex: 1,
  },
  dangerSection: {
    marginTop: Spacing.md,
    alignItems: 'center',
  },
  resetButton: {
    minHeight: 44,
  },
  versionText: {
    ...Typography.small,
    color: Colors.textMuted,
    textAlign: 'center',
    marginTop: Spacing.xl,
    lineHeight: 20,
  },
});
