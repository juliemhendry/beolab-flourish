import { Paths, File } from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { UserData } from '../types';

export async function exportUserData(data: UserData): Promise<void> {
  // Strip device ID for privacy, include only research-relevant data
  const exportData = {
    exportDate: new Date().toISOString(),
    demographics: {
      ageRange: getAgeRange(data.demographics.age),
      gender: data.demographics.gender,
    },
    assessments: data.assessments,
    completedPauses: data.completedPauses.map((p) => ({
      pauseId: p.pauseId,
      completedAt: p.completedAt,
      feeling: p.feeling,
      doneEarly: p.doneEarly,
    })),
    weeklyCheckIns: data.weeklyCheckIns,
    totalPauses: data.completedPauses.length,
    studyStartDate: data.firstOpenDate,
  };

  const json = JSON.stringify(exportData, null, 2);
  const file = new File(Paths.cache, 'beolab-data.json');
  file.write(json);

  const canShare = await Sharing.isAvailableAsync();
  if (canShare) {
    await Sharing.shareAsync(file.uri, {
      mimeType: 'application/json',
      dialogTitle: 'Export beó lab data',
      UTI: 'public.json',
    });
  }
}

function getAgeRange(age: number | null): string {
  if (!age) return 'not provided';
  if (age < 25) return '18-24';
  if (age < 35) return '25-34';
  if (age < 45) return '35-44';
  if (age < 55) return '45-54';
  if (age < 65) return '55-64';
  return '65+';
}
