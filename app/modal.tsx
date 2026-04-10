import { StyleSheet, View, Platform, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import Constants from 'expo-constants';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import i18n from '@/constants/i18n';
import { Colors, Spacing } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

const BUILD_ID = Constants.expoConfig?.extra?.buildId ?? 'dev';

export default function DebugModal() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const router = useRouter();

  const appVersion = Constants.expoConfig?.version ?? '0.0.0';
  const expoVersion = Constants.expoConfig?.sdkVersion ?? 'unknown';

  const rows = [
    { label: i18n.t('modal.labelPlatform'), value: Platform.OS },
    { label: i18n.t('modal.labelOsVersion'), value: Platform.Version?.toString() ?? 'unknown' },
    { label: i18n.t('modal.labelExpoSdk'), value: expoVersion },
  ];

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <ThemedText type="title" style={styles.title}>v{appVersion}</ThemedText>
        <ThemedText style={[styles.buildId, { color: colors.textSecondary }]}>
          {BUILD_ID}
        </ThemedText>

        {rows.map((row) => (
          <View key={row.label} style={styles.row}>
            <ThemedText style={[styles.label, { color: colors.textSecondary }]}>
              {row.label}
            </ThemedText>
            <ThemedText style={styles.value}>{row.value}</ThemedText>
          </View>
        ))}

        <Pressable onPress={() => router.back()} style={styles.dismiss}>
          <ThemedText style={{ color: colors.tint, fontSize: 16 }}>{i18n.t('modal.dismiss')}</ThemedText>
        </Pressable>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    padding: Spacing.xl,
    paddingTop: Spacing.xxl,
  },
  title: {
    marginBottom: Spacing.xs,
  },
  buildId: {
    fontSize: 16,
    marginBottom: Spacing.xl,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.md,
  },
  label: {
    fontSize: 16,
  },
  value: {
    fontSize: 16,
    flexShrink: 1,
    textAlign: 'right',
  },
  dismiss: {
    alignSelf: 'center',
    marginTop: Spacing.xl,
    paddingVertical: Spacing.md,
  },
});
