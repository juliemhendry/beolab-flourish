import React from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Colors } from '../constants/colors';
import { Typography } from '../constants/typography';
import { useApp } from '../context/AppContext';

// Screens
import { WelcomeScreen } from '../screens/onboarding/WelcomeScreen';
import { DemographicsScreen } from '../screens/onboarding/DemographicsScreen';
import { AssessmentScreen } from '../screens/onboarding/AssessmentScreen';
import { ResultScreen } from '../screens/onboarding/ResultScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { FeelingScreen } from '../screens/FeelingScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import { WeeklyCheckInScreen } from '../screens/WeeklyCheckInScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const screenOptions = {
  headerShown: false,
  contentStyle: { backgroundColor: Colors.background },
  animation: 'slide_from_right' as const,
};

function OnboardingNavigator() {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Demographics" component={DemographicsScreen} />
      <Stack.Screen name="Assessment" component={AssessmentScreen} />
      <Stack.Screen name="Result" component={ResultScreen} />
    </Stack.Navigator>
  );
}

function HomeStack() {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen
        name="Feeling"
        component={FeelingScreen}
        options={{ gestureEnabled: false }}
      />
    </Stack.Navigator>
  );
}

function SettingsStack() {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="SettingsMain" component={SettingsScreen} />
      <Stack.Screen name="WeeklyCheckIn" component={WeeklyCheckInScreen} />
      <Stack.Screen name="Assessment" component={AssessmentScreen} />
      <Stack.Screen name="Demographics" component={DemographicsScreen} />
    </Stack.Navigator>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textMuted,
        tabBarStyle: {
          backgroundColor: Colors.white,
          borderTopColor: Colors.border,
          borderTopWidth: 1,
          paddingTop: 8,
          paddingBottom: 8,
          height: 56,
        },
        tabBarLabelStyle: {
          ...Typography.small,
          fontWeight: '500',
        },
      }}
    >
      <Tab.Screen
        name="Pause"
        component={HomeStack}
        options={{
          tabBarLabel: 'Pause',
          tabBarIcon: ({ color, size }) => (
            <View style={[styles.tabIcon, { borderColor: color }]}>
              <View style={[styles.tabIconInner, { backgroundColor: color }]} />
            </View>
          ),
          tabBarAccessibilityLabel: 'Pause tab, main screen for starting pauses',
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsStack}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({ color }) => (
            <View style={[styles.settingsIcon]}>
              <View style={[styles.settingsBar, { backgroundColor: color }]} />
              <View style={[styles.settingsBar, styles.settingsBarShort, { backgroundColor: color }]} />
              <View style={[styles.settingsBar, styles.settingsBarMed, { backgroundColor: color }]} />
            </View>
          ),
          tabBarAccessibilityLabel: 'Settings tab, view stats and manage preferences',
        }}
      />
    </Tab.Navigator>
  );
}

export function AppNavigator() {
  const { data, loading, resetKey } = useApp();

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <NavigationContainer key={resetKey}>
      {data.onboardingComplete ? <MainTabs /> : <OnboardingNavigator />}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
  tabIcon: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIconInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  settingsIcon: {
    width: 22,
    height: 18,
    justifyContent: 'space-between',
  },
  settingsBar: {
    height: 2,
    borderRadius: 1,
    width: 22,
  },
  settingsBarShort: {
    width: 16,
  },
  settingsBarMed: {
    width: 19,
  },
});
