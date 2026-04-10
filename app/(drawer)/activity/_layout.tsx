import { Stack } from 'expo-router';
import i18n from '@/constants/i18n';

export default function ActivityLayout() {
  return (
    <Stack screenOptions={{ headerBackTitle: i18n.t('activity.backTitle') }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
}
