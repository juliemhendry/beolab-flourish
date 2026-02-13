import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

// Configure notification handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export async function requestNotificationPermissions(): Promise<boolean> {
  if (Platform.OS === 'web') return false;

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  return finalStatus === 'granted';
}

export async function scheduleDailyReminders(): Promise<void> {
  // Cancel existing reminders first
  await cancelAllReminders();

  const reminders = [
    {
      hour: 9,
      minute: 0,
      title: 'Morning pause',
      body: 'Start your day with intention. Take a 2-minute break.',
    },
    {
      hour: 13,
      minute: 0,
      title: 'Afternoon reset',
      body: 'Midday check-in. A short pause can shift your focus.',
    },
    {
      hour: 19,
      minute: 0,
      title: 'Evening wind-down',
      body: 'End the day mindfully. One pause before you switch off.',
    },
  ];

  for (const reminder of reminders) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: reminder.title,
        body: reminder.body,
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DAILY,
        hour: reminder.hour,
        minute: reminder.minute,
      },
    });
  }

  // Weekly check-in: Sunday at 6pm
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Weekly reflection',
      body: 'How in control of your tech use did you feel this week?',
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.WEEKLY,
      weekday: 1, // Sunday
      hour: 18,
      minute: 0,
    },
  });
}

export async function cancelAllReminders(): Promise<void> {
  await Notifications.cancelAllScheduledNotificationsAsync();
}
